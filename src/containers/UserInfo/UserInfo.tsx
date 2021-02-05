import { TextField } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import * as Yup from 'yup';

import { AuthorInfo } from '../../components/AuthorInfo/AuthorInfo';
import { Button } from '../../components/Button/Button';
import { Languages } from '../../enums/languages/languages';
import { useStyles } from '../../Functions/Hooks/useStyles';
import { setShowUserInfo } from '../../state/actions/actions';
import { editAuthorAction, editPasswordAction } from '../../state/actions/apiData.actions';
import { selectUserInfoShow } from '../../state/selectors/appData.selector';
import { selectUserId, selectUserInfo } from '../../state/selectors/userData.selector';
import { getTranslations } from '../../utils/utils';

type WrapperProps = {
  show: boolean
}
const Wrapper = styled.div`
  display: ${(props: WrapperProps) => (props.show ? `flex` : `hidden`)};
  justify-content: center;
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 120%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0%;
`
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
const StyledDiv = styled.div`
  width: 50%;
  position: fixed;
  margin-bottom: 1rem;
  padding-bottom: 2rem;
  padding-top: 1.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 0.25rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: #fff;
  @media (max-width: 760px) {
    width: 90%;
  }
  top: 25%;
`
const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
`
const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 1rem;
`
const CenteredDiv = styled.div`
  display: flex;
  align-items: center;
`

const BorderedField = styled(Field)`
  border: 1px solid;
`

type Props = {
  language: Languages
}
export enum EditPasswordFields {
  oldPassword = "oldPassword",
  newPassword = "newPassword",
  loginName = "loginName",
}

export type EditPasswordFormValues = {
  [EditPasswordFields.newPassword]: string
  [EditPasswordFields.oldPassword]: string
  [EditPasswordFields.loginName]: string
}

export enum EditAuthorFields {
  image = "file",
  description = "description",
  loginName = "loginName",
  photo_public_id = "photo_public_id",
  userId = "userId",
}

export type EditAuthorValues = {
  [EditAuthorFields.image]: any
  [EditAuthorFields.description]: string
  [EditAuthorFields.loginName]: string
  [EditAuthorFields.photo_public_id]: string
  [EditAuthorFields.userId]: number
}
export const UserInfo: React.FC<Props> = ({ language }) => {
  const dispatch = useDispatch()
  const show = useSelector(selectUserInfoShow)
  const userInfoState = useSelector(selectUserInfo)
  const [editPassword, setEditPassword] = useState<boolean>(false)
  const classes = useStyles()
  const [editAuthorInfo, setEditAuthorInfo] = useState<boolean>(false)
  const userId = useSelector(selectUserId)
  const isAuthor = userInfoState.canUpload

  const onEditPasswordSubmit = (values: EditPasswordFormValues) => {
    dispatch(setShowUserInfo(false))
    dispatch(editPasswordAction(values))
  }
  const onEditAuthorSubmit = (values: EditAuthorValues) => {
    let files = new FormData()
    files.append(EditAuthorFields.image, values.file)
    files.append(EditAuthorFields.description, values.description)
    files.append(EditAuthorFields.loginName, values.loginName)
    files.append(EditAuthorFields.photo_public_id, values.photo_public_id)
    files.append(EditAuthorFields.userId, values.userId.toString())
    let author = new FormData()
    author.append("id", values.userId.toString())
    dispatch(editAuthorAction(files))
    dispatch(setEditAuthorInfo(false))
  }
  const handleChildClick = e => {
    e.stopPropagation()
  }
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ]
  const EditPasswordScheme = () =>
    Yup.object().shape({
      [EditPasswordFields.oldPassword]: Yup.string().required(
        "Please enter current password"
      ),
      [EditPasswordFields.newPassword]: Yup.string().required(
        "Please enter new password"
      ),
    })
  const EditAuthorScheme = () =>
    Yup.object().shape({
      [EditAuthorFields.description]: Yup.string().required(
        "Please enter description"
      ),
      [EditAuthorFields.image]: Yup.mixed().required("Please attach image"),
      // .test(
      //   "fileFormat",
      //   "Unsupported format",
      //   value =>
      //     value && value.file && SUPPORTED_FORMATS.includes(value.file.type)
      // ),
    })

  return (
    <Wrapper show={show} onClick={() => dispatch(setShowUserInfo(false))}>
      <Container>
        <StyledDiv onClick={handleChildClick}>
          <ContentWrapper>
            {!editPassword ? (
              <Content>
                <CenteredDiv>
                  {getTranslations(language, "password")}
                </CenteredDiv>

                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  handleClick={() => setEditPassword(true)}
                  variant="contained"
                  color="primary"
                >
                  {getTranslations(language, "Change password")}
                </Button>
              </Content>
            ) : (
              <Formik<EditPasswordFormValues>
                enableReinitialize
                initialValues={{
                  loginName: userInfoState.loginName || "",
                  oldPassword: "",
                  newPassword: "",
                }}
                onSubmit={onEditPasswordSubmit}
                validationSchema={EditPasswordScheme}
                validateOnMount
              >
                {({
                  handleChange,
                  handleSubmit,
                  isValid,
                  values,
                  isSubmitting,
                }) => (
                  <Form>
                    <Content className={classes.root}>
                      <TextField
                        id="standard-basic"
                        label="Current password"
                        name={EditPasswordFields.oldPassword}
                        onChange={handleChange}
                        value={values.oldPassword}
                      />
                      <TextField
                        id="standard-basic"
                        label="New password"
                        onChange={handleChange}
                        name={EditPasswordFields.newPassword}
                        value={values.newPassword}
                      />
                    </Content>
                    <Button
                      color="primary"
                      variant="contained"
                      disabled={!isValid || isSubmitting}
                      handleClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            )}

            {isAuthor && !editAuthorInfo && (
              <>
                <AuthorInfo />
                <Container>
                  <Button
                    color="primary"
                    variant="contained"
                    handleClick={() => setEditAuthorInfo(true)}
                  >
                    EDIT INFO
                  </Button>
                </Container>
              </>
            )}
            {editAuthorInfo && (
              <Formik<EditAuthorValues>
                enableReinitialize
                initialValues={{
                  loginName: userInfoState.loginName || "",
                  description: "",
                  file: undefined,
                  photo_public_id: userInfoState.photo_public_id,
                  userId: userId,
                }}
                onSubmit={onEditAuthorSubmit}
                validationSchema={EditAuthorScheme}
                validateOnMount
              >
                {({
                  handleChange,
                  handleSubmit,
                  isValid,
                  values,
                  isSubmitting,
                  setFieldValue,
                }) => (
                  <Form>
                    <ContentWrapper>
                      <label htmlFor="description">Enter description</label>
                      <ContentWrapper>
                        <BorderedField
                          name={EditAuthorFields.description}
                          onChange={handleChange}
                          value={values.description}
                          as="textarea"
                          id="description"
                        />
                      </ContentWrapper>
                      <label htmlFor="image">Enter description</label>
                      <ContentWrapper>
                        <input
                          onChange={e => {
                            setFieldValue(
                              EditAuthorFields.image,
                              e.target.files[0]
                            )
                          }}
                          name={EditAuthorFields.image}
                          type="file"
                          id="image"
                        />
                        {/* {values.image && (
                          <img src={reader.readAsDataURL(values.image)} />
                        )} */}
                      </ContentWrapper>
                    </ContentWrapper>
                    <Button
                      color="primary"
                      variant="contained"
                      disabled={!isValid || isSubmitting}
                      handleClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            )}
          </ContentWrapper>
        </StyledDiv>
      </Container>
    </Wrapper>
  )
}
