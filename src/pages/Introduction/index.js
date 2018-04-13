import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import queryString from 'query-string'
import firebase, { db } from '../../firebase'
import needsIntroduction from '../../lib/needsIntroduction'

class Onboarding extends Component {
  state = {
    name: '',
  }
  handleNameChange = e => this.setState({ name: e.target.value })
  handleNameSubmit = e => {
    const id = firebase.auth().currentUser.uid
    e.preventDefault()
    const name = this.state.name
    db
      .collection('users')
      .doc(id)
      .set({ id, name })
  }
  render() {
    const auth = firebase.auth().currentUser
    if (!auth) return <Redirect to="/" />
    if (!needsIntroduction(this.props.user)) {
      const parsed = queryString.parse(this.props.location.search)
      const profileId = parsed.redirectTo || auth.uid
      return <Redirect to={`/profile/${profileId}`} />
    }
    return (
      <div>
        <h3>One Last Thing...</h3>
        <p>
          We need to know your <b>name</b> so that your friends will know who
          you are.
        </p>
        <form onSubmit={this.handleNameSubmit}>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            id="name"
            onChange={this.handleNameChange}
            value={this.state.name}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Onboarding
