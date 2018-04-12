import React from 'react'
import PropTypes from 'prop-types'
import firebase from '../../firebase'
import UserProvider from '../../containers/UserProvider'
import Onboarding from './Onboarding'
import Section from './Section.js'

const needsOnboarding = user => !user || !user.name

const Home = ({ match }) => {
  const auth = firebase.auth().currentUser
  return (
    <UserProvider
      uid={match.params.id}
      render={user =>
        needsOnboarding(user) ? (
          <Onboarding />
        ) : (
          <div>
            <Section title="User">{user.name}</Section>
            <Section title="Friends">a list of friends will go here</Section>
            <Section title="Wall">a list of posts will go here</Section>
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
