import React from 'react'
import PropTypes from 'prop-types'
import glamorous from 'glamorous'

import { db } from '../../firebase'

// THE PROFILE PLAN:
// 1: User Information
//    - display name (editable, visible to friends of friends)
//    - avatar (editable, visible to friends of friends)
//    - email (editable, visible to friends)
// 2: Friends List (different for your own profile)
//    - list of friends, searchable by display name (and email if your list?)
//    - add a friend by email (if your list)
// 3: Wall
//    - Place to comment (only for friends profiles)
//    - List of Posts. Posts have:
//      - Display Name
//      - Avatar
//      - Date
//      - Message
//      - Delete button (if this is your wall)

const Section = ({ title, children }) => {
  const Header = glamorous.h3({
    borderBottom: '1px solid lavender',
  })
  return (
    <div>
      <Header>{title}</Header>
      {children}
    </div>
  )
}

class Profile extends React.Component {
  state = {
    nameFormData: { name: '' },
    isFetchingUserData: true,
    userData: undefined,
  }
  componentDidMount() {
    this.userDoc = db.collection('users').doc(this.props.user.uid)
    this.unregisterUserListener = this.userDoc.onSnapshot(doc =>
      this.setState({ isFetchingUserData: false, userData: doc.data() }),
    )
  }
  componentWillUnmount() {
    this.unregisterUserListener()
  }
  handleNameChange = e =>
    this.setState({ nameFormData: { name: e.target.value } })
  handleNameSubmit = e => {
    e.preventDefault()
    const name = this.state.nameFormData.name
    this.userDoc.set({ name })
  }
  render() {
    const { email } = this.props.user
    if (this.state.isFetchingUserData) return null
    if (!this.state.userData) {
      // user still needs a name!
      // TODO: pull this into it's own component with it's own form state
      return (
        <div>
          <Section title="Welcome to Social!">
            <p>
              There's only <u>one</u> more thing we need from you before you can
              start getting social with your buds, and that's your <b>name</b>.
            </p>
            <p>
              This value is the primary way for friends-of-friends to recognize
              you and request to be your friend, so we recommend that you use
              your real name.
            </p>
            <form onSubmit={this.handleNameSubmit}>
              <label htmlFor="name">Name</label>
              <br />
              <input
                type="text"
                id="name"
                onChange={this.handleNameChange}
                value={this.state.nameFormData.name}
              />
              <br />
              <button type="submit">Submit Name</button>
            </form>
          </Section>
        </div>
      )
    }
    return (
      <div>
        <Section title="User">
          <div>{this.state.userData.name}</div>
          <div>{email}</div>
        </Section>
        <Section title="Friends">
          <div>a list of friends will go here</div>
        </Section>
        <Section title="Wall">
          <div>a list of posts will go here</div>
        </Section>
      </div>
    )
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
}

export default Profile
