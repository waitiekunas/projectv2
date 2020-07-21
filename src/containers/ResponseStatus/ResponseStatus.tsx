import React from 'react';

import { Box } from '../../components/Box/Box';
import Button from '../../components/Button/Button';
import { DEFAULT_BUTTON_CLASSES } from '../../Constants/Constants';
import { Languages } from '../../enums/languages/languages';
import { translations } from '../../resources/translations/translations';

interface MyProps {
  text: string
  handleClick: () => void
  language: Languages
}

export const ResponseStatus = (props: MyProps) => {
  return (
    <Box
      position={"fixed"}
      backgroundColor={"rgba(0,0,0,0.5)"}
      size={{
        width: "100%",
        height: "100%",
      }}
      top={"0%"}
      flex={{
        direction: "column",
        justify: "center",
      }}
    >
      <Box
        position={"relative"}
        backgroundColor={"aliceblue"}
        size={{
          width: "50%",
          height: "50%",
        }}
        top={"0%"}
        flex={{
          direction: "column",
          justify: "center",
        }}
        align={{
          self: "center",
        }}
      >
        <Box
          flex={{
            justify: "center",
            direction: "row",
          }}
        >
          <p>{props.text}</p>
        </Box>

        <Box
          size={{
            width: "100%",
          }}
          flex={{
            justify: "center",
            direction: ["row"],
          }}
          padding={{
            top: "1.5rem",
          }}
        >
          <Box
            size={{
              width: "25%",
            }}
          >
            <Button
              handleClick={() => props.handleClick()}
              buttonTexts={translations}
              label={"close"}
              language={props.language}
              classButton={DEFAULT_BUTTON_CLASSES}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
