import React from 'react'
import glamorous from 'glamorous'

export default ({ title, children }) => {
  const Header = glamorous.h3({
    borderBottom: '1px solid lavender',
  })
  return (
    <div>
      <Header>{title}</Header>
      {children}
    </div>
  )
}
