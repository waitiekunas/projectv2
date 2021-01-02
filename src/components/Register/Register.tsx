import { Formik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { ResponseStatus } from '../../containers/ResponseStatus/ResponseStatus';
import { Languages } from '../../enums/languages/languages';
import { registerUserAction } from '../../state/actions/apiData.actions';
import { setRegisterStatus } from '../../state/actions/userData.actions';
import { selectRegisterStatus } from '../../state/selectors/userData.selector';
import { getTranslations } from '../../utils/utils';
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
  display:block;
  color: #4a5568;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`
const ButtonWrapper = styled.div`
  display:flex;
  justify-content:center;
  align-self:center;
`

const ButtonBox = styled.div`
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  display:flex;
  justify-content: space-around;
  width:100%;
`
export enum RegisterFormFields {
  username='username',
  password = 'password',
  email='email',
}

export interface RegisterFormFieldValues{
  [RegisterFormFields.username]?: string;
  [RegisterFormFields.password]?:string;
  [RegisterFormFields.email]?:string;

}

type MyProps = {
  register: (register: any) => void
  translation: any
  language: Languages
  handleViewChange: (e) => void
}

const Register = (props: MyProps) => {
  const dispatch = useDispatch()
  const [loginName, setLoginName] = useState("")
  const [password, setPassword] = useState("")
  const [startRegister, setStartRegister] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const showResponseStatus = useSelector(selectRegisterStatus)
  const [email, setEmail] = useState("")
  useEffect(() => {
    if (!disabled) {
      dispatch(registerUserAction({
        userData: {
          id: "",
          loginName: loginName,
          password: password,
          registerDate: "",
          lastLoginDate: "",
          email: email,
        }
      }))
    }
  }, [startRegister])
  useEffect(() => {
    dispatch(setRegisterStatus(false))
    isDisabled()
  },[])
  const isDisabled = () => {
    setDisabled(!password || !loginName || !email)
  }

 

  return (
    <Formik<RegisterFormFieldValues>
      enable
      >
    <>
      <div>
        <MarginB1>
          <StyledLabel>
            Username
          </StyledLabel>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={loginName}
            id="username"
            type="text"
            placeholder="Username"
            onChange={e => setLoginName(e.target.value)}
          ></input>
        </MarginB1>
        <MarginB1>
          <StyledLabel>
            Password
          </StyledLabel>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            id="password"
            type="password"
            placeholder="******************"
            onChange={e => setPassword(e.target.value)}
          ></input>
        </MarginB1>
        <MarginB1>
          <StyledLabel>
            Email address
          </StyledLabel>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            id="email"
            type="email"
            placeholder="Email address"
            onChange={e => setEmail(e.target.value)}
          ></input>
        </MarginB1>
      </div>
      <ButtonWrapper>
        <ButtonBox>
          <Button
            handleClick={() => setStartRegister(!startRegister)}
            label={"register"}
            language={props.language}
            disabled={disabled}
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
      {showResponseStatus && (
        <ResponseStatus
          language={props.language}
          handleClick={()=>props.register(showResponseStatus)}
          text={getTranslations(
            props.language,
            showResponseStatus ? "registerSuccess" : "registerFailed"
          )}
        />
      )}
    </>
    </Formik>)
}

export default Register
