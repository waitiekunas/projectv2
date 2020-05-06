import React from 'react';

import { Languages } from '../../enums/languages/languages';
import { TranslationItem } from '../../interfaces/translations/ITranslations';
import { getTranslations } from '../../utils/utils';
import { Box } from '../Box/Box';

type MyProps = {
  buttonTexts: Array<TranslationItem>
  language: Languages
  label: string
  classButtonDiv?: string
  classButton: string
  handleClick: any
  style?: {}
  disabled?: boolean
}
const Button = (props: MyProps) => {
  const { buttonTexts, language, label, handleClick } = props
  return (
    <Box
      className={props.classButtonDiv ? props.classButtonDiv : "h-full w-full"}
      flex={{ justify: "center" }}
      size={{ height: "42px" }}
    >
      <button
        className={props.classButton}
        style={props.style}
        onClick={handleClick}
        disabled={props.disabled}
      >
        {getTranslations(language, label)}
      </button>
    </Box>
  )
}

export default Button
