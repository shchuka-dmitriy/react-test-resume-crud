import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import Home from './pages/Home/Home';
import browserHistory from './browserHistory';
import './App.css';
import './reset.css';
import NotFound from "./components/NotFound/NotFound";
import PrivateHoc from './components/PrivateHoc/PrivateHoc';
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import UserPage from "./pages/UserPage/UserPage";

class App extends Component {
  render() {
    return (
        <Router history={browserHistory}>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/login' component={LoginPage}/>
            <Route exact path='/registration' component={RegistrationPage}/>
            <Route exact path='/user/:id' component={UserPage}/>
            <Route component={NotFound}/>
          </Switch>
        </Router>
    );
  }
}

export default App;