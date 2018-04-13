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
    if (this.state.isValidAuthUrl) {
      const storedEmail = window.localStorage.getItem('emailForSignIn')
      if (storedEmail) {
        firebase
          .auth()
          .signInWithEmailLink(storedEmail, window.location.href)
          .then(() => window.localStorage.removeItem('emailForSignIn'))
      }
    }
  }

  handleEmailChange = e => this.setState({ email: e.target.value })
  handleEmailSubmit = e => {
    e.preventDefault()
    const email = this.state.email
    firebase.auth().signInWithEmailLink(email, window.location.href)
  }

  render() {
    const currentUser = firebase.auth().currentUser
    if (currentUser) {
      return (
        <Centered>
          <h3>Email Address Confirmed</h3>
          <p>
            You have been correctly authenticated!<br />
          </p>
          <p>
            You probably have Social open already on another tab.<br />
            You can safely close this one and resume that session.<br />
          </p>
          <p>
            Otherwise,{' '}
            <Link to={`/profile/${currentUser.uid}`}>click here</Link> to head
            to your profile.
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
    const storedEmail = window.localStorage.getItem('emailForSignIn')
    if (!storedEmail)
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
