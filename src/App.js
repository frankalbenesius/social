import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import firebase from './firebase'

import Home from './pages/Home'
import Auth from './pages/Auth'
import Signin from './pages/Signin'

import Header from './components/Header'

class App extends Component {
  state = {
    isFetchingUser: true,
    user: null,
  }
  componentDidMount() {
    this.unregisterAuthListener = firebase.auth().onAuthStateChanged(user => {
      this.setState({ isFetchingUser: false, user })
    })
  }
  componentWillUnmount() {
    this.unregisterAuthListener()
  }
  render() {
    // don't render anything until we know authentication status
    if (this.state.isFetchingUser) return null
    return (
      <Router>
        <div>
          <Header user={this.state.user} />
          <Switch>
            <Route
              path="/"
              exact
              render={p => <Home user={this.state.user} />}
            />
            <Route path="/auth" exact component={Auth} />
            <Route path="/signin" component={Signin} />
            <Route component={() => <div>404</div>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
