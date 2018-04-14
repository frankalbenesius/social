import React from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../../firebase'
import UserProvider from '../../containers/UserProvider'
import UnauthedProfile from './UnauthedProfile.js'
import Friends from './Friends.js'
import Wall from './Wall.js'
import Section from './Section.js'
import needsIntroduction from '../../lib/needsIntroduction'

const Profile = ({ match }) => {
  const id = match.params.id
  const auth = firebase.auth().currentUser
  if (!id) {
    return <Redirect to={`/profile/${auth.uid}`} />
  }
  if (!auth) {
    return <UnauthedProfile id={id} />
  }
  return (
    <UserProvider
      uid={auth.uid}
      render={authedUser => {
        if (needsIntroduction(authedUser)) {
          return (
            <Redirect
              to={{ pathname: '/introduction', search: `?redirectTo=${id}` }}
            />
          )
        }
        return (
          <UserProvider
            uid={id}
            render={user => {
              if (!user) {
                return <Redirect to={`/profile/${auth.uid}`} />
              }
              return (
                <div>
                  <Section title="User">{user.name}</Section>
                  <Friends user={user} />
                  <Wall />
                </div>
              )
            }}
          />
        )
      }}
    />
  )
}

export default Profile
