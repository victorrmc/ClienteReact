import axios from "axios";

const baseURL = 'http://localhost:8080/products/get'


const table = async ( { token }) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const { data } = await axios.get(baseURL, config)
    return data
}

export default { table }