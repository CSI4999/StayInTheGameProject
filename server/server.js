const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const https = require('https');
const session = require('express-session');
const fs = require('fs')
const cookieParser = require('cookie-parser');

const mysql = require('./mysql/mysql')
const encryption = require('./encryption/encryption')

var userCodes = {}

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

let cookieConfiguration = {
  httpOnly: false,
  secure: true,
  sameSite: "None",
  maxAge: 2000000
}

let sessionConfiguration = {
    name: '_SessionTracker',
    secret: 'adjlfeUbxxXX',
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: cookieConfiguration
};

async function connect(){

  //res.cookie("_USERAUTHENTICATION",Math.floor(Math.random()*10),cookieConfiguration)

  https.createServer({
    key: fs.readFileSync('./security/server.key'),
    cert: fs.readFileSync('./security/server.cert')
  }, app).listen(5000, () => {
    
    app.use(function(req, res, next) {
      var allowedOrigins = ['https://10.0.0.231:5000', 'https://10.0.0.231:3000', 'https://localhost:5000', 'https://localhost:3000','http://localhost:3000'];
      var origin = req.headers.origin;
      if(!origin){ return next() }
      if(allowedOrigins.indexOf(origin) > -1){
           res.setHeader('Access-Control-Allow-Origin', origin);
      }
      res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Access-Control-Allow-Credentials', true);
      res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=None");
      return next();
    });

    app.use(cookieParser());
    app.use(session(sessionConfiguration));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.post('/login', async function (req, res) {
      console.log("Request from sessionID: " + req.sessionID)

      var givenCredentials = req.body
      
      var email = encryption.cipher(givenCredentials.email)
      var password = encryption.cipher(givenCredentials.password)

      var isValid = await mysql.query('SELECT userId FROM accounts WHERE email = ? AND password = ?',[email,password])

      if(isValid.length > 0){
        //correct login
        var loginId = makeid(35)
        res.cookie("_USERAUTHENTICATION",loginId,cookieConfiguration)
        userCodes[req.cookies['_USERAUTHENTICATION']] = loginId
        return res.send(true)
      }
      return res.send(false);
    });

    app.get('/logout', function (req, res) {
      console.log("Request from sessionID: " + req.sessionID)
      if(req.cookies['_USERAUTHENTICATION']){
        userCodes[req.cookies['_USERAUTHENTICATION']] = null
        res.clearCookie('_USERAUTHENTICATION')
      }
      return res.send(false)
    });

    app.get('/isLoggedIn', function (req, res) {
      console.log('hi')
      console.log("Request from sessionID: " + req.sessionID)
      if(req.cookies['_USERAUTHENTICATION']){
        return res.send(true)
      }
      return res.send(false)
    });

    app.post('/signup',async function(req,res){
      console.log("signup")
      console.log("Request from sessionID: " + req.sessionID)


      var givenCredentials = req.body
      
      var email = encryption.cipher(givenCredentials.email)
      var password = encryption.cipher(givenCredentials.password)

      var isValid = await mysql.query('SELECT userId FROM accounts WHERE email = ?',[email])

      if(isValid.length <= 0){
        //valid creation
        await mysql.query('INSERT INTO accounts(email,password) VALUES (?,?)',[email,password])
      }
      //invalid creation

      res.send(true)

    })

  })

  process.on('uncaughtException', function (err) {
    //console.error(err.stack);
    //console.log("Node NOT Exiting...");
  });
}

connect()