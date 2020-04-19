import React, { useState, useEffect } from "react"
import axios from "axios"
import Button from "../Button/Button"
import { Languages } from "../../enums/languages/languages"

type MyProps = {
  register: (register: any) => void
  translation: any
  language: Languages
  handleViewChange: (e) => void
}
const Register = (props: MyProps) => {
  const [loginName, setLoginName] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [startRegister, setStartRegister] = useState(false)
  const [disabled, setDisabled] = useState(true)
  useEffect(() => {
    if (!disabled) {
      axios({
        method: "post",
        url: "http://localhost:3000/user/register",
        data: {
          userData: formulateUser(),
        },
      }).then(res => props.register(res.data))
    }
  }, [startRegister])
  useEffect(() => {
    isDisabled()
  })

  const formulateUser = () => ({
    id: "",
    loginName: loginName,
    password: password,
    name: name,
    surname: surname,
    registerDate: "",
    lastLoginDate: "",
  })
  const isDisabled = () => {
    setDisabled(!name || !surname || !password || !loginName)
  }
  const buttonClassName =
    "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
  return (
    <>
      <div>
        {disabled ? (
          <p className="text-red-500 text-xs italic">
            All fields must have value
          </p>
        ) : null}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={name}
            id="name"
            type="text"
            placeholder="Name"
            onChange={e => setName(e.target.value)}
          ></input>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Surname
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={surname}
            id="surname"
            type="text"
            placeholder="Surname"
            onChange={e => setSurname(e.target.value)}
          ></input>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={loginName}
            id="username"
            type="text"
            placeholder="Username"
            onChange={e => setLoginName(e.target.value)}
          ></input>
        </div>
        <div className="mb-6">
          <div className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </div>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
            handleClick={e => setStartRegister(!startRegister)}
            classButtonDiv="login-register-button flex-col"
            classButton={buttonClassName}
            buttonTexts={props.translation}
            label={"register"}
            language={props.language}
            disabled={disabled}
          />
          <Button
            handleClick={props.handleViewChange}
            classButtonDiv="login-register-button flex-col"
            classButton={buttonClassName}
            buttonTexts={props.translation}
            label={"toLogin"}
            language={props.language}
          />
        </div>
      </div>
    </>
  )
}

export default Register
