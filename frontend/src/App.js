import './App.css';
//import HomePage from './components/homePage';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/sign-in/SignIn';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import RegisterForm from './components/registerForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Dashboard></Dashboard>
          </Route>
          <Route exact path="/signin">
            <SignIn></SignIn>
          </Route>
          <Route exact path="/register">
            <RegisterForm></RegisterForm>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
