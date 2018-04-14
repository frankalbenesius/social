import { Component } from 'react'
import PropTypes from 'prop-types'
import { db } from '../firebase'

class FriendsProvider extends Component {
  state = {
    friends: [],
  }
  componentDidMount() {
    this.unregisterFriendsListener = db
      .collection('friendships')
      .where(`members.${this.props.id}`, '==', true)
      .onSnapshot(snapshot => {
        const userPromises = []
        snapshot.forEach(friendship => {
          const friendId = Object.keys(friendship.data().members).filter(
            id => id !== this.props.id,
          )[0]
          userPromises.push(
            db
              .collection('users')
              .doc(friendId)
              .get(),
          )
        })
        Promise.all(userPromises).then(friends => {
          this.setState({ friends: friends.map(f => f.data()) })
        })
      })
  }
  componentWillUnmount() {
    this.unregisterFriendsListener()
  }
  render() {
    return this.props.render(this.state.friends)
  }
}

FriendsProvider.propTypes = {
  id: PropTypes.string.isRequired,
}

export default FriendsProvider
