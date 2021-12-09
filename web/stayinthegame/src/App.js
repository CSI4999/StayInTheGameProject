import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/sign-in/SignIn';
//import Table from './components/portfolio/Table'
import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import RegisterForm from './components/registerForm';
import { Table } from '@mui/material';
import LandingPage from "./components/landingpage/src/pages/Home/index";


class App extends Component {


  constructor() {
    super();
    this.state = { loggedIn: false };
  }

  componentDidMount() {

    /*
    fetch('https://localhost:5000/isLoggedIn', {
      method: 'GET',
      credentials: 'include',
      rejectUnauthorized: false,
      requestCert: true,
      agent: false,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
    .then(result => {
      console.log(result)
      this.setState({ loggedIn: result })
    });
  */

  }

  render() {
    return (
      <Suspense fallback={null}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" render={() => {
                // if(this.state.loggedIn === true){
                return <LandingPage></LandingPage>
                //<Dashboard />;
                // }
                //  return <SignIn />//<Redirect to="/login" />
              }} />

              <Route exact path="/register">
                <RegisterForm></RegisterForm>
              </Route>


              <Route exact path="/signin">
                <SignIn></SignIn>
              </Route>

              <Route exact path="/dashboard">
                <Dashboard></Dashboard>
              </Route>

              <Route exact path="/portfolio">
                <Table></Table>
              </Route>
            </Switch>
          </div>
        </Router>
      </Suspense>


    );
  }
}

export default App;
