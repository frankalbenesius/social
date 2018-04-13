import { Component } from 'react'
import PropTypes from 'prop-types'
import { db } from '../firebase'

class UserProvider extends Component {
  state = {
    loading: true,
    user: null,
  }
  startListening = () => {
    const userRef = db.collection('users').doc(this.props.uid)
    this.unregisterUserListener = userRef.onSnapshot(doc => {
      this.setState({ loading: false, user: doc.data() })
    })
  }
  componentDidMount() {
    this.startListening()
  }
  componentDidUpdate(prevProps) {
    if (this.props.uid) {
      if (this.props.uid !== prevProps.uid) {
        this.setState(
          { loading: true, user: null },
          this.unregisterUserListener,
        )
      }
      if (this.state.loading) {
        this.startListening()
      }
    }
  }
  componentWillUnmount() {
    this.unregisterUserListener()
  }
  render() {
    if (this.state.loading) return null
    return this.props.render(this.state.user)
  }
}

UserProvider.propTypes = {
  uid: PropTypes.string.isRequired,
}

export default UserProvider
