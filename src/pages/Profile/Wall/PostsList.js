import React from 'react'
import PostsProvider from '../../../containers/PostsProvider'
import Post from './Post'

export default ({ uid }) => (
  <PostsProvider
    uid={uid}
    render={posts => {
      if (posts.length > 0) {
        return posts.map((post, i) => <Post key={i} post={post} />)
      }
      return 'No posts yet!'
    }}
  />
)
