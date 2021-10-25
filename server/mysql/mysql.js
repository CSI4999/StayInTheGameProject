const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '156.67.222.64',
  user: 'u662451128_root',
  password: 'Password12345!',
  database: 'u662451128_csi'
});

module.exports = {
    query: async function(queryString,values){
        return new Promise(function(resolve, reject) {
            connection.query(queryString,(values || []), function (err, rows) {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }
}