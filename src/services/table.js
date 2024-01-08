import axios from "axios";

const baseURL = 'http://localhost:8080/products/get'
const baseURLDesactiveProduct = 'http://localhost:8080/products/desactivate/'


export const tableService = async ( { token }) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const { data } = await axios.get(baseURL, config)
    return data
}

export const desactiveProduct = async ({ token, ID, reason }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

   // const requestData = "Es una prueba";


    const { data } = await axios.put(baseURLDesactiveProduct + ID, reason, config);
    return data;
}

//delete hacer
export const deleteroduct = async ({ token, ID, reason }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

   // const requestData = "Es una prueba";


    const { data } = await axios.put(baseURLDesactiveProduct + ID, reason, config);
    return data;
}