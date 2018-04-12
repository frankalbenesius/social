import React from 'react'
import PropTypes from 'prop-types'
import firebase from '../../firebase'
import UserProvider from '../../containers/UserProvider'
import Onboarding from './Onboarding'
import Section from './Section.js'

const needsOnboarding = user => !user || !user.name // change to first + last

const Home = ({ match }) => {
  const auth = firebase.auth().currentUser
  return (
    <UserProvider
      uid={match.params.id}
      render={user =>
        needsOnboarding(user) ? (
          <Onboarding auth={auth} />
        ) : (
          <div>
            <Section title="User">
              <div>{user.name}</div>
              <div>auth: {!!auth ? 'yeah' : 'nah'}</div>
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
}

Home.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
}

export default Home
