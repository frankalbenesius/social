import { Component } from 'react'
import PropTypes from 'prop-types'
import { db } from '../firebase'

class UserProvider extends Component {
  state = {
    loading: true,
    user: null,
  }
  componentDidMount() {
    const userRef = db.collection('users').doc(this.props.uid)
    this.unregisterUserListener = userRef.onSnapshot(doc =>
      this.setState({ loading: false, user: doc.data() }),
    )
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
