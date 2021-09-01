import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 100%;
  background-color: red;
  display: flex;
  justify-content: center;
  color: white;
`

export const Header = ({ text }) => (
  <Wrapper>
    <p>{text}</p>
  </Wrapper>
)
