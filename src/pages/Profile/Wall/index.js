import React from 'react'
import firebase from '../../../firebase'
import Section from '../Section'
import FriendsProvider from '../../../containers/FriendsProvider'
import PostsList from './PostsList'
import PostCreator from './PostCreator'

const Wall = ({ match, user }) => {
  const auth = firebase.auth().currentUser
  if (user.id === auth.uid) {
    return (
      <Section title={'Wall'}>
        <PostsList uid={user.id} />
      </Section>
    )
  }
  return (
    <FriendsProvider // just to see if we're this user's friend
      uid={auth.uid}
      render={myFriends => {
        const userIsFriend =
          myFriends.filter(f => f.user === user.id).length > 0
        if (userIsFriend) {
          return (
            <Section title={'Wall'}>
              <PostCreator uid={user.id} />
              <PostsList uid={user.id} />
            </Section>
          )
        } else {
          return null // we logged in, but we ain't this users friend.
        }
      }}
    />
  )
}

Wall.propTypes = {}

export default Wall
