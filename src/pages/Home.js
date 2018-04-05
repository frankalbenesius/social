import React from 'react'
import * as firebase from 'firebase'

export default () => {
  const user = firebase.auth().currentUser
  return <div>Home Page. Your Email: {user ? user.email : 'unknown'}</div>
}
