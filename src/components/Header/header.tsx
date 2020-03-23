import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import NavBar from '../../containers/NavBar/NavBar';

const Header = ({ siteTitle }: any) => (
  <header
    style={{
      marginBottom: `1.45rem`,
    }}
  >
    <NavBar />
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
