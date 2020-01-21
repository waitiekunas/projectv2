import React from 'react'
type MyProps = {
    registerInfo: {
        id: string
        loginName: string
        password: string
        name: string
        surname: string
        registerDate: string
        lastLoginDate: string
    }
    handleChange: Function
    emptyField: boolean
}
const Register = (props: MyProps) => {
    const handleName = (e) => {
        e.preventDefault()
        let r = props.registerInfo
        r.name = e.target.value
        props.handleChange('registerInfo', r)
    }
    const handleSurname = (e) => {
        e.preventDefault()
        let r = props.registerInfo
        r.surname = e.target.value
        props.handleChange('registerInfo', r)
    }
    const handleUsername = (e) => {
        e.preventDefault()
        let r = props.registerInfo
        r.loginName = e.target.value
        props.handleChange('registerInfo', r)
    }
    const handlePassword = (e) => {
        e.preventDefault()
        let r = props.registerInfo
        r.password = e.target.value
        props.handleChange('registerInfo', r)
    }
    return (
        <div>
            {
                props.emptyField ?
                    <p className="text-red-500 text-xs italic">All fields must have value</p>
                    : null
            }
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={props.registerInfo.name} id="name" type="text" placeholder="Name" onChange={handleName}>
                </input>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Surname</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={props.registerInfo.surname} id="surname" type="text" placeholder="Surname" onChange={handleSurname}>
                </input>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Username</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={props.registerInfo.loginName} id="username" type="text" placeholder="Username" onChange={handleUsername}>
                </input>
            </div>
            <div className="mb-6">
                <div className="block text-gray-700 text-sm font-bold mb-2">
                    Password</div>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" value={props.registerInfo.password} id="password" type="password" placeholder="******************" onChange={handlePassword}></input>
            </div>
        </div>
    )
}

export default Register