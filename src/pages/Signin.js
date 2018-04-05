import React from 'react'
import * as firebase from 'firebase'

const sendEmailLink = email => {
  const origin = document.location.origin
  const actionCodeSettings = {
    url: `${origin}/auth`, // redirect URL (must be whitelisted)
    handleCodeInApp: true, // must be true
  }
  firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
  .then(function() {
    // we store the email locally so we don't have to ask again
    // after they've followed the signin link in their email
    window.localStorage.setItem('emailForSignIn', email);
    alert("a signin link was sent to your email", "test")
  })
  .catch(function(error) {
    alert(`Error code: ${error.code}`)
  });
}

class Signin extends React.Component {
  state = {
    form: {
      email: ''
    }
  }

  handleEmailChange = e => {
    this.setState({
      form: {
        email: e.target.value
      }
    })
  }

  handleEmailSubmit = e => {
    e.preventDefault()
    const email = this.state.form.email
    sendEmailLink(email)
    this.setState({
      form: {
        email: ''
      }
    })
  }

  render() {
    return (
      <form onSubmit={this.handleEmailSubmit}>
        <label htmlFor="email">Email</label><br />
        <input
          type="email"
          id="email"
          onChange={this.handleEmailChange}
          value={this.state.form.email}
        /><br />
        <button type="submit">Send Signin Email</button>
      </form>
    )
  }
}

export default Signin
