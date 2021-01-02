import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Languages } from '../../enums/languages/languages';
import { loginUserAction } from '../../state/actions/actions';
import { Button } from '../Button/Button';

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

type MyProps = {
  translation: any
  language: Languages
  handleViewChange: (e) => void
}
const Login = (props: MyProps) => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false)
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  useEffect(() => {
    if (userName && password) {
      dispatch(loginUserAction({
        username: userName,
        password: password,
      }))
      
    }
  }, [login])

  return (
    <>
      <div>
        {!userName && !password ? (
          <p id="empty-password-info" className="text-red-500 text-xs italic">
            Some fields are empty.
          </p>
        ) : null}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={userName}
            id="username"
            type="text"
            placeholder="Username"
            onChange={e => setUserName(e.target.value)}
          ></input>
        </div>
        <div className="mb-6">
          <div className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </div>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            value={password}
            id="password"
            type="password"
            placeholder="******************"
            onChange={e => setPassword(e.target.value)}
          ></input>
        </div>
      </div>
      <ButtonWrapper>
        <ButtonBox>
          <Button
            handleClick={() => setLogin(!login)}
            label={"login"}
            language={props.language}
            variant="contained"
            color="primary"
          />
          <Button
            handleClick={props.handleViewChange}
            label={"toRegister"}
            language={props.language}
            variant="contained"
            color="primary"
          />
        </ButtonBox>
      </ButtonWrapper>
    </>
  )
}

export default Login
