import React, { Component } from 'react'
import firebase, { db } from '../../../firebase.js'

class SendFriendRequestButton extends Component {
  state = {
    sent: false,
  }
  sendRequest = e => {
    e.preventDefault()
    const authUid = firebase.auth().currentUser.uid
    const requestRef = db.doc(`users/${this.props.uid}/requests/${authUid}`)
    requestRef
      .set({
        user: authUid,
        accepted: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        this.setState({ sent: true })
      })
      .catch(e => console.warn(e))
  }
  render() {
    if (this.state.sent) {
      return 'Friend Request Sent'
    }
    return <button onClick={this.sendRequest}>Send Friend Request</button>
  }
}

export default SendFriendRequestButton
