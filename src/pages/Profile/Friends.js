import React from 'react'
import PropTypes from 'prop-types'
// import Link from 'react-router-dom/Link'
import Section from './Section.js'

const Friends = ({ user, profile }) => {
  return <Section title={'Friends'}>friends</Section>
}

const userDataType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
})
Friends.propTypes = {
  user: userDataType,
  profile: userDataType,
}

export default Friends
