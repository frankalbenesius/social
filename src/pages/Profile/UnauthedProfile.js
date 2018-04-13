import React from 'react'
import { Link } from 'react-router-dom'
import UserProvider from '../../containers/UserProvider'
import Section from './Section.js'

export default ({ id }) => {
  return (
    <UserProvider
      uid={id}
      render={profileUser => (
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
      )}
    />
  )
}
