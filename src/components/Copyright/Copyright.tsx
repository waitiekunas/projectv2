import React from "react"
import styled from "styled-components"

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledP = styled.p`
  margin: 0;
`

export const Copyright: React.FC = () => {
  const creationYear = 2019

  const resolveYear = () => {
    let date = new Date()
    let year = date.getFullYear()
    return year !== creationYear ? " - " + year : ""
  }

  return (
    <StyledDiv>
      <StyledP>{`\u00A9 ${creationYear}${resolveYear()} Our company`}</StyledP>
    </StyledDiv>
  )
}
