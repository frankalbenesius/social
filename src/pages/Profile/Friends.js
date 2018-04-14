import React from 'react'
import PropTypes from 'prop-types'
import firebase from '../../firebase.js'
import UserProvider from '../../containers/UserProvider.js'
import FriendsProvider from '../../containers/FriendsProvider.js'
import FriendRequests from './FriendRequests.js'
import SendFriendRequestButton from './SendFriendRequestButton.js'
import Section from './Section.js'

const Friends = ({ user }) => {
  const authId = firebase.auth().currentUser.uid
  const isOwnProfile = user.id === authId
  return (
    <FriendsProvider
      uid={firebase.auth().currentUser.uid}
      render={myFriends => {
        if (isOwnProfile) {
          return (
            <div>
              <FriendRequests />
              Current Friends: ({myFriends.length})
              {myFriends.map(friend => (
                <UserProvider
                  uid={friend.id}
                  render={user => <div>{user.name}</div>}
                />
              ))}
            </div>
          )
        }
        const userIsFriend = myFriends.filter(f => f.id === user.id).length > 0
        if (userIsFriend) {
          return (
            <Section title={'Friends'}>
              <FriendsProvider
                uid={user.id}
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
        return (
          <Section title={'Friends'}>
            <SendFriendRequestButton uid={user.id} />
          </Section>
        )
      }}
    />
  )
}

Friends.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
}

export default Friends
