import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { Copyright } from '../../components/Copyright/Copyright';

const FooterStyle = styled.div`
  margin-top: 5%;
  display: flex;
  justify-content:center;
`
const StyledDiv = styled.div`
  display:flex;
  flex-direction:column;
`

const Footer = () => {
  return (
    <FooterStyle >
      <StyledDiv>
        <Link to="/privacy-policy">Privatumo politika</Link>
        <Copyright />
      </StyledDiv>
    </FooterStyle>
  )
}

export default Footer
