import React from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../../firebase'
import UserProvider from '../../containers/UserProvider'
import UnauthedProfile from './UnauthedProfile'
import Friends from './Friends'
import Wall from './Wall'
import Section from './Section'
import IntroductionGate from './IntroductionGate'

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
    <IntroductionGate>
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
              <Wall user={user} />
            </div>
          )
        }}
      />
    </IntroductionGate>
  )
}

export default Profile
