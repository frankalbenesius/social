import React from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../../firebase'
import UserProvider from '../../containers/UserProvider'
import needsIntroduction from '../../lib/needsIntroduction'

export default ({ children }) => (
  <UserProvider
    uid={firebase.auth().currentUser.uid}
    render={authedUser => {
      if (needsIntroduction(authedUser)) {
        return (
          <Redirect
            to={{
              pathname: '/introduction',
              search: `?redirectTo=${firebase.auth().currentUser.uid}`,
            }}
          />
        )
      }
      return children
    }}
  />
)
