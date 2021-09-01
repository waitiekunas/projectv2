import React from "react"
import styled from "styled-components"

import { StyledArea } from "./style"

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

type MyProps = {
  value: any
  handleChange: (e?: any) => void
}
export const TextArea: React.FC<MyProps> = ({ value, handleChange }) => {
  return (
    <Wrapper>
      <StyledArea value={value} onChange={handleChange} />
    </Wrapper>
  )
}
