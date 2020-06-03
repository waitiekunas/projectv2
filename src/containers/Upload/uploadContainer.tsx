import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
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
  const [disabled, setDisabled] = useState(true)
  const [upload, setUpload] = useState(false)
  const [imageErrorMessage, setImageErrorMessage] = useState("")
  const [fileErrorMessage, setFileErrorMessage] = useState("")
  const handleFileUpload = useCallback(
    (file: File[]) => {
      let message = ""
      let files = uploadedFiles
      if (file[0].type.includes("pdf") || file[0].type.includes("video")) {
        files = uploadedFiles.concat(file)
      } else {
        message = "Here you can upload only '.pdf' or a video file"
      }
      setFileErrorMessage(message)
      setUploadedFiles(files)
      debugger
    },
    [uploadedFiles]
  )
  const handleImageDelete = useCallback(
    (key: number) => {
      setUploadedImage([])
    },
    [uploadedImage]
  )
  const handleFileDelete = useCallback(
    (key: number) => {
      let array = uploadedFiles
      array.splice(key, 1)
      setUploadedFiles(array)
      debugger
    },
    [uploadedFiles]
  )
  const handleImageUpload = useCallback(
    (file: File[]) => {
      let message = ""
      let newFile = uploadedImage
      if (file[0].type.includes("image")) {
        newFile = file
      } else {
        message = "File you tried to upload is not an image"
      }
      setUploadedImage(newFile)
      setImageErrorMessage(message)
    },
    [uploadedImage]
  )
  useEffect(() => {
    allFieldsHaveValue()
  })
  useEffect(() => {
    if (upload) {
      let files = new FormData()
      files.append("image", uploadedImage[0])
      uploadedFiles.forEach(file => files.append("file", file))
      files.append("lessonName", lessonName)
      files.append("lessonDescription", lessonName)
      files.append("lessonAuthor", "test")
      axios.post("http://localhost:5000/admin/upload", files, {}).then(res => {
        console.log(res.statusText)
      })
    }
    setUpload(false)
  }, [upload])
  const allFieldsHaveValue = () => {
    let tempDisabled = true
    if (lessonName && lessonDescription && uploadedFiles.length > 0) {
      tempDisabled = false
    }
    setDisabled(false)
  }
  const handleUpload = () => {
    setUpload(!upload)
  }

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
        {disabled && (
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
              All field must have value
            </Box>
          </Box>
        )}

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
              onChange={handleImageUpload}
              label={"uploadImage"}
              value={uploadedImage}
              onDelete={handleImageDelete}
              errorMessage={imageErrorMessage}
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
              onDelete={handleFileDelete}
              errorMessage={fileErrorMessage}
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
              handleClick={() => handleUpload()}
              buttonTexts={translations}
              label={"uploadLesson"}
              language={props.language}
              classButton={DEFAULT_BUTTON_CLASSES}
              disabled={disabled}
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
