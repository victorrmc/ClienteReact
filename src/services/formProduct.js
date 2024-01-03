// formProduct.js

import axios from "axios";

const baseURLSuppliers = 'http://localhost:8080/suppliers/get'
const baseURLPriceReductions = 'http://localhost:8080/priceReductions/get'
const baseURLUsers = 'http://localhost:8080/users/get'
const baseURLFindProduct = 'http://localhost:8080/products/find/'
const baseURLCreateProduct = 'http://localhost:8080/products/create'
const baseURLEditProduct = 'http://localhost:8080/products/edit'


export const getSuppliers = async ({ token }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const { data } = await axios.get(baseURLSuppliers, config)
    return data
}

export const getPriceReductions = async ({ token }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const { data } = await axios.get(baseURLPriceReductions, config)
    return data
}

export const getProductID = async ({ token, ID }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const { data } = await axios.get(baseURLFindProduct + ID, config)
    return data
}

export const getUsers = async ({ token }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const { data } = await axios.get(baseURLUsers, config)
    return data
}



export const newProduct = async ({ token, productId, description, price, selectedSuppliers, selectedPriceReduction }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };


    const requestData = {
        productId,
        description,
        price,
    };

    if (!selectedSuppliers.includes('null')) {
        requestData.supplierList = selectedSuppliers.map(supplierId => ({ supplierId }));
    }

    if (selectedPriceReduction !== 'null') {
        requestData.priceReduction = {
            priceReductionId: selectedPriceReduction
        };
    }

    try {
        const response = await axios.post(
            baseURLCreateProduct,
            requestData,
            config
        );

        return response.data;
    } catch (error) {
        console.error('Error al crear un nuevo producto:', error);
        throw error;
    }
};


export const editProduct = async ({ token, productId, description, price, state, selectedSuppliers, selectedPriceReduction, creationDate, userid }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };


    const requestData = {
        productId,
        description,
        price,
        state,
        creationDate,
    };
    requestData.user = {
        id: userid
    };

    if (!selectedSuppliers.includes('null')) {
        requestData.supplierList = selectedSuppliers.map(supplierId => ({ supplierId }));
    }

    if (selectedPriceReduction !== 'null') {
        requestData.priceReduction = {
            priceReductionId: selectedPriceReduction
        };
    }
    console.log(baseURLEditProduct);
    console.log(requestData);
    console.log(config);
    try {
        const response = await axios.put(
            baseURLEditProduct,
            requestData,
            config
        );

        return response.data;
    } catch (error) {
        console.error('Error al editar producto:', error);
        throw error;
    }
};


