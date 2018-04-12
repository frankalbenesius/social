import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import AuthProvider from './containers/AuthProvider'

import Landing from './pages/Landing'
import Profile from './pages/Profile'
import Auth from './pages/Auth'
import Signin from './pages/Signin'
import FourZeroFour from './pages/FourZeroFour'

import SiteWrapper from './components/SiteWrapper'
import Header from './components/Header'
import Main from './components/Main'

export default () => (
  <Router>
    <SiteWrapper>
      <Header />
      <Main>
        <AuthProvider
          render={auth => (
            <Switch>
              <Route
                path="/"
                exact
                render={p => {
                  if (!auth) {
                    return <Landing />
                  } else {
                    return <Redirect to={`/profile/${auth.uid}`} />
                  }
                }}
              />
              <Route path="/profile/:id" component={Profile} />
              <Route path="/auth" component={Auth} />
              <Route
                path="/signin"
                render={p => {
                  if (auth) {
                    return <Redirect to={`/profile/${auth.uid}`} />
                  } else {
                    return <Signin />
                  }
                }}
              />
              <Route component={FourZeroFour} />
            </Switch>
          )}
        />
      </Main>
    </SiteWrapper>
  </Router>
)
