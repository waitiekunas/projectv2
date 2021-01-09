import { Link } from 'gatsby';
import React, { useState } from 'react';
import styled from 'styled-components';

import { Button } from '../../components/Button/Button';
import { Copyright } from '../../components/Copyright/Copyright';
import { Contacts } from '../Contacts/Contacts';

const FooterStyle = styled.div`
  margin-top: 5%;
  display: flex;
  justify-content: center;
`
const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  align-items: center;
`

const ButtonWrapper = styled.div`
  align-items: center;
`

const Footer = () => {
  const [showExtended, setShowExtended] = useState<boolean>(false)
  return (
    <FooterStyle>
      {showExtended ? (
        <Contacts handleClick={() => setShowExtended(false)} />
      ) : (
        <StyledDiv>
          <Copyright />
          <ButtonWrapper>
            <Button
              variant="text"
              color="primary"
              handleClick={() => setShowExtended(true)}
              label="contacts"
            />
          </ButtonWrapper>
          <Link to="/privacy-policy">Privatumo politika</Link>
        </StyledDiv>
      )}
    </FooterStyle>
  )
}

export default Footer
