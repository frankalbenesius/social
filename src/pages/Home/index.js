import React from 'react'
import PropTypes from 'prop-types'

import UserProvider from '../../containers/UserProvider'
import Profile from './Profile'
import Onboarding from './Onboarding'

const needsOnboarding = user => !user || !user.name

const Home = ({ auth }) => (
  <UserProvider
    uid={auth.uid}
    render={user =>
      needsOnboarding(user) ? (
        <Onboarding auth={auth} />
      ) : (
        <Profile auth={auth} user={user} />
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
