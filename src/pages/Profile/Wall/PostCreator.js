import React, { Component } from 'react'
import glamorous from 'glamorous'
import firebase, { db } from '../../../firebase.js'

const CreatorForm = glamorous.form({
  maxWidth: '30em',
  padding: '1em',
  borderRadius: '0.2em',
  border: '1px dashed lavender',
  marginBottom: '1em',
})

const Input = glamorous.input({
  padding: '1em',
  width: '100%',
})

const Button = glamorous.button({
  margin: '1em 0 0',
})

class PostCreator extends Component {
  state = {
    text: '',
  }
  handleInputChange = e => {
    e.preventDefault()
    this.setState({ text: e.target.value })
  }
  handleSubmit = e => {
    e.preventDefault()
    const authUid = firebase.auth().currentUser.uid
    db
      .collection('posts')
      .add({
        wall: this.props.uid,
        content: {
          text: this.state.text,
        },
        author: authUid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        this.setState({ text: '' })
      })
      .catch(e => console.warn(e))
  }
  render() {
    return (
      <CreatorForm onSubmit={this.handleSubmit}>
        <Input onChange={this.handleInputChange} value={this.state.text} />
        <Button type="submit">Submit Post</Button>
      </CreatorForm>
    )
  }
}

export default PostCreator
