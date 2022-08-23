import { Component } from 'react';
import SignIn from './components/SingIn';
import SignUp from './components/SingUp';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';


export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path={`/`} exact>
              <div className='login'>
                <h1>Welcome</h1>
                <Link to={'/signIn'}>
                  <button type="submit" className='loginBtn'>LOGIN</button>
                </Link>
              </div>
            </Route>
            <Route path={`/signIn`} >
              <SignIn />
            </Route>
            <Route path={`/signUp`} >
              <SignUp />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

