import React from 'react'
import PropTypes from 'prop-types'
import firebase from '../../firebase.js'
// import Link from 'react-router-dom/Link'
import UserProvider from '../../containers/UserProvider.js'
import FriendsProvider from '../../containers/FriendsProvider.js'
import FriendRequests from './FriendRequests.js'
import Section from './Section.js'

const Friends = ({ user }) => {
  const isOwnProfile = user.id === firebase.auth().currentUser.uid
  return (
    <Section title={'Friends'}>
      {isOwnProfile ? <FriendRequests /> : null}
      <FriendsProvider
        id={user.id}
        render={friends => (
          <div>
            Current Friends: ({friends.length})
            {friends.map(friend => (
              <UserProvider
                uid={friend.id}
                render={user => <div>{user.name}</div>}
              />
            ))}
          </div>
        )}
      />
    </Section>
  )
}

Friends.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
}

export default Friends
