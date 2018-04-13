import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import UserProvider from '../../containers/UserProvider'
import Section from './Section.js'

export default ({ id }) => {
  return (
    <UserProvider
      uid={id}
      render={profileUser => {
        if (!profileUser) {
          return <Redirect to="/" />
        }
        return (
          <div>
            <Section title="User">{profileUser.name}</Section>
            <p>
              Want to interact with this user?{' '}
              <Link
                to={{
                  pathname: '/signin',
                  search: `?redirectTo=${id}`,
                }}
              >
                Sign in!
              </Link>
            </p>
          </div>
        )
      }}
    />
  )
}
