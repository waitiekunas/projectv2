import { Formik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import * as Yup from 'yup';

import { Languages } from '../../enums/languages/languages';
import { registerUserAction } from '../../state/actions/apiData.actions';
import { setRegisterStatus } from '../../state/actions/userData.actions';
import { Button } from '../Button/Button';

const StyledP = styled.p`
  font-style: italic;
  font-size: 0.75rem;
  color: #f56565;
`
const MarginB1 = styled.div`
  margin-bottom: 1rem;
`

const StyledLabel = styled.label`
  display: block;
  color: #4a5568;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`
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
export enum RegisterFormFields {
  username = "username",
  password = "password",
  email = "email",
}

export interface RegisterFormFieldValues {
  [RegisterFormFields.username]?: string
  [RegisterFormFields.password]?: string
  [RegisterFormFields.email]?: string
}

type MyProps = {
  register: (register: any) => void
  translation: any
  language: Languages
  handleViewChange: (e) => void
}

const Register = (props: MyProps) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setRegisterStatus(false))
  }, [])

  const onSubmit = (values: RegisterFormFieldValues) => {
    dispatch(
      registerUserAction({
        userData: {
          id: "",
          loginName: values.username,
          password: values.password,
          registerDate: "",
          lastLoginDate: "",
          email: values.email,
        },
      })
    )
  }

  const RegisterScheme = () =>
    Yup.object().shape({
      [RegisterFormFields.username]: Yup.string().required(
        "Please enter valid name"
      ),
      [RegisterFormFields.password]: Yup.string().required(
        "Please enter password"
      ),
      [RegisterFormFields.email]: Yup.string()
        .email("Please enter a valid email")
        .required("Please enter email"),
    })

  return (
    <Formik<RegisterFormFieldValues>
      enableReinitialize
      initialValues={{
        username: "",
        password: "",
        email: "",
      }}
      onSubmit={onSubmit}
      validationSchema={RegisterScheme}
      validateOnMount
    >
      {({ handleChange, values, isValid, handleSubmit, isSubmitting }) => (
        <>
          <div>
            <MarginB1>
              <StyledLabel>Username</StyledLabel>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={values.username}
                name={RegisterFormFields.username}
                type="text"
                placeholder="Username"
                onChange={handleChange}
              ></input>
            </MarginB1>
            <MarginB1>
              <StyledLabel>Password</StyledLabel>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={values.password}
                name={RegisterFormFields.password}
                type="password"
                placeholder="******************"
                onChange={handleChange}
              ></input>
            </MarginB1>
            <MarginB1>
              <StyledLabel>Email address</StyledLabel>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={values.email}
                name={RegisterFormFields.email}
                type="email"
                placeholder="Email address"
                onChange={handleChange}
              ></input>
            </MarginB1>
          </div>
          <ButtonWrapper>
            <ButtonBox>
              <Button
                handleClick={handleSubmit}
                label={"register"}
                language={props.language}
                disabled={!isValid || isSubmitting}
                variant="contained"
                color="primary"
              />
              <Button
                handleClick={props.handleViewChange}
                label={"toLogin"}
                language={props.language}
                variant="contained"
                color="primary"
              />
            </ButtonBox>
          </ButtonWrapper>
        </>
      )}
    </Formik>
  )
}

export default Register
