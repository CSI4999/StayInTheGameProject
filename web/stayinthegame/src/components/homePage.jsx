import React from 'react';
import Dashboard from './dashboard/Dashboard.tsx'
//import SignIn from './sign-in/SignIn.tsx';

class HomePage extends React.Component {
    render() { 
        return <div>
            <Dashboard></Dashboard>
        </div>;
    }
}
 
export default HomePage;