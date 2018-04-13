import React from 'react'
import glamorous from 'glamorous'

export default ({ title, children }) => {
  const Wrapper = glamorous.section({
    marginBottom: '1em',
  })
  const Header = glamorous.h3({
    borderBottom: '1px solid lavender',
  })
  return (
    <Wrapper>
      <Header>{title}</Header>
      {children}
    </Wrapper>
  )
}
