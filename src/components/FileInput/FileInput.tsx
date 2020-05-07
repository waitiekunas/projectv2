import React from 'react';
import { connect } from 'react-redux';

import { DEFAULT_BUTTON_CLASSES } from '../../Constants/Constants';
import { Languages } from '../../enums/languages/languages';
import { translations } from '../../resources/translations/translations';
import { Box } from '../Box/Box';
import Button from '../Button/Button';

type MyProps = {
  handleSubmit: (e: any) => void
  handleChange: (e: any) => void
  language?: Languages
}

const FileInput = (props: MyProps) => {
  return (
    <Box
      size={{
        width: "100%",
      }}
    >
      <form onSubmit={props.handleSubmit}>
        <input type={"file"} onChange={props.handleChange} />
        <Box
          flex={{
            justify: "start",
          }}
        >
          <Box
            size={{
              width: "50%",
            }}
            padding={{
              top: "0.25rem",
            }}
          >
            <Button
              handleClick={props.handleSubmit}
              buttonTexts={translations}
              label={"uploadImage"}
              language={props.language}
              classButton={DEFAULT_BUTTON_CLASSES}
            />
          </Box>
        </Box>
      </form>
    </Box>
  )
}
const mapStateToProps = state => ({
  language: state.language.language,
})
export default connect(mapStateToProps)(FileInput)
