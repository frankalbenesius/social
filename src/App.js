import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AuthProvider from './containers/AuthProvider'
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
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/auth" component={Auth} />
              <Route path="/signin" component={Signin} />
              <Route path="/introduction" component={Introduction} />
              <Route path="/profile/:id" component={Profile} />
              <Route path="/profile/" component={Profile} />
              <Route component={FourZeroFour} />
            </Switch>
          )}
        />
      </Main>
    </SiteWrapper>
  </Router>
)
