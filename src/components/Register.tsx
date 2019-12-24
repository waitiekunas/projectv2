import React from 'react'

const Register = (props) => {
    const handleName = (e) => {
        e.preventDefault()
        props.handleChange('name', e.target.value)
    }
    const handleSurname = (e) => {
        e.preventDefault()
        props.handleChange('surname', e.target.value)
    }
    const handleUsername = (e) => {
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
                    Name</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" onChange={handleName}>
                </input>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Surname</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="surname" type="text" placeholder="Surname" onChange={handleSurname}>
                </input>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Username</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={handleUsername}>
                </input>
            </div>
            <div className="mb-6">
                <div className="block text-gray-700 text-sm font-bold mb-2">
                    Password</div>
                <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={handlePassword}></input>
                <p className="text-red-500 text-xs italic">Please choose a password.</p>
            </div>
        </div>
    )
}

export default Register