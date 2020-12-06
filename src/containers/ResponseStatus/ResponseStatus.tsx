import React from 'react';

import { Box } from '../../components/Box/Box';
import { Button } from '../../components/Button/Button';
import { Languages } from '../../enums/languages/languages';

interface MyProps {
  text: string
  handleClick: () => void
  language: Languages
}

export const ResponseStatus: React.FC<MyProps> = ({
  text,
  handleClick,
  language,
}) => {
  return (
    <Box
      position={"fixed"}
      backgroundColor={"rgba(0,0,0,0.5)"}
      size={{
        width: "100%",
        height: "100%",
      }}
      top={"0%"}
      left={"0%"}
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
          <p>{text}</p>
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
              handleClick={() => handleClick()}
              label={"close"}
              language={language}
              variant="contained"
              color="primary"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
