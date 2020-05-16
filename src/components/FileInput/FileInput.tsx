import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { DEFAULT_BUTTON_CLASSES } from '../../Constants/Constants';
import { Languages } from '../../enums/languages/languages';
import { getTranslations } from '../../utils/utils';
import { Box } from '../Box/Box';
import { StyledLabel, StyledSpan } from './style';

type MyProps = {
  onChange: (e: any) => void
  language?: Languages
  label: string
  value: any[]
  dispatch?: any
  onDelete: (index: number) => void
}

const FileInput = ({ value, onChange, ...rest }: MyProps) => {
  const [val, setVal] = useState<File[]>(value)
  useEffect(() => {
    setVal(value)
  }, [value])
  const joinFileName = () => (
    <ul>
      {val.map((f, index) => (
        <li key={index}>
          {f.name}{" "}
          <StyledSpan onClick={() => rest.onDelete(index)}>X</StyledSpan>
        </li>
      ))}
    </ul>
  )
  debugger
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
            {getTranslations(rest.language, rest.label)}
            <input
              {...rest}
              style={{ display: "none" }}
              type="file"
              onChange={e => {
                onChange([...e.target.files])
              }}
            />
          </StyledLabel>
        </Box>
      </Box>
      {Boolean(val.length) && (
        <Box
          flex={{
            direction: "column",
          }}
        >
          Selected files:
          <Box
            flex={{
              direction: "row",
            }}
          >
            {joinFileName()}
          </Box>
        </Box>
      )}
    </Box>
  )
}
const mapStateToProps = state => ({
  language: state.language.language,
})
export default connect(mapStateToProps)(FileInput)
