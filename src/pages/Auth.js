import React from 'react'
import firebase from '../firebase'

class Auth extends React.Component {
  componentDidMount() {
    const { history } = this.props
    // sign in if the current URL is an email link.
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      var email = window.localStorage.getItem('emailForSignIn')
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation')
      }

      // The client SDK will parse the code from the link for you.
      firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then(function(result) {
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn')
          history.push('/')
        })
        .catch(function(error) {
          // Common errors could be invalid email and invalid or expired OTPs.
          console.error(`Error at signInWithEmailLink(). Code: ${error.code}`)
        })
    } else {
      history.push('/')
    }
  }

  render() {
    return null
  }
}

export default Auth
