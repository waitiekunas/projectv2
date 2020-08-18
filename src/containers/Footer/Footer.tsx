import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import Copyright from '../../components/Copyright/Copyright';

const FooterStyle = styled.div`
  margin-top: 5%;
`

const Footer = (props: any) => {
  return (
    <FooterStyle className={"flex justify-center"}>
      <div className={"flex-col"}>
        <Link to="/privacy-policy">Privatumo politika</Link>
        <Copyright />
      </div>
    </FooterStyle>
  )
}

export default Footer
