import React, { Component } from 'react'
import firebase from '../../../firebase.js'
import glamorous from 'glamorous'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Wrapper = glamorous.div({
  border: '1px dashed lavender',
  padding: '0.5em',
  display: 'inline-block',
  marginBottom: '1em',
})

class ProfileLinkButton extends Component {
  state = {
    copied: false,
  }
  render() {
    return (
      <Wrapper>
        <div style={{ marginBottom: '0.5em' }}>
          To become friends with someone you haven't found <br />in Social yet,
          simply send them a link to your profile.
        </div>
        <CopyToClipboard
          text={`${window.origin}/profile/${firebase.auth().currentUser.uid}`}
          onCopy={() => this.setState({ copied: true })}
        >
          <button>Copy Profile Link to Clipboard</button>
        </CopyToClipboard>
        {this.state.copied ? (
          <span style={{ color: 'green' }}>Copied!</span>
        ) : null}
      </Wrapper>
    )
  }
}

export default ProfileLinkButton
