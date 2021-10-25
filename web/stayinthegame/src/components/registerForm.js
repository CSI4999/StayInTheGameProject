

import React, { Component } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {withRouter} from 'react-router-dom';


const theme = createTheme();


class App extends Component {


  constructor() {
    super();
    this.state = {value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    fetch('https://localhost:5000/signup', {
      method: 'POST',
      credentials: 'include',
      rejectUnauthorized: false,
      requestCert: true,
      agent: false,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname: data.get('firstname'),
        lastname: data.get('lastname'),
        email: data.get('email'),
        password: data.get('password'),
      }),
    }).then(response => response.json())
    .then(result => {

      
     // this.setState({ loggedIn: result })
    });

    this.props.history.push('/dashboard');
  }


  render(){
  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AccountBoxIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Account
        </Typography>
        
        <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="First Name"
            name="firstname"
            autoComplete="First Name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="lastname"
            label="Last Name"
            id="lastname"
            autoComplete="Last Name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
            
          </Button>
          
        </Box>
       
      </Box>
     
    </Container>
  </ThemeProvider>
  );
}
}


export default withRouter(App);
//export default App;
