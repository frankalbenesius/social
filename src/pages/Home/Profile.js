import React from 'react'
import PropTypes from 'prop-types'
import Section from './Section.js'

const Profile = ({ user, auth }) => (
  <div>
    <Section title="User">
      <div>{user.name}</div>
      <div>{auth.email}</div>
    </Section>
    <Section title="Friends">
      <div>a list of friends will go here</div>
    </Section>
    <Section title="Wall">
      <div>a list of posts will go here</div>
    </Section>
  </div>
)
Profile.propTypes = {
  auth: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
}

export default Profile
