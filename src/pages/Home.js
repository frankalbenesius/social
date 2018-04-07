import React from 'react'
import PropTypes from 'prop-types'
import { db } from '../firebase'

class Home extends React.Component {
  state = {
    userData: undefined,
  }
  componentDidMount() {
    this.unregisterUserListener = db
      .collection('users')
      .doc(this.props.user.uid)
      .onSnapshot(doc => {
        const userData = doc.data()
        this.setState({ userData })
      })
  }
  componentWillUnmount() {
    this.unregisterUserListener()
  }
  render() {
    if (!this.state.userData) return null // wait for userData
    const { uid, email } = this.props.user
    return (
      <div>
        Home Page
        <p>uid: {uid}</p>
        <p>email: {email}</p>
        <p>wasInvited: {this.state.userData.wasInvited ? 'true' : 'false'}</p>
      </div>
    )
  }
}

Home.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
}

export default Home
