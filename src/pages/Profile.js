import React from 'react'
import PropTypes from 'prop-types'
import { db } from '../firebase'

class Profile extends React.Component {
  state = {
    userData: undefined,
  }
  componentDidMount() {
    this.userDoc = db.collection('users').doc(this.props.user.uid)
    this.unregisterUserListener = this.userDoc.onSnapshot(doc =>
      this.setState({ userData: doc.data() }),
    )
  }
  componentWillUnmount() {
    this.unregisterUserListener()
  }
  render() {
    const { uid, email } = this.props.user
    return (
      <div>
        Profile Page
        <p>uid: {uid}</p>
        <p>email: {email}</p>
        <p>userData: {JSON.stringify(this.state.userData)}</p>
        {/*
          THE PROFILE PLAN:
          1: User Information
             - display name (editable, visible to friends of friends)
             - avatar (editable, visible to friends of friends)
             - email (editable, visible to friends)
          2: Friends List (different for your own profile)
             - list of friends, searchable by display name (and email if your list?)
             - add a friend by email (if your list)
          3: Wall
             - Place to comment (only for friends profiles)
             - List of Posts. Posts have:
               - Display Name
               - Avatar
               - Date
               - Message
               - Delete button (if this is your wall)
        */}
      </div>
    )
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
}

export default Profile
