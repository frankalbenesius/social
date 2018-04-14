import { Component } from 'react'
import PropTypes from 'prop-types'
import { db } from '../firebase'

class FriendshipProvider extends Component {
  state = {
    loading: true,
    friendship: null,
  }
  componentDidMount() {
    this.unregisterFriendshipListener = db
      .collection('friendships')
      .where(`members.${this.props.ids[0]}`, '==', true)
      .where(`members.${this.props.ids[1]}`, '==', true)
      .onSnapshot(snapshot => {
        this.setState({ loading: false }, () => {
          snapshot.forEach(doc => {
            this.setState({
              friendship: doc.data(),
            })
          })
        })
      })
  }
  componentWillUnmount() {
    this.unregisterFriendshipListener()
  }
  render() {
    if (this.state.loading) return null
    return this.props.render(this.state.friendship)
  }
}

FriendshipProvider.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default FriendshipProvider
