import { TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import * as Yup from 'yup';

import { Button } from '../../components/Button/Button';
import { setResetPasswordShow } from '../../state/actions/actions';
import { resetPasswordAction } from '../../state/actions/apiData.actions';

const Wrapper = styled.div`
  justify-content: center;
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 120%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;
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
const ContentWrapper = styled.div`
  margin: 0.5rem;
  display: flex;
  justify-content: center;
  width: 100%;
`
export enum ResetPasswordFields {
  EMAIL = "email",
}
export type ResetPasswordValues = {
  [ResetPasswordFields.EMAIL]: string
}
export const ResetPassword: React.FC = () => {
  const dispatch = useDispatch()
  const handleParentClick = e => {
    e.preventDefault()
    dispatch(setResetPasswordShow(false))
  }
  const handleChildClick = e => {
    e.stopPropagation()
  }

  const ResetPasswordScheme = () =>
    Yup.object().shape({
      [ResetPasswordFields.EMAIL]: Yup.string()
        .email()
        .required(),
    })

  const handleResetPasswordSubmitSubmit = (values: ResetPasswordValues) => {
    dispatch(resetPasswordAction(values))
    dispatch(setResetPasswordShow(false))
  }
  return (
    <Wrapper onClick={handleParentClick}>
      <Container>
        <StyledDiv onClick={handleChildClick}>
          <Formik<ResetPasswordValues>
            enableReinitialize
            initialValues={{
              email: "",
            }}
            onSubmit={handleResetPasswordSubmitSubmit}
            validationSchema={ResetPasswordScheme}
            validateOnMount
          >
            {({
              values,
              handleChange,
              isSubmitting,
              isValid,
              handleSubmit,
            }) => (
              <Form>
                <ContentWrapper>
                  <TextField
                    id="standard-basic"
                    label="Email"
                    name={ResetPasswordFields.EMAIL}
                    onChange={handleChange}
                    value={values.email}
                  />
                </ContentWrapper>
                <ContentWrapper>
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={!isValid || isSubmitting}
                    handleClick={handleSubmit}
                    label="Submit"
                  />
                </ContentWrapper>
              </Form>
            )}
          </Formik>
        </StyledDiv>
      </Container>
    </Wrapper>
  )
}
