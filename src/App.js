import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import queryString from 'query-string'

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
                render={() => {
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
                render={({ location }) => {
                  if (auth) {
                    const parsed = queryString.parse(location.search)
                    const profileId = parsed.redirectTo || auth.uid
                    return <Redirect to={`/profile/${profileId}`} />
                  } else {
                    return <Signin auth={auth} />
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
