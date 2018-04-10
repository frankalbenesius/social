import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import AuthProvider from './containers/AuthProvider'

import Landing from './pages/Landing'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Signin from './pages/Signin'

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
                    return <Home auth={auth} />
                  }
                }}
              />
              <Route path="/auth" exact component={Auth} />
              <Route
                path="/signin"
                exact
                render={p => {
                  if (auth) {
                    return <Redirect to="/" />
                  } else {
                    return <Signin />
                  }
                }}
              />
              <Route component={() => <div>404</div>} />
            </Switch>
          )}
        />
      </Main>
    </SiteWrapper>
  </Router>
)
