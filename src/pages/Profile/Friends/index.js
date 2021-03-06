import React from 'react'
import PropTypes from 'prop-types'
import Link from 'react-router-dom/Link'
import firebase from '../../../firebase.js'
import UserProvider from '../../../containers/UserProvider.js'
import FriendsProvider from '../../../containers/FriendsProvider.js'
import FriendRequests from './FriendRequests.js'
import FriendRequestButton from './FriendRequestButton.js'
import ProfileLinkButton from './ProfileLinkButton.js'
import Section from '../Section.js'

const Friends = ({ user }) => {
  const authId = firebase.auth().currentUser.uid
  const isOwnProfile = user.id === authId
  return (
    <Section title={'Friends'}>
      <FriendsProvider
        uid={firebase.auth().currentUser.uid}
        render={myFriends => {
          // friends provider lets us list our friends if it's our own profile
          // we know our own profile before friends provider
          if (isOwnProfile) {
            return (
              <div>
                <div>
                  <ProfileLinkButton />
                </div>
                <FriendRequests />
                Friends: ({myFriends.length})
                {myFriends.map(friend => (
                  <UserProvider
                    uid={friend.user}
                    key={friend.user}
                    render={user => (
                      <div key={user.id}>
                        <Link to={user.id}>{user.name}</Link>
                      </div>
                    )}
                  />
                ))}
              </div>
            )
          }
          // friends provider also let's us know when we're looking at someones
          // profile if it's a friend, so we can look at their friends
          const userIsFriend =
            myFriends.filter(f => f.user === user.id).length > 0
          if (userIsFriend) {
            return (
              <FriendsProvider
                uid={user.id}
                render={friends => (
                  <div>
                    Current Friends: ({friends.length})
                    {friends.map(friend => (
                      <UserProvider
                        uid={friend.user}
                        key={friend.user}
                        render={user => (
                          <div key={user.id}>
                            <Link to={user.id}>{user.name}</Link>
                          </div>
                        )}
                      />
                    ))}
                  </div>
                )}
              />
            )
          }
          // otherwise, now we know that it's not our profile or a friends
          // profile, so we might as well add a friend request button
          return <FriendRequestButton uid={user.id} />
        }}
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
