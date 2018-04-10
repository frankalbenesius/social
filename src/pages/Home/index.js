import React from 'react'
import PropTypes from 'prop-types'

import UserProvider from '../../containers/UserProvider'
import Section from './Section'
import Onboarding from './Onboarding'

const needsOnboarding = user => !user || !user.name

const Home = ({ auth }) => (
  <UserProvider
    uid={auth.uid}
    render={user =>
      needsOnboarding(user) ? (
        <Onboarding auth={this.props.auth} />
      ) : (
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
    }
  />
)

Home.propTypes = {
  auth: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
}

export default Home
