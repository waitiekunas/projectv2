import React from 'react';

import { Box } from '../Box/Box';
import { StyledArea } from './style';

type MyProps = {
  value: any
  handleChange: (e?: any) => void
}
export const TextArea = (props: MyProps) => {
  return (
    <Box
      size={{
        width: "100%",
        height: "100%",
      }}
    >
      <StyledArea value={props.value} onChange={props.handleChange} />
    </Box>
  )
}
