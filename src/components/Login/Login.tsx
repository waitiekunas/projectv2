import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Languages } from '../../enums/languages/languages';
import Button from '../Button/Button';

type MyProps = {
  login: (login: any) => void
  translation: any
  language: Languages
  handleViewChange: (e) => void
}
const Login = (props: MyProps) => {
  const [login, setLogin] = useState(false)
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  // http://localhost:5000/user/login
  // https://training-app-finance.herokuapp.com/user/login
  useEffect(() => {
    if (userName && password) {
      axios({
        method: "post",
        url: "https://training-app-finance.herokuapp.com/user/login",
        data: {
          username: userName,
          password: password,
        },
      }).then(res => {
        props.login(res.data)
      })
    }
  }, [login])

  const buttonClassName =
    "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
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
      <div className="flex items-center justify-center">
        <div className=" flex justify-around w-full py-5">
          <Button
            handleClick={e => setLogin(!login)}
            classButtonDiv="login-register-button flex-col"
            classButton={buttonClassName}
            buttonTexts={props.translation}
            label={"login"}
            language={props.language}
          />
          <Button
            handleClick={props.handleViewChange}
            classButtonDiv="login-register-button flex-col"
            classButton={buttonClassName}
            buttonTexts={props.translation}
            label={"toRegister"}
            language={props.language}
          />
        </div>
      </div>
    </>
  )
}

export default Login
