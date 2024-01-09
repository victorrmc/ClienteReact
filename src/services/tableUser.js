import axios from "axios";

const baseURL = 'http://localhost:8080/users/get'
const deleteUserURL = 'http://localhost:8080/users/delete/'

export const tableServiceUser = async ( { token }) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const { data } = await axios.get(baseURL, config)
    return data
}

export const deleteUser = async ({ token, ID }) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    console.log(token, ID)
    

    const { data } = await axios.delete(deleteUserURL + ID, config);
    console.log(data)
    return data
}
