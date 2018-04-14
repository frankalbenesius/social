import { Component } from 'react'
import { db } from '../firebase'

class RequestsProvider extends Component {
  state = {
    friends: undefined,
  }
  componentDidMount() {
    const friendsRef = db
      .collection('users')
      .doc(this.props.uid)
      .collection('friends')
    this.unregisterRequestsListener = friendsRef.onSnapshot(snapshot => {
      const friends = []
      snapshot.forEach(friendDoc => friends.push(friendDoc.data()))
      this.setState({ friends })
    })
  }
  componentWillUnmount() {
    this.unregisterRequestsListener()
  }
  render() {
    if (this.state.friends === undefined) return null
    return this.props.render(this.state.friends)
  }
}

export default RequestsProvider
