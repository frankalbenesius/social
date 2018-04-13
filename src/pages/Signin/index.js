import React from 'react'
import { Redirect } from 'react-router-dom'
import qs from 'query-string'
import firebase from '../../firebase'

const sendEmailLink = email => {
  const origin = document.location.origin
  const actionCodeSettings = {
    url: `${origin}/auth`, // redirect URL (must be whitelisted)
    handleCodeInApp: true, // must be true
  }
  return firebase
    .auth()
    .sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => window.localStorage.setItem('emailForSignin', email))
}

const FeedbackMessage = ({ result }) =>
  result ? (
    <div
      style={{
        marginBottom: '1em',
        color: result.type === 'success' ? 'green' : 'red',
      }}
    >
      {result.message}
    </div>
  ) : null

class Signin extends React.Component {
  state = {
    email: '',
    result: undefined,
  }

  handleEmailChange = e => this.setState({ email: e.target.value })

  handleEmailSubmit = e => {
    this.setState({ result: undefined })
    e.preventDefault()
    const email = this.state.email
    sendEmailLink(email)
      .then(() =>
        this.setState({
          result: {
            message: `A signin link has been sent to ${email}. Go click that link!`,
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
      .finally(this.setState({ email: '' }))
  }

  render() {
    const auth = firebase.auth().currentUser
    if (auth) {
      const parsed = qs.parse(this.props.location.search)
      const profileId = parsed.redirectTo || auth.uid
      return <Redirect to={`/profile/${profileId}`} />
    }
    return (
      <div>
        <h3>Sign In to Social</h3>
        <p>Submit your email to send yourself a signin link for Social.</p>
        <p>New user? No problem. You can enter your email below, too.</p>
        <FeedbackMessage result={this.state.result} />
        <form onSubmit={this.handleEmailSubmit}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            onChange={this.handleEmailChange}
            value={this.state.email}
          />
          <br />
          <button type="submit">Send Signin Email</button>
        </form>
      </div>
    )
  }
}

export default Signin
