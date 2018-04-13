import React from 'react'
import PropTypes from 'prop-types'
import Link from 'react-router-dom/Link'
import firebase from '../../firebase'
import UserProvider from '../../containers/UserProvider'
import FriendsList from './FriendsList.js'
import Wall from './Wall.js'
import Section from './Section.js'

const Profile = ({ id }) => {
  const auth = firebase.auth().currentUser
  return (
    <UserProvider
      uid={id}
      render={profileUser => (
        <div>
          <Section title="User">{profileUser.name}</Section>
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
                  search: `?redirectTo=${id}`,
                }}
              >
                Sign in!
              </Link>
            </p>
          )}
        </div>
      )}
    />
  )
}

Profile.propTypes = {
  id: PropTypes.string.isRequired,
}

export default Profile
