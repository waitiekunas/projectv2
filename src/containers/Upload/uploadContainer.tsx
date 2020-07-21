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
import { ResponseStatus } from '../ResponseStatus/ResponseStatus';
import { StyledSpan } from './style';

type MyProps = {
  language: Languages
  userId: number
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
  const [authorImage, setAuthorImage] = useState<any[]>([])
  const [imageAuthorErrorMessage, setImageAuthorErrorMessage] = useState("")
  const [authorDescription, setAuthorDescription] = useState("")
  const [filesList, setFilesList] = useState<any>()
  const [showUploadStatus, setShowUploadStatus] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  useEffect(() => {
    let lessonNameLocal = lessonName
    let lessonDescriptionLocal = lessonDescription
    let uploadedImageLocal = uploadedImage
    let uploadedFilesLocal = uploadedFiles
    let authorImageLocal = authorImage
    let authorDescriptionLocal = authorDescription
    let fileListLocal = filesList
    if (uploadSuccess) {
      lessonNameLocal = ""
      lessonDescriptionLocal = ""
      uploadedImageLocal = []
      uploadedFilesLocal = []
      authorImageLocal = []
      authorDescriptionLocal = ""
      fileListLocal = []
    }
    setUploadSuccess(false)
    setLessonName(lessonNameLocal)
    setLessonDescription(lessonDescriptionLocal)
    setUploadedImage(uploadedImageLocal)
    setFilesList(fileListLocal)
    setUploadedFiles(uploadedFilesLocal)
    setAuthorImage(authorImageLocal)
    setAuthorDescription(authorDescriptionLocal)
  })
  useEffect(() => {
    setFilesList(joinFileName(uploadedFiles))
  }, [uploadedFiles])
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
    },
    [uploadedFiles]
  )
  const handleImageDelete = useCallback(
    (key: number) => {
      setUploadedImage([])
    },
    [uploadedImage]
  )
  const handleAuthorImageDelete = useCallback(
    (key: number) => {
      setAuthorImage([])
    },
    [authorImage]
  )
  const handleFileDelete = (key: number) => {
    let array = uploadedFiles
    array.splice(key, 1)
    setUploadedFiles(array)
    setFilesList(joinFileName(array))
  }
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
  const handleAuthorImageUpload = useCallback(
    (file: File[]) => {
      let message = ""
      let newFile = authorImage
      if (file[0].type.includes("image")) {
        newFile = file
      } else {
        message = "File you tried to upload is not an image"
      }
      setAuthorImage(newFile)
      setImageAuthorErrorMessage(message)
    },
    [uploadedImage]
  )
  const hideResponseStatus = useCallback(() => {
    setShowUploadStatus(false)
  }, [showUploadStatus])

  useEffect(() => {
    allFieldsHaveValue()
  })
  useEffect(() => {
    if (upload) {
      let files = new FormData()
      if (authorImage.length > 0) {
        files.append("authorImage", authorImage[0])
      }
      if (authorDescription) {
        files.append("authorDescription", authorDescription)
      }
      files.append("image", uploadedImage[0])
      uploadedFiles.forEach(file => files.append("file", file))
      files.append("lessonName", lessonName)
      files.append("lessonDescription", lessonDescription)
      files.append("userId", props.userId.toString())
      axios.post(process.env.UPLOAD_URL, files, {}).then(res => {
        let success = false
        if (res.status === 200) {
          success = true
        }
        setUploadSuccess(success)
        setShowUploadStatus(true)
      })
    }
    setUpload(false)
  }, [upload])
  const allFieldsHaveValue = () => {
    let tempDisabled = true
    if (lessonName && lessonDescription && uploadedFiles.length > 0) {
      tempDisabled = false
    }
    setDisabled(tempDisabled)
  }
  const handleUpload = () => {
    setUpload(!upload)
  }
  const joinFileName = (array: any[]) => (
    <ul>
      {array.map((f, index) => (
        <li key={index}>
          {f.name}{" "}
          <StyledSpan onClick={() => handleFileDelete(index)}>X</StyledSpan>
        </li>
      ))}
    </ul>
  )
  console.log(props.userId)
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
              label={getTranslations(props.language, "uploadImage")}
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
              label={`${getTranslations(
                props.language,
                "uploadLesson"
              )} ${uploadedFiles.length + 1} ${getTranslations(
                props.language,
                "step"
              )}`}
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
          ></Box>
          <Box
            size={{
              width: ["100%", "100%", "70%"],
            }}
            flex={{
              justify: ["center", "center", "start"],
            }}
          >
            {Boolean(uploadedFiles.length) && (
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
                  {filesList}
                </Box>
              </Box>
            )}
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
            {getTranslations(props.language, "authorPicture")}
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
              onChange={handleAuthorImageUpload}
              label={getTranslations(props.language, "uploadImage")}
              value={authorImage}
              onDelete={handleAuthorImageDelete}
              errorMessage={imageAuthorErrorMessage}
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
            {getTranslations(props.language, "authorDescription")}
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
              value={authorDescription}
              handleChange={e => setAuthorDescription(e.target.value)}
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
      {showUploadStatus && (
        <ResponseStatus
          text={
            uploadSuccess
              ? getTranslations(props.language, "uploadSuccess")
              : getTranslations(props.language, "uploadFailed")
          }
          handleClick={hideResponseStatus}
          language={props.language}
        />
      )}
    </Box>
  )
}
const mapStateToProps = state => ({
  language: state.language.language,
  userId: state.userId.userId,
})
export default connect(mapStateToProps)(UploadContainer)
