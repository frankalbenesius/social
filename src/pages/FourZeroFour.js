import React from 'react'
import glamorous from 'glamorous'

const Amazing = glamorous.div({
  textAlign: 'center',
  fontSize: 'calc(5em + 20vmin)',
  marginTop: '10%',
  fontFamily: 'monospace',
  color: 'gainsboro',
})

export default () => <Amazing>404</Amazing>
