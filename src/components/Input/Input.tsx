import React from "react"
import styled from "styled-components"

import { StyledInput } from "./style"

const Wrapper = styled.div`
  width: 100%;
`
type MyProps = {
  value: any
  handleChange: (e?: any) => void
}
export const Input = (props: MyProps) => {
  return (
    <Wrapper>
      <StyledInput value={props.value} onChange={props.handleChange} />
    </Wrapper>
  )
}
