import React from 'react';

import { Box } from '../Box/Box';

type MyProps = {
  value: any
  handleChange: (e?: any) => void
}
export const Input = (props: MyProps) => {
  return (
    <Box>
      <input value={props.value} onChange={props.handleChange} />
    </Box>
  )
}
