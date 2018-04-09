import React from 'react'
import Link from 'react-router-dom/Link'

export default () => (
  <div>
    <h3>Welcome to Social</h3>
    <p>
      You can't get social until you <Link to="/signin">sign in</Link>, pal.
    </p>
    <img alt="" src="https://media.giphy.com/media/VfyC5j7sR4cso/giphy.gif" />
  </div>
)
