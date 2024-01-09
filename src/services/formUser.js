const baseURLCreateUser = 'http://localhost:8080/users/create'
import axios from "axios";
export const newUser = async ({ token, id, username, password, country, role }) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const requestData = {
        id,
        username,
        password, 
        country, 
        role
    };
    console.log(requestData)
    const { data } = await axios.post(
        baseURLCreateUser,
        requestData, 
        config);

    console.log(data)
    return data
}
