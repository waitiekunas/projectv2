import React from 'react';

import { Box } from '../Box/Box';
import { StyledInput } from './style';

type MyProps = {
  value: any
  handleChange: (e?: any) => void
}
export const Input = (props: MyProps) => {
  return (
    <Box
      size={{
        width: "100%",
      }}
    >
      <StyledInput value={props.value} onChange={props.handleChange} />
    </Box>
  )
}
