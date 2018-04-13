import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Link } from 'react-router-dom'
import firebase from '../../firebase'
import UserProvider from '../../containers/UserProvider'
import FriendsList from './FriendsList.js'
import Wall from './Wall.js'
import Section from './Section.js'
import needsIntroduction from '../../lib/needsIntroduction'

const Profile = ({ id, user }) => {
  const auth = firebase.auth().currentUser
  if (needsIntroduction(user)) {
    return (
      <Redirect
        to={{
          pathname: '/introduction',
          search: `?redirectTo=${id}`,
        }}
      />
    )
  }
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
