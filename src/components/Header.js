import React from 'react'
import { Link } from 'react-router-dom'
import firebase from '../firebase'

const handleSignOut = () => {
  firebase
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
    })
    .catch(function(error) {
      // An error happened.
    })
}

export default ({ user }) => {
  return (
    <header style={{ borderBottom: '1px solid black', marginBottom: '1em' }}>
      <Link to="/">
        <h1 style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          Social
        </h1>
      </Link>
      <p>
        You Are {!!user ? '' : 'Not'} Signed In &mdash;&nbsp;
        {!!user ? (
          <Link to="" onClick={handleSignOut}>
            Sign Out
          </Link>
        ) : (
          <Link to="/signin">Sign In</Link>
        )}
      </p>
    </header>
  )
}
