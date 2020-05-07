import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Box } from '../../components/Box/Box';
import FileInput from '../../components/FileInput/FileInput';
import { Input } from '../../components/Input/Input';
import { TextArea } from '../../components/TextArea/TextArea';
import { Languages } from '../../enums/languages/languages';
import { getTranslations } from '../../utils/utils';

type MyProps = {
  language: Languages
}

const UploadContainer = (props: MyProps) => {
  const [lessonName, setLessonName] = useState("")
  const [lessonDescription, setLessonDescription] = useState("")

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
              width: ["100%", "100%", "50%"],
            }}
            flex={{
              justify: ["center", "center", "start"],
            }}
          >
            {getTranslations(props.language, "lessonName")}
          </Box>
          <Box
            size={{
              width: ["100%", "100%", "50%"],
            }}
            flex={{
              justify: ["center", "center", "start"],
            }}
          >
            <Input
              value={lessonName}
              handleChange={e => setLessonName(e.target.value)}
            />
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
              width: ["100%", "100%", "50%"],
            }}
            flex={{
              justify: ["center", "center", "start"],
            }}
          >
            {getTranslations(props.language, "lessonDescription")}
          </Box>
          <Box
            size={{
              width: ["100%", "100%", "50%"],
            }}
            flex={{
              justify: ["center", "center", "start"],
            }}
          >
            <TextArea
              value={lessonDescription}
              handleChange={e => setLessonDescription(e.target.value)}
            />
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
              width: ["100%", "100%", "50%"],
            }}
            flex={{
              justify: ["center", "center", "start"],
            }}
          >
            {getTranslations(props.language, "lessonCover")}
          </Box>
          <Box
            size={{
              width: ["100%", "100%", "50%"],
            }}
            flex={{
              justify: ["center", "center", "start"],
            }}
          >
            <FileInput handleChange={() => null} handleSubmit={() => null} />
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
              width: ["100%", "100%", "50%"],
            }}
            flex={{
              justify: ["center", "center", "start"],
            }}
          >
            {getTranslations(props.language, "lessonMaterial")}
          </Box>
          <Box
            size={{
              width: ["100%", "100%", "50%"],
            }}
            flex={{
              justify: ["center", "center", "start"],
            }}
          >
            <FileInput handleChange={() => null} handleSubmit={() => null} />
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
