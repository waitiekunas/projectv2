import React from 'react';
import { connect } from 'react-redux';

import { Box } from '../../components/Box/Box';
import { Input } from '../../components/Input/Input';
import { Languages } from '../../enums/languages/languages';
import { getTranslations } from '../../utils/utils';

type MyProps = {
  language: Languages
}

const UploadContainer = (props: MyProps) => {
  return (
    <Box
      size={{
        width: "100%",
      }}
      flex={{
        justify: "center",
      }}
    >
      <Box
        size={{
          width: ["90%", "90%", "60%"],
        }}
        padding={{
          all: "5%",
        }}
      >
        <Box
          size={{
            width: "100%",
          }}
          flex={{
            justify: "center",
            direction: ["column", "column", "row"],
          }}
          padding={{
            all: "0.5rem",
          }}
        >
          <Box
            size={{
              width: "50%",
            }}
            flex={{
              justify: "start",
            }}
          >
            {getTranslations(props.language, "lessonName")}
          </Box>
          <Box
            size={{
              width: "50%",
            }}
            flex={{
              justify: "start",
            }}
          >
            <Input value={""} handleChange={() => null} />
          </Box>
        </Box>
        <Box
          size={{
            width: "100%",
          }}
          flex={{
            justify: "center",
            direction: ["column", "column", "row"],
          }}
          padding={{
            all: "0.5rem",
          }}
        >
          <Box
            size={{
              width: "50%",
            }}
            flex={{
              justify: "start",
            }}
          >
            {getTranslations(props.language, "lessonDescription")}
          </Box>
          <Box
            size={{
              width: "50%",
            }}
            flex={{
              justify: "start",
            }}
          >
            sss
          </Box>
        </Box>
        <Box
          size={{
            width: "100%",
          }}
          flex={{
            justify: "center",
            direction: ["column", "column", "row"],
          }}
          padding={{
            all: "0.5rem",
          }}
        >
          <Box
            size={{
              width: "50%",
            }}
            flex={{
              justify: "start",
            }}
          >
            {getTranslations(props.language, "lessonCover")}
          </Box>
          <Box
            size={{
              width: "50%",
            }}
            flex={{
              justify: "start",
            }}
          >
            sss
          </Box>
        </Box>
        <Box
          size={{
            width: "100%",
          }}
          flex={{
            justify: "center",
            direction: ["column", "column", "row"],
          }}
          padding={{
            all: "0.5rem",
          }}
        >
          <Box
            size={{
              width: "50%",
            }}
            flex={{
              justify: "start",
            }}
          >
            {getTranslations(props.language, "lessonMaterial")}
          </Box>
          <Box
            size={{
              width: "50%",
            }}
            flex={{
              justify: "start",
            }}
          >
            sss
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
const mapStateToProps = state => ({
  language: state.language.language,
})
export default connect(mapStateToProps)(UploadContainer)
