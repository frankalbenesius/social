import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import * as firebase from 'firebase'

import Home from './pages/Home'
import Auth from './pages/Auth'
import Signin from './pages/Signin'

class App extends Component {
  state = {
    isLoading: true,
    isSignedIn: false,
    user: null
  }
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      this.setState({ isLoading: false, isSignedIn: !!user, user})
    })
  }
  componentWillUnmount() {
    this.unregisterAuthObserver()
  }
  handleSignOut = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }
  render() {
    if (this.state.isLoading) return null
    return (
      <Router>
        <div>
          <header style={{borderBottom: "1px solid black", marginBottom: "1em"}}>
            <Link to="/">
              <h1 style={{display: 'inline-block', verticalAlign: 'middle'}}>
                Social
              </h1>
            </Link>
          </header>
          <p>
            You Are {this.state.isSignedIn ? "" : "Not"} Signed In &mdash;&nbsp;
            {this.state.isSignedIn ? (
              <Link to="" onClick={this.handleSignOut}>Sign Out</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </p>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/auth" exact component={Auth}/>
            <Route path="/signin" component={Signin}/>
            <Route component={() => <div>404</div>}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
