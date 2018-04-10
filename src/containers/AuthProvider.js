import { Component } from 'react'
import firebase from '../firebase'

class AuthProvider extends Component {
  state = {
    loading: true,
    auth: null,
  }
  componentDidMount() {
    this.unregisterAuthListener = firebase.auth().onAuthStateChanged(auth => {
      this.setState({ loading: false, auth })
    })
  }
  componentWillUnmount() {
    this.unregisterAuthListener()
  }
  render() {
    if (this.state.loading) return null
    return this.props.render(this.state.auth)
  }
}

export default AuthProvider
