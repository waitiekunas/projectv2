import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';

import { Box } from '../../components/Box/Box';
import Button from '../../components/Button/Button';
import FileInput from '../../components/FileInput/FileInput';
import { Input } from '../../components/Input/Input';
import { TextArea } from '../../components/TextArea/TextArea';
import { DEFAULT_BUTTON_CLASSES } from '../../Constants/Constants';
import { Languages } from '../../enums/languages/languages';
import { translations } from '../../resources/translations/translations';
import { getTranslations } from '../../utils/utils';

type MyProps = {
  language: Languages
}

const UploadContainer = (props: MyProps) => {
  const [lessonName, setLessonName] = useState("")
  const [lessonDescription, setLessonDescription] = useState("")
  const [uploadedImage, setUploadedImage] = useState<any>([])
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleFileUpload = useCallback(
    (file: File[]) => {
      const files = uploadedFiles.concat(file)
      setUploadedFiles(files)
    },
    [uploadedFiles]
  )
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
              width: ["100%", "100%", "30%"],
            }}
            flex={{
              justify: ["center", "center", "start"],
            }}
          >
            {getTranslations(props.language, "lessonName")}
          </Box>
          <Box
            size={{
              width: ["100%", "100%", "70%"],
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
            height: "50%",
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
              width: ["100%", "100%", "30%"],
            }}
            flex={{
              justify: ["center", "center", "start"],
            }}
          >
            {getTranslations(props.language, "lessonDescription")}
          </Box>
          <Box
            size={{
              width: ["100%", "100%", "70%"],
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
              width: ["100%", "100%", "30%"],
            }}
            flex={{
              justify: ["center", "center", "start"],
            }}
          >
            {getTranslations(props.language, "lessonCover")}
          </Box>
          <Box
            size={{
              width: ["100%", "100%", "70%"],
            }}
            flex={{
              justify: ["center", "center", "start"],
            }}
          >
            <FileInput
              onChange={setUploadedImage}
              label={"uploadImage"}
              value={uploadedImage}
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
              width: ["100%", "100%", "30%"],
            }}
            flex={{
              justify: ["center", "center", "start"],
            }}
          >
            {getTranslations(props.language, "lessonMaterial")}
          </Box>
          <Box
            size={{
              width: ["100%", "100%", "70%"],
            }}
            flex={{
              justify: ["center", "center", "start"],
            }}
          >
            <FileInput
              onChange={handleFileUpload}
              label={"uploadFile"}
              value={uploadedFiles}
            />
          </Box>
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
              handleClick={() => null}
              buttonTexts={translations}
              label={"uploadLesson"}
              language={props.language}
              classButton={DEFAULT_BUTTON_CLASSES}
            />
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
