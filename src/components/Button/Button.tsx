import { Button as MaterialButton } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

import { Languages } from '../../enums/languages/languages';
import { useStyles } from '../../Functions/Hooks/useStyles';
import { getTranslations } from '../../utils/utils';

const Box = styled.div`
  display: flex;
  justify-content: center;
  height: 64px;
`

type MyProps = {
  language: Languages
  label: string
  handleClick: (...args: any[]) => void
  disabled?: boolean
  variant: "text" | "outlined" | "contained"
  color: "default" | "inherit" | "primary" | "secondary"
}

export const Button: React.FC<MyProps> = ({
  language,
  label,
  handleClick,
  disabled,
  variant,
  color,
}) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <MaterialButton
        onClick={handleClick}
        disabled={disabled}
        variant={variant}
        color={color}
      >
        {getTranslations(language, label)}
      </MaterialButton>
    </Box>
  )
}
