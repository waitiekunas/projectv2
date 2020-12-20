import React from 'react';
import styled from 'styled-components';

import { Button } from '../../components/Button/Button';
import { Languages } from '../../enums/languages/languages';
import { ClassList } from '../ClassList/ClassList';

const handleClick = e => {
  e.preventDefault()
  console.log("clicked")
}

const Wrapper = styled.div`
  max-height: 40%;
  display:flex;
  justify-content:center;
  flex-direction:column;
`
const HeaderBox = styled.div`
  display:flex;
  justify-content:center;
  flex-direction:row;
`
const ButtonBox = styled.div`
  max-width:200px;
  width:25%;
  height:42%;
  display:flex;
  justify-content:center;
  flex-direction:column;
  align-self:center;
`
const ClassListFullContent = () => {
  return (
    <Wrapper>
      <HeaderBox>
        <h2>Our products</h2>
      </HeaderBox>

      <ClassList />
      <ButtonBox>
        <Button
          handleClick={handleClick}
          label={"subscriptions"}
          language={Languages.LITHUANIA}
          variant="contained"
          color="primary"
        />
      </ButtonBox>
    </Wrapper>
  )
}

export default ClassListFullContent
