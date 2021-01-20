import React from "react"
import styled from "styled-components"

import { ClassList } from "../ClassList/ClassList"

const Wrapper = styled.div`
  max-height: 40%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`
const HeaderBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`

const ClassListFullContent = () => {
  return (
    <Wrapper>
      <HeaderBox>
        <h2>Our products</h2>
      </HeaderBox>

      <ClassList />
    </Wrapper>
  )
}

export default ClassListFullContent
