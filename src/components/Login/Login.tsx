import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import * as Yup from 'yup';

import { Languages } from '../../enums/languages/languages';
import { loginUserAction, setResetPasswordShow, setShowLoginRegisterForm } from '../../state/actions/actions';
import { Button } from '../Button/Button';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
`

const ButtonBox = styled.div`
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  display: flex;
  justify-content: space-around;
  width: 100%;
`

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`

const StyledP = styled.p`
  color: #3f51b5;
  &:hover {
    color: darkblue;
  }
`
export enum LoginFormFields {
  username = "username",
  password = "password",
}

export interface LoginFormFieldValues {
  [LoginFormFields.username]?: string
  [LoginFormFields.password]?: string
}

type MyProps = {
  translation: any
  language: Languages
  handleViewChange: (e) => void
}
const Login = (props: MyProps) => {
  const dispatch = useDispatch()

  const onSubmit = (values: LoginFormFieldValues) => {
    dispatch(
      loginUserAction({
        username: values.username,
        password: values.password,
      })
    )
  }

  const LoginScheme = () =>
    Yup.object().shape({
      [LoginFormFields.username]: Yup.string().required(
        "Please enter username"
      ),
      [LoginFormFields.password]: Yup.string().required(
        "Please enter password"
      ),
    })

  const handlePasswordResetClick = () => {
    dispatch(setResetPasswordShow(true))
    dispatch(setShowLoginRegisterForm(false))
  }
  return (
    <Formik<LoginFormFieldValues>
      enableReinitialize
      initialValues={{
        username: "",
        password: "",
      }}
      onSubmit={onSubmit}
      validationSchema={LoginScheme}
      validateOnMount
    >
      {({ handleChange, handleSubmit, isValid, values, isSubmitting }) => (
        <>
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={values.username}
                name={LoginFormFields.username}
                type="text"
                placeholder="Username"
                onChange={handleChange}
              ></input>
            </div>
            <div className="mb-6">
              <div className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </div>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                value={values.password}
                name={LoginFormFields.password}
                type="password"
                placeholder="******************"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <CenteredDiv onClick={handlePasswordResetClick}>
            <StyledP>Reset password</StyledP>
          </CenteredDiv>
          <ButtonWrapper>
            <ButtonBox>
              <Button
                handleClick={props.handleViewChange}
                label={"toRegister"}
                language={props.language}
                variant="contained"
                color="primary"
              />
              <Button
                handleClick={handleSubmit}
                label={"login"}
                language={props.language}
                variant="contained"
                color="primary"
                disabled={!isValid || isSubmitting}
              />
            </ButtonBox>
          </ButtonWrapper>
        </>
      )}
    </Formik>
  )
}

export default Login
