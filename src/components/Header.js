import React from 'react'
import { Link } from 'react-router-dom'
import glamorous from 'glamorous'

import AuthProvider from '../containers/AuthProvider'
import firebase from '../firebase'

const handleSignOut = () => {
  firebase.auth().signOut() // possible .then().catch()
}

const Wrapper = glamorous.header({
  borderBottom: '1px solid gainsboro',
  display: 'flex',
  alignItems: 'center',
  padding: '0.25em 1em 0',
})
const Left = glamorous.div({ flex: '1 0 auto' })
const Right = glamorous(Left)({ textAlign: 'right' })

export default () => {
  return (
    <Wrapper>
      <Left>
        <h2 style={{ lineHeight: 0 }}>
          <Link to="/">Social</Link>
        </h2>
      </Left>
      <Right>
        <AuthProvider
          render={auth =>
            !auth ? (
              <Link to="/signin">Sign In</Link>
            ) : (
              <Link to="/" onClick={handleSignOut}>
                Sign Out
              </Link>
            )
          }
        />
      </Right>
    </Wrapper>
  )
}
