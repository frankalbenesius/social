import { Component } from 'react'
import { db } from '../firebase'

class RequestsProvider extends Component {
  state = {
    friends: [],
  }
  componentDidMount() {
    const friendsRef = db
      .collection('users')
      .doc(this.props.id)
      .collection('friends')
    this.unregisterRequestsListener = friendsRef.onSnapshot(snapshot => {
      const friends = []
      snapshot.forEach(requestDoc => friends.push(requestDoc.data()))
      this.setState({ friends })
    })
  }
  componentWillUnmount() {
    this.unregisterRequestsListener()
  }
  render() {
    return this.props.render(this.state.friends)
  }
}

export default RequestsProvider
