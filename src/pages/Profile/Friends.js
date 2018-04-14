import React from 'react'
import PropTypes from 'prop-types'
import Link from 'react-router-dom/Link'
import FriendsProvider from '../../containers/FriendsProvider.js'
import FriendshipProvider from '../../containers/FriendshipProvider.js'
import Section from './Section.js'

const Friends = ({ user, profile }) => {
  return (
    <Section title={'Friends'}>
      <FriendshipProvider
        ids={[user.id, profile.id]}
        render={friendship => {
          if (friendship) {
            return (
              <FriendsProvider
                id={profile.id}
                render={friends =>
                  friends.map(friend => (
                    <Link to={`/profile/${friend.id}`} key={friend.id}>
                      {friend.name}
                    </Link>
                  ))
                }
              />
            )
          } else {
            return (
              <div>
                <p>You are not friends with this user.</p>
                <button>Send Friend Request</button>
              </div>
            )
          }
        }}
      />
    </Section>
  )
}

const userDataType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
})
Friends.propTypes = {
  user: userDataType,
  profile: userDataType,
}

export default Friends
