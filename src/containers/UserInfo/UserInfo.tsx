import { TextField } from "@material-ui/core"
import { Form, Formik } from "formik"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import * as Yup from "yup"

import { AuthorInfo } from "../../components/AuthorInfo/AuthorInfo"
import { Button } from "../../components/Button/Button"
import { Languages } from "../../enums/languages/languages"
import { useStyles } from "../../Functions/Hooks/useStyles"
import { setShowUserInfo } from "../../state/actions/actions"
import {
  editPasswordAction,
  setAuthorInfoAction,
} from "../../state/actions/apiData.actions"
import { selectUserInfoShow } from "../../state/selectors/appData.selector"
import { selectUserInfo } from "../../state/selectors/userData.selector"
import { getTranslations } from "../../utils/utils"

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
`
const CenteredDiv = styled.div`
  display: flex;
  align-items: center;
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

export const UserInfo: React.FC<Props> = ({ language }) => {
  const dispatch = useDispatch()
  const show = useSelector(selectUserInfoShow)
  const userInfoState = useSelector(selectUserInfo)
  const [editPassword, setEditPassword] = useState<boolean>(false)
  const classes = useStyles()
  const editAuthorInfo = useState<boolean>(false)
  const isAuthor = userInfoState.canUpload

  const onSubmit = (values: EditPasswordFormValues) => {
    dispatch(setShowUserInfo(false))
    dispatch(editPasswordAction(values))
  }
  const handleChildClick = e => {
    e.stopPropagation()
  }
  const EditPasswordScheme = () =>
    Yup.object().shape({
      [EditPasswordFields.oldPassword]: Yup.string().required(
        "Please enter current password"
      ),
      [EditPasswordFields.newPassword]: Yup.string().required(
        "Please enter new password"
      ),
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
                onSubmit={onSubmit}
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
            {isAuthor && editAuthorInfo ? (
              <>Edit screen</>
            ) : (
              <>
                <AuthorInfo />
                <Container>
                  <Button
                    color="primary"
                    variant="contained"
                    handleClick={() => setAuthorInfoAction(false)}
                  >
                    EDIT INFO
                  </Button>
                </Container>
              </>
            )}
          </ContentWrapper>
        </StyledDiv>
      </Container>
    </Wrapper>
  )
}
