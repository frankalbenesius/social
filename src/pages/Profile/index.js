import React from 'react'
import PropTypes from 'prop-types'
import glamorous from 'glamorous'
import Link from 'react-router-dom/Link'
import firebase from '../../firebase'
import UserProvider from '../../containers/UserProvider'
import Onboarding from './Onboarding'
import FriendsList from './FriendsList.js'
import Wall from './Wall.js'
import Section from './Section.js'

const needsOnboarding = user => !user || !user.name
const Notice = glamorous.div({
  border: '1px dashed lavender',
  padding: '1em',
})

const Profile = ({ match }) => {
  const auth = firebase.auth().currentUser
  const userId = match.params.id
  return (
    <UserProvider
      uid={userId}
      render={user =>
        needsOnboarding(user) ? (
          <Onboarding />
        ) : (
          <div>
            <Section title="User">{user.name}</Section>
            {auth ? (
              <div>
                <FriendsList />
                <Wall />
              </div>
            ) : (
              <p>
                Want to interact with this user?{' '}
                <Link
                  to={{
                    pathname: '/signin',
                    search: `?redirectTo=${userId}`,
                  }}
                >
                  Sign in!
                </Link>
              </p>
            )}
          </div>
        )
      }
    />
  )
}

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
}

export default Profile
