import React from 'react'
import PropTypes from 'prop-types'
import { db } from '../firebase'

class Profile extends React.Component {
  state = {
    isFetchingUserData: true,
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
