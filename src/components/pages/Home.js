import React from 'react'
import * as firebase from 'firebase'

class Home extends React.Component {
  state = {
    currentUser: firebase.auth().currentUser,
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        Home Page.
        <p>{JSON.stringify(this.state.currentUser)}</p>
      </div>
    )
  }
}

export default Home
