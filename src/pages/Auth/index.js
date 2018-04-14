import React from 'react'
import { Link } from 'react-router-dom'
import glamorous from 'glamorous'
import firebase from '../../firebase'

const Centered = glamorous.div({ textAlign: 'center' })

class Auth extends React.Component {
  state = {
    completedSignin: false,
    isValidAuthUrl: firebase.auth().isSignInWithEmailLink(window.location.href),
    email: '',
  }

  signin = email => {
    firebase
      .auth()
      .signInWithEmailLink(email, window.location.href)
      .then(() => {
        this.setState({ completedSignin: true })

        window.localStorage.removeItem('emailForSignin')
      })
  }

  componentDidMount() {
    if (this.state.isValidAuthUrl) {
      const storedEmail = window.localStorage.getItem('emailForSignin')
      if (storedEmail) {
        this.signin(storedEmail)
      }
    }
  }

  handleEmailChange = e => this.setState({ email: e.target.value })
  handleEmailSubmit = e => {
    e.preventDefault()
    const email = this.state.email
    this.signin(email)
  }

  render() {
    if (this.state.completedSignin) {
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
            Otherwise, <Link to="/">click here</Link> to head to your profile.
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
    const storedEmail = window.localStorage.getItem('emailForSignin')
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
