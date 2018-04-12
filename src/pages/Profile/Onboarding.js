import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Section from './Section.js'
import { db } from '../../firebase'

class Onboarding extends Component {
  state = {
    name: '',
  }
  handleNameChange = e => this.setState({ name: e.target.value })
  handleNameSubmit = e => {
    e.preventDefault()
    const name = this.state.name
    db
      .collection('users')
      .doc(this.props.auth.uid)
      .set({ name })
  }
  render() {
    return (
      <Section title="Welcome to Social!">
        <p>
          There's only <u>one</u> more thing we need from you before you can
          start getting social with your buds, and that's your <b>name</b>.
        </p>
        <p>
          This value is the primary way for friends-of-friends to recognize you
          and request to be your friend, so we recommend that you use your real
          name.
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
          <button type="submit">Submit Name</button>
        </form>
      </Section>
    )
  }
}

Onboarding.propTypes = {
  auth: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }),
}

export default Onboarding
