import React from "react"
import styled from "styled-components"

import NavBar from "../../containers/NavBar/NavBar"

const StyledHeader = styled.header`
  margin-bottom: 1.45rem;
`

const Header = () => (
  <StyledHeader>
    <NavBar />
  </StyledHeader>
)

export default Header
