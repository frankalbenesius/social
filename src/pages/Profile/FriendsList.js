import React from 'react'
import PropTypes from 'prop-types'
import firebase from '../../firebase'
import Section from './Section.js'

const FriendsList = ({ match }) => {
  const auth = firebase.auth().currentUser
  if (!auth) return null
  return <Section title="Friends">a list of friends will go here</Section>
}

FriendsList.propTypes = {}

export default FriendsList
