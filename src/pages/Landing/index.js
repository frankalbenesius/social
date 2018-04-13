import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import firebase from '../../firebase.js'

export default () => {
  const auth = firebase.auth().currentUser
  if (!!auth) {
    return <Redirect to={`/profile/${auth.uid}`} />
  }
  return (
    <div>
      <h3>Welcome to Social</h3>
      <p>
        You can't get social until you <Link to="/signin">sign in</Link>, pal.
      </p>
      <img alt="" src="https://media.giphy.com/media/VfyC5j7sR4cso/giphy.gif" />
    </div>
  )
}
