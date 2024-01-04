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

export const desactiveProduct = async ({ token, ID }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    const requestData = "Es una prueba";

    console.log(baseURLDesactiveProduct + ID);
    console.log(token);

    const { data } = await axios.put(baseURLDesactiveProduct + ID, requestData, config);
    return data;
}

