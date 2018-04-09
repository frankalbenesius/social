import React from 'react'
import firebase from '../firebase'
import glamorous from 'glamorous'

const P = glamorous.p({ maxWidth: '28em' })

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
        <h3>Sign In to Social</h3>
        <P>Submit your email to send yourself a signin link for Social.</P>
        <P>
          If you don't have an account yet, your account will be created when
          you sign in for the first time. Please be aware that this email will
          also be visible to your friends on Social.
        </P>
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
