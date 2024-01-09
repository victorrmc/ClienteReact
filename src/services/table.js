import axios from "axios";

const baseURL = 'http://localhost:8080/products/get'
const baseURLDesactiveProduct = 'http://localhost:8080/products/desactivate/'
const baseURLDeleteProduct = 'http://localhost:8080/products/delete/'


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

    const { data } = await axios.put(baseURLDesactiveProduct + ID, reason, config);
    return data;
}

export const deleteproduct = async ({ token, ID }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    const { data } = await axios.delete(baseURLDeleteProduct + ID, config);
    return data;
}