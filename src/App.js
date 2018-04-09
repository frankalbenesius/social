import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import firebase from './firebase'

import Home from './pages/Home'
import Profile from './pages/Profile'
import Auth from './pages/Auth'
import Signin from './pages/Signin'

import SiteWrapper from './components/SiteWrapper'
import Header from './components/Header'
import Main from './components/Main'

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
        <SiteWrapper>
          <Header user={this.state.user} />
          <Main>
            <Switch>
              <Route
                path="/"
                exact
                render={p => {
                  if (!this.state.user) {
                    return <Home />
                  } else {
                    return <Profile user={this.state.user} />
                  }
                }}
              />
              <Route path="/auth" exact component={Auth} />
              <Route
                path="/signin"
                exact
                render={p => {
                  if (this.state.user) {
                    return <Redirect to="/" />
                  } else {
                    return <Signin />
                  }
                }}
              />
              <Route component={() => <div>404</div>} />
            </Switch>
          </Main>
        </SiteWrapper>
      </Router>
    )
  }
}

export default App
