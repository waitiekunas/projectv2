import { Button as MaterialButton } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Languages } from '../../enums/languages/languages';
import { useStyles } from '../../Functions/Hooks/useStyles';
import { selectLanguage } from '../../state/selectors/userData.selector';
import { getTranslations } from '../../utils/utils';

const Box = styled.div`
  display: flex;
  justify-content: center;
  height: 64px;
`

type MyProps = {
  language?: Languages
  label?: string
  handleClick: (...args: any[]) => void
  disabled?: boolean
  variant: "text" | "outlined" | "contained"
  color: "default" | "inherit" | "primary" | "secondary"
  type?: string
}

export const Button: React.FC<MyProps> = ({
  label,
  handleClick,
  disabled,
  variant,
  color,
  children,
  type,
}) => {
  const classes = useStyles()
  const language = useSelector(selectLanguage)
  return (
    <Box className={classes.root}>
      <MaterialButton
        onClick={handleClick}
        disabled={disabled}
        variant={variant}
        color={color}
        type={type}
      >
        {children || getTranslations(language, label)}
      </MaterialButton>
    </Box>
  )
}
