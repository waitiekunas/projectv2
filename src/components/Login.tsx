import React from 'react'

type MyProps = {
    handleChange: Function
    username: string
    password: string
}
const Login = (props: MyProps) => {

    const handleLogin = (e) => {
        e.preventDefault()
        props.handleChange('loginName', e.target.value)
    }
    const handlePassword = (e) => {
        e.preventDefault()
        props.handleChange('password', e.target.value)
    }
    return (
        <div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Username</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={props.username} id="username" type="text" placeholder="Username" onChange={handleLogin}>
                </input>
            </div>
            <div className="mb-6">
                <div className="block text-gray-700 text-sm font-bold mb-2">
                    Password</div>
                <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" value={props.password} id="password" type="password" placeholder="******************" onChange={handlePassword}></input>
                <p id="empty-password-info" className="text-red-500 text-xs italic">Please choose a password.</p>
            </div>
        </div>
    )
}

export default Login