import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { DEFAULT_BUTTON_CLASSES } from '../../Constants/Constants';
import { Languages } from '../../enums/languages/languages';
import { Box } from '../Box/Box';
import { StyledLabel } from './style';

type MyProps = {
  onChange: (e: any) => void
  language?: Languages
  label: string
  value: any[]
  onDelete: (index: number) => void
  errorMessage?: string
}

const FileInput = ({ value, onChange, errorMessage, ...rest }: MyProps) => {
  const [val, setVal] = useState<File[]>(value)
  const [errorMsg, setErrorMessage] = useState(errorMessage)
  useEffect(() => {
    setVal(value)
    setErrorMessage(errorMessage)
  }, [value, errorMessage])
  useEffect(() => {
    setVal(value)
  }, [])

  return (
    <Box
      size={{
        width: "100%",
      }}
      padding={{
        bottom: "8px",
      }}
      flex={{
        direction: "column",
      }}
    >
      <Box
        size={{
          width: "100%",
        }}
        flex={{
          justify: ["center", "center", "start"],
        }}
        padding={{
          bottom: "8px",
        }}
      >
        <Box
          size={{
            width: "50%",
          }}
        >
          <StyledLabel className={DEFAULT_BUTTON_CLASSES}>
            {rest.label}
            <input
              {...rest}
              style={{ display: "none" }}
              type="file"
              onChange={e => {
                if (e.target.files.length > 0) {
                  onChange([...e.target.files])
                }
              }}
            />
          </StyledLabel>
        </Box>
      </Box>
      <span>{errorMsg}</span>
    </Box>
  )
}
const mapStateToProps = state => ({
  language: state.language.language,
})
export default connect(mapStateToProps)(FileInput)
