import { Component } from 'react'
import { db } from '../firebase'

class PostsProvider extends Component {
  state = {
    posts: [],
  }
  componentDidMount() {
    const postsRef = db
      .collection('posts')
      .where('wall', '==', this.props.uid)
      .orderBy('createdAt', 'desc')
    this.unregisterRequestsListener = postsRef.onSnapshot(snapshot => {
      const posts = []
      snapshot.forEach(postDoc => posts.push(postDoc.data()))
      this.setState({ posts })
    })
  }
  componentWillUnmount() {
    this.unregisterRequestsListener()
  }
  render() {
    return this.props.render(this.state.posts)
  }
}

export default PostsProvider
