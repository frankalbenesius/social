import { Component } from 'react'
import firebase, { db } from '../firebase'

const withHandlers = request => {
  const uid = firebase.auth().currentUser.uid
  const requestRef = db.doc(`users/${uid}/requests/${request.id}`)
  const accept = () => requestRef.update({ accepted: true })
  const destroy = () => requestRef.delete()
  return {
    id: request.id,
    ...request.data(),
    accept,
    destroy,
  }
}

class RequestsProvider extends Component {
  state = {
    requests: [],
  }
  componentDidMount() {
    const requestsRef = db
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .collection('requests')
      .where('accepted', '==', false)
    this.unregisterRequestsListener = requestsRef.onSnapshot(snapshot => {
      const requests = []
      snapshot.forEach(requestDoc => requests.push(withHandlers(requestDoc)))
      this.setState({ requests })
    })
  }
  componentWillUnmount() {
    this.unregisterRequestsListener()
  }
  render() {
    return this.props.render(this.state.requests)
  }
}

export default RequestsProvider
