import { TextField } from '@material-ui/core';
import { Formik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { Button } from '../../components/Button/Button';
import { uploadLessonAction } from '../../state/actions/apiData.actions';
import { selectIsAuthorInfoExists, selectLanguage, selectUserId } from '../../state/selectors/userData.selector';
import { getTranslations } from '../../utils/utils';
import { AuthorDataIsMissing } from '../AuthorDataIsMissing/AuthorDataIsMissing';
import { ResponseStatus } from '../ResponseStatus/ResponseStatus';
import {
  ArrayInputWrapper,
  AttachedFilesWrapper,
  BorderedField,
  ButtonWrapper,
  Content,
  CustomSectionWrapper,
  InputWrapper,
  SectionWrapper,
  StyledButtonBox,
  StyledCenterRow,
  StyledColumnContainer,
  StyledDiv,
  StyledDivInfo,
  StyledFieldArray,
  StyledFileName,
  Wrapper,
} from './style';

export enum UploadFields {
  IMAGE = "image",
  FILE = "file",
  LESSON_NAME = "lessonName",
  LESSON_DESCRIPTION = "lessonDescription",
  USER_ID = "userId",
}
export type UploadFieldValues = {
  [UploadFields.IMAGE]: File
  [UploadFields.FILE]: File[]
  [UploadFields.LESSON_NAME]: string
  [UploadFields.LESSON_DESCRIPTION]: string
  [UploadFields.USER_ID]: string
}
const UploadContainer = () => {
  const dispatch = useDispatch()
  const language = useSelector(selectLanguage)
  const userId = useSelector(selectUserId)
  const isUserAuthorInfoExists = useSelector(selectIsAuthorInfoExists)
  const [showUploadStatus, setShowUploadStatus] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const hideResponseStatus = useCallback(() => {
    setShowUploadStatus(false)
  }, [showUploadStatus])

  const UploadLessonScheme = () =>
    Yup.object().shape({
      [UploadFields.LESSON_NAME]: Yup.string().required(
        "Please enter lesson name"
      ),
      [UploadFields.LESSON_DESCRIPTION]: Yup.string().required(
        "Please enter description"
      ),
      [UploadFields.IMAGE]: Yup.mixed().required("Please upload image"),
      // .test(
      //   "fileFormat",
      //   "Unsupported format",
      //   value =>
      //     value &&
      //     value.file &&
      //     SUPPORTED_IMAGE_FORMATS.includes(value.file.type)
      // ),
      [UploadFields.FILE]: Yup.mixed().required("Materila needed"),
      // TODO: improve file testing
    })
  const onSubmit = (values: UploadFieldValues) => {
    let files = new FormData()
    files.append("image", values.image)
    values.file.forEach(file => files.append("file", file))
    files.append("lessonName", values.lessonName)
    files.append("lessonDescription", values.lessonDescription)
    files.append("userId", values.userId.toString())
    dispatch(uploadLessonAction(files))
  }
  //TODO: info message that author description is missing and you wont be able to update
  return (
    <Wrapper>
      {!isUserAuthorInfoExists && <AuthorDataIsMissing />}
      <Formik<UploadFieldValues>
        enableReinitialize
        initialValues={{
          image: undefined,
          file: [],
          lessonName: "",
          lessonDescription: "",
          userId: userId.toString(),
        }}
        onSubmit={onSubmit}
        validationSchema={UploadLessonScheme}
        validateOnMount
      >
        {({
          handleChange,
          values,
          setFieldValue,
          handleSubmit,
          isSubmitting,
          isValid,
        }) => (
          <Content>
            {!isUserAuthorInfoExists && (
              <SectionWrapper>
                Please upload your data in your account
              </SectionWrapper>
            )}
            <SectionWrapper>
              <StyledDiv>{getTranslations(language, "lessonName")}</StyledDiv>
              <InputWrapper>
                <TextField
                  id="standard-basic"
                  label="Lesson name"
                  onChange={handleChange}
                  name={UploadFields.LESSON_NAME}
                  value={values.lessonName}
                />
              </InputWrapper>
            </SectionWrapper>
            <CustomSectionWrapper>
              <StyledDiv>
                {getTranslations(language, "lessonDescription")}
              </StyledDiv>
              <InputWrapper>
                <BorderedField
                  name={UploadFields.LESSON_DESCRIPTION}
                  onChange={handleChange}
                  value={values.lessonDescription}
                  as="textarea"
                  id="lessonDescription"
                  maxLength={500}
                />
              </InputWrapper>
            </CustomSectionWrapper>
            <SectionWrapper>
              <StyledDiv>{getTranslations(language, "lessonCover")}</StyledDiv>
              <InputWrapper>
                <input
                  onChange={e => {
                    setFieldValue(UploadFields.IMAGE, e.target.files[0])
                  }}
                  name={UploadFields.IMAGE}
                  type="file"
                  id="image"
                />
              </InputWrapper>
            </SectionWrapper>

            <SectionWrapper>
              <StyledDiv>
                <StyledColumnContainer>
                  <StyledDiv>
                    {getTranslations(language, "lessonMaterial")}
                  </StyledDiv>

                  <StyledDivInfo>
                    Pamokos eigos tvarka bus ta pati kaip įkėlimo tvarka
                  </StyledDivInfo>
                </StyledColumnContainer>
              </StyledDiv>

              <StyledFieldArray
                name={UploadFields.FILE}
                render={arrayHelpers => (
                  <ArrayInputWrapper>
                    <div>
                      {values.file?.length > 0 &&
                        values.file.map((f, i) => (
                          <AttachedFilesWrapper key={f.name}>
                            {console.log(values)}
                            {console.log(f)}
                            <StyledFileName>{`${i + 1}. ${
                              f.name
                            }`}</StyledFileName>
                            <Button
                              handleClick={() => arrayHelpers.remove(i)}
                              label="Remove"
                              language={language}
                              variant="contained"
                              color="primary"
                              type="button"
                            />
                          </AttachedFilesWrapper>
                        ))}
                    </div>
                    <StyledCenterRow>
                      <input
                        onChange={e =>
                          setFieldValue(
                            `file.${values.file.length}`,
                            e.target.files[0]
                          )
                        }
                        type="file"
                      />
                    </StyledCenterRow>
                  </ArrayInputWrapper>
                )}
              />
            </SectionWrapper>

            <ButtonWrapper>
              <StyledButtonBox>
                <Button
                  handleClick={handleSubmit}
                  label={"uploadLesson"}
                  language={language}
                  disabled={!isValid || isSubmitting || !isUserAuthorInfoExists}
                  variant="contained"
                  color="primary"
                />
              </StyledButtonBox>
            </ButtonWrapper>
          </Content>
        )}
      </Formik>
      {showUploadStatus && (
        <ResponseStatus
          text={
            uploadSuccess
              ? getTranslations(language, "uploadSuccess")
              : getTranslations(language, "uploadFailed")
          }
          handleClick={hideResponseStatus}
          language={language}
        />
      )}
    </Wrapper>
  )
}

export default UploadContainer
