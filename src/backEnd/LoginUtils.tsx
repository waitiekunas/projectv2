import mockData from '../mockData/users/users.json'


export const loginUser = ({ username, password }) => {
    return backEndLogin(username, password)
}

const backEndLogin = (username: string, password: string): boolean => {
    return mockData.filter(user =>
        user.loginName === username && user.password === password
    ).length > 0;

}
