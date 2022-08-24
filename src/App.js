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
            <Route path={`/26-homework/`} exact>
              <div className='login'>
                <h1>Welcome</h1>
                <Link to={'/26-homework/signIn'}>
                  <button type="submit" className='loginBtn'>LOGIN</button>
                </Link>
              </div>
            </Route>
            <Route path={`/26-homework/signIn`} >
              <SignIn />
            </Route>
            <Route path={`/26-homework/signUp`} >
              <SignUp />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

