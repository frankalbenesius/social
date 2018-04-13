import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import queryString from 'query-string'

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

const userNeedsIntroduction = user => !user || !user.id || !user.name

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
                  <Route
                    path="/profile/:id"
                    render={({ match }) => {
                      if (auth && userNeedsIntroduction(user)) {
                        return (
                          <Redirect
                            to={{
                              pathname: '/introduction',
                              search: `?redirectTo=${match.params.id}`,
                            }}
                          />
                        )
                      } else {
                        return <Profile id={match.params.id} />
                      }
                    }}
                  />
                  <Route
                    path="/introduction"
                    render={({ match, location }) => {
                      if (auth && userNeedsIntroduction(user)) {
                        return <Introduction />
                      } else {
                        const parsed = queryString.parse(location.search)
                        const profileId = parsed.redirectTo || auth.uid
                        return <Redirect to={`/profile/${profileId}`} />
                      }
                    }}
                  />
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
          )}
        />
      </Main>
    </SiteWrapper>
  </Router>
)
