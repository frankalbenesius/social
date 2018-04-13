import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import AuthProvider from './containers/AuthProvider'
import UserProvider from './containers/UserProvider'

import Landing from './pages/Landing'
import Introduction from './pages/Introduction'
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
            <UserProvider
              uid={auth ? auth.uid : 'none'}
              render={user => (
                <Switch>
                  {/* try to keep redirect logic inside page components */}
                  <Route path="/" exact component={Landing} />
                  <Route path="/auth" component={Auth} />
                  <Route path="/signin" component={Signin} />
                  {/* routes below care about user data */}
                  <Route
                    path="/profile/:id"
                    render={({ match }) => (
                      <Profile id={match.params.id} user={user} />
                    )}
                  />
                  <Route
                    path="/introduction"
                    render={({ location }) => (
                      <Introduction location={location} user={user} />
                    )}
                  />
                  <Route component={FourZeroFour} />
                </Switch>
              )}
            />
          )}
        />
      </Main>
    </SiteWrapper>
  </Router>
)
