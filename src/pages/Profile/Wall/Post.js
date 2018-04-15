import React from 'react'
import Link from 'react-router-dom/Link'
import glamorous from 'glamorous'
import { format } from 'date-fns'
import UserProvider from '../../../containers/UserProvider'

const Wrapper = glamorous.div({
  margin: '1em 0',
  padding: '0.25em 1em',
  borderLeft: '2px solid lavender',
})

const Header = glamorous.header({
  marginBottom: '0.25em',
})

const Author = glamorous.span({
  marginRight: '1rem',
})

const DateLine = glamorous.span({
  fontStyle: 'italic',
})

const Content = glamorous.div({})

export default ({ post }) => (
  <UserProvider
    uid={post.author}
    render={user => (
      <Wrapper>
        <Header>
          <Author>
            <Link to={`/profile/${user.id}`}>{user.name}</Link>
          </Author>
          <DateLine>{format(post.createdAt, 'M/D/YY h:mm:ssa')}</DateLine>
        </Header>
        <Content>{post.content.text}</Content>
      </Wrapper>
    )}
  />
)
