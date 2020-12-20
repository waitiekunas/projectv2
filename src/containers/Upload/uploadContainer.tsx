import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Button } from '../../components/Button/Button';
import FileInput from '../../components/FileInput/FileInput';
import { Input } from '../../components/Input/Input';
import { TextArea } from '../../components/TextArea/TextArea';
import { Languages } from '../../enums/languages/languages';
import { getTranslations } from '../../utils/utils';
import { ResponseStatus } from '../ResponseStatus/ResponseStatus';
import { StyledSpan } from './style';

const Wrapper = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
`

const Content = styled.div`
  width:90%;
  padding:5%;
  @media(max-width: 480px){
    width:60%;
  }
`
const SectionWrapper = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  flex-direction:column;
  padding:0.5rem;
  @media(max-width:480px){
    flex-direction: row;
  }
`
const StyledDiv = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  @media(max-width:480px){
    width:30%;
    justify-content:start;
  }
`
const InputWrapper = styled.div`
  display:flex;
  justify-content:center;
  width:100%;
  @media(max-width:480px){
    width:70%;
    justify-content:start;
  }
`
const CustomSectionWrapper = styled.div`
  width:100%;
  height:50%;
  display:flex;
  justify-content:center;
  flex-direction:column;
  padding:0.5rem;
  @media(max-width:480px){
    flex-direction:row;
  }
`
const UploadedItemsWrapper = styled.div`
  display:flex;
  flex-direction:column;
`
const UploadedItemsContent = styled.div`
  display:flex;
  flex-direction:row;
`

const ButtonWrapper = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  flex-direction:row;
  padding-top:1.5rem;
`
const StyledButtonBox = styled.div`
  width:25%;
`
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
    <Wrapper>
      <Content>
        {disabled && (
          <SectionWrapper>
            <StyledDiv>
              All field must have value
            </StyledDiv>
          </SectionWrapper>
        )}

        <SectionWrapper>
          <StyledDiv>
            {getTranslations(props.language, "lessonName")}
          </StyledDiv>
          <InputWrapper>
            <Input
              value={lessonName}
              handleChange={e => setLessonName(e.target.value)}
            />
          </InputWrapper>
        </SectionWrapper>
        <CustomSectionWrapper>
          <StyledDiv>
            {getTranslations(props.language, "lessonDescription")}
          </StyledDiv>
          <InputWrapper>
            <TextArea
              value={lessonDescription}
              handleChange={e => setLessonDescription(e.target.value)}
            />
          </InputWrapper>
        </CustomSectionWrapper>
        <SectionWrapper>
          <StyledDiv>
            {getTranslations(props.language, "lessonCover")}
          </StyledDiv>
          <InputWrapper>
            <FileInput
              onChange={handleImageUpload}
              label={getTranslations(props.language, "uploadImage")}
              value={uploadedImage}
              onDelete={handleImageDelete}
              errorMessage={imageErrorMessage}
            />
          </InputWrapper>
        </SectionWrapper>

        <SectionWrapper>
          <StyledDiv>
            {getTranslations(props.language, "lessonMaterial")}
          </StyledDiv>
          <InputWrapper>
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
          </InputWrapper>
        </SectionWrapper>

        <SectionWrapper>
          
          <InputWrapper>
            {Boolean(uploadedFiles.length) && (
              <UploadedItemsWrapper>
                Selected files:
                <UploadedItemsContent>
                  {filesList}
                </UploadedItemsContent>
              </UploadedItemsWrapper>
            )}
          </InputWrapper>
        </SectionWrapper>
        <SectionWrapper>
          <StyledDiv>
            {getTranslations(props.language, "authorPicture")}
          </StyledDiv>
          <InputWrapper>
            <FileInput
              onChange={handleAuthorImageUpload}
              label={getTranslations(props.language, "uploadImage")}
              value={authorImage}
              onDelete={handleAuthorImageDelete}
              errorMessage={imageAuthorErrorMessage}
            />
          </InputWrapper>
        </SectionWrapper>
        <SectionWrapper>
          <StyledDiv>
            {getTranslations(props.language, "authorDescription")}
          </StyledDiv>
          <InputWrapper>
            <TextArea
              value={authorDescription}
              handleChange={e => setAuthorDescription(e.target.value)}
            />
          </InputWrapper>
        </SectionWrapper>
        <ButtonWrapper>
          <StyledButtonBox>
            <Button
              handleClick={() => handleUpload()}
              label={"uploadLesson"}
              language={props.language}
              disabled={disabled}
              variant='contained'
              color='primary'
            />
          </StyledButtonBox>
        </ButtonWrapper>
      </Content>
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
    </Wrapper>
  )
}
const mapStateToProps = state => ({
  language: state.language.language,
  userId: state.userId.userId,
})
export default connect(mapStateToProps)(UploadContainer)
