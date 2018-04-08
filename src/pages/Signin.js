import React from 'react'
import firebase from '../firebase'

const sendEmailLink = email => {
  const origin = document.location.origin
  const actionCodeSettings = {
    url: `${origin}/auth`, // redirect URL (must be whitelisted)
    handleCodeInApp: true, // must be true
  }
  return firebase
    .auth()
    .sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => window.localStorage.setItem('emailForSignIn', email))
}

class Signin extends React.Component {
  state = {
    formData: {
      email: '',
    },
    result: undefined,
  }

  handleEmailChange = e => {
    this.setState({
      formData: {
        email: e.target.value,
      },
    })
  }

  handleEmailSubmit = e => {
    this.setState({ result: undefined })
    e.preventDefault()
    const email = this.state.formData.email
    sendEmailLink(email)
      .then(() =>
        this.setState({
          result: {
            message: `A signin link has been sent to ${email}.`,
            type: 'success',
          },
        }),
      )
      .catch(err =>
        this.setState({
          result: {
            message: `There was an error. Code: ${err.code}`,
            type: 'error',
          },
        }),
      )
      .finally(this.setState({ formData: { email: '' } }))
  }

  render() {
    return (
      <div>
        {this.state.result ? (
          <div
            style={{
              marginBottom: '1em',
              color: this.state.result.type === 'success' ? 'green' : 'red',
            }}
          >
            {this.state.result.message}
          </div>
        ) : null}
        <form onSubmit={this.handleEmailSubmit}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            onChange={this.handleEmailChange}
            value={this.state.formData.email}
          />
          <br />
          <button type="submit">Send Signin Email</button>
        </form>
      </div>
    )
  }
}

export default Signin
