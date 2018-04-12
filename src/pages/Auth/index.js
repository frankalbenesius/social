import React from 'react'
import { Link } from 'react-router-dom'
import glamorous from 'glamorous'
import firebase from '../../firebase'

const Centered = glamorous.div({ textAlign: 'center' })

class Auth extends React.Component {
  state = {
    isValidAuthUrl: firebase.auth().isSignInWithEmailLink(window.location.href),
    storedEmail: window.localStorage.getItem('emailForSignIn'),
    email: '',
  }

  componentDidMount() {
    if (this.state.isValidAuthUrl && this.state.storedEmail) {
      firebase
        .auth()
        .signInWithEmailLink(this.state.storedEmail, window.location.href)
        .then(() => window.localStorage.removeItem('emailForSignIn'))
    }
  }

  handleEmailChange = e => this.setState({ email: e.target.value })
  handleEmailSubmit = e => {
    e.preventDefault()
    const email = this.state.email
    firebase.auth().signInWithEmailLink(email, window.location.href)
  }

  render() {
    if (firebase.auth().currentUser) {
      return (
        <Centered>
          <h3>Email Address Confirmed</h3>
          <p>
            You have been correctly authenticated!<br />You may now close this
            window and resume your previous session.
          </p>
        </Centered>
      )
    }
    if (!this.state.isValidAuthUrl) {
      return (
        <Centered>
          <h3>Something Went Wrong</h3>
          <p>
            You might try <Link to="signin">signing in</Link> again.
          </p>
        </Centered>
      )
    }
    if (!this.storedEmail)
      return (
        <form onSubmit={this.handleEmailSubmit}>
          <label htmlFor="email">
            Please provide your email for signin confirmation.
          </label>
          <br />
          <input
            type="email"
            id="email"
            onChange={this.handleEmailChange}
            value={this.state.email}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      )
    return null // authing automatically
  }
}

export default Auth
