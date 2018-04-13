import React from 'react'
import firebase from '../../firebase'
import Section from './Section.js'

const FriendsList = ({ match }) => {
  const auth = firebase.auth().currentUser
  if (!auth) return null
  return <Section title="Wall">a list of posts will go here</Section>
}

FriendsList.propTypes = {}

export default FriendsList
