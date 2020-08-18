import React from 'react';

import { Box } from '../../components/Box/Box';

export const Header = ({ text }) => (
  <Box
    size={{
      width: "100%",
    }}
    backgroundColor="red"
    flex={{
      justify: "center",
    }}
    color="white"
  >
    <p>{text}</p>
  </Box>
)
