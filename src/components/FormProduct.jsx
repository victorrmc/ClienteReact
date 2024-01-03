import React, { useState, useEffect } from 'react';
import { Label, TextInput, Select, Datepicker, Button } from 'flowbite-react';
import { getSuppliers, getPriceReductions, getProductID, getUsers, newProduct, editProduct } from '../services/formProduct';  // Importación correcta

export function FormProduct({ token, setisNewProduct, editingProductId = null, isNewProduct }) {
    const [suppliers, setSuppliers] = useState([]);
    const [priceReductions, setPriceReductions] = useState([]);
    const [user, setUser] = useState([]);
    const [selectedSuppliers, setSelectedSuppliers] = useState([]);
    const [selectedPriceReduction, setSelectedPriceReduction] = useState('');
    const [selectedUser, setSelectedUser] = useState([]);
    const [formError, setFormError] = useState('');
    const [productData, setProductData] = useState({
        productId: '',
        description: '',
        price: '',
        state: '',
        creationDate: '', // Update this if you have the creationDate data
        user: '', // Update this if you have the user data
    });


    const handleSubmit = (event) => {
        event.preventDefault();
        const { productId, description, price } = Object.fromEntries(new window.FormData(event.target))

        if (productId === "") {
            setFormError('Please enter a ID.');
            return;
        }
        if (description === "") {
            setFormError('Please enter a Description.');
            return;
        }
        if (selectedSuppliers.length === 0) {
            setFormError('Please select at least one supplier.');
            return;
        }
        if (!selectedPriceReduction) {
            setFormError('Please select a price reduction.');
            return;
        }

        let response;
        console.log(productId)
        console.log(productData.productId)
        //console.log(productData.creationDate,  productData.state);
        //console.log(selectedUser)
        editingProductId
            ? (response = editProduct({ token, productId: productData.productId, description, price, state: productData.state, selectedSuppliers, selectedPriceReduction, creationDate: productData.creationDate, userid: selectedUser }))
            : (response = newProduct({ token, productId, description, price, selectedSuppliers, selectedPriceReduction }));

        console.log(response)
        setisNewProduct(false)
        setFormError('');
    };

    useEffect(() => {
        async function fetchFormProduct() {
            if (token) {
                try {
                    let productData = {};
                    if (editingProductId !== null) {
                        productData = await getProductID({ token, ID: editingProductId })
                        const userData = await getUsers({ token })
                        setProductData(productData);
                        setUser(userData);
                    }

                    const suppliersData = await getSuppliers({ token });
                    setSuppliers(suppliersData);
                    const priceReductionsData = await getPriceReductions({ token });
                    setPriceReductions(priceReductionsData);
                } catch (e) {
                    console.log(e);
                }
            }
        }

        fetchFormProduct();
    }, [token]);

    const handleSupplierChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedSuppliers(selectedOptions);
    };

    const handlePriceReductionChange = (e) => {
        const selectedPriceReduction = e.target.value;
        setSelectedPriceReduction(selectedPriceReduction);
    };

    const handleUserChange = (e) => {
        console.log("aaaaaaaa")
        const selectedUser = e.target.value;
        setSelectedUser(selectedUser);
    };
    const handleDate = (e) => {
        console.log("aaaaaaaa")
        setProductData({ ...productData, creationDate: e.target.value })
    };

    return (
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="productId" value="Product ID" required />
                </div>
                {editingProductId ? <TextInput name='productId' id="productId" type="number" sizing="md" disabled value={productData.productId} /> :
                    <TextInput name='productId' id="productId" type="number" sizing="md" value={productData.productId} onChange={(e) => setProductData({ ...productData, productId: e.target.value })} />}
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="description" value="Description" required />
                </div>
                <TextInput name='description' id="description" type="text" sizing="md" value={productData.description} onChange={(e) => setProductData({ ...productData, description: e.target.value })} />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="price" value="Price" />
                </div>
                <TextInput name='price' id="price" type="number" sizing="md" value={productData.price} onChange={(e) => setProductData({ ...productData, price: e.target.value })} />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="state" value="State" />
                </div>
                {editingProductId ? <Select id="state"  onChange={(e) => setProductData({ ...productData, state: e.target.value })} value={productData.state}>
                    <option>ACTIVE</option>
                    <option>DISCONTINUED</option>
                </Select> : <Select id="state" disabled readOnly >
                    <option>ACTIVE</option>
                    <option>DISCONTINUED</option>
                </Select>}
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="suppliers" value="Select Suppliers" />
                </div>
                <Select
                    id="suppliers"
                    multiple
                    value={selectedSuppliers}
                    onChange={handleSupplierChange}
                >
                    <option value="null">None</option>
                    {suppliers.map((supplier, index) => (
                        <option key={index} value={`${supplier.supplierId}`}>
                            {`Supplier ID: ${supplier.supplierId}, Name: ${supplier.name}, Country: ${supplier.country}`}
                        </option>
                    ))}
                </Select>
            </div>
            <div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="PriceReduction" value="Select Price Reduction" />
                    </div>
                    <Select
                        id="PriceReduction"
                        required
                        value={selectedPriceReduction}
                        onChange={handlePriceReductionChange}
                    >
                        <option value="">Select an option</option>
                        <option value="null">None</option>
                        {priceReductions.map((priceReduction, index) => (
                            <option key={index} value={`${priceReduction.priceReductionId}`}>
                                {`PriceReduction ${index + 1}: ID ${priceReduction.priceReductionId}, Reduced Price ${priceReduction.reducedPrice}`}
                            </option>
                        ))}
                    </Select>
                </div>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="creationDate" value="Creation Date" />
                </div>
                {editingProductId ? 
                <Datepicker  weekStart={1} // Monday 
                value={productData.creationDate}  onChange={handleDate} /> 
                :
                <Datepicker disabled />
                    }
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="user" value="User" />
                </div>
                {editingProductId ?
                    <Select id="state"
                        required
                        value={selectedUser}
                        onChange={handleUserChange} >
                        <option value="">Select an option</option>
                        {user.map((user) => (
                            <option key={`${user.id}`} value={`${user.id}`}>
                                {`User: ID ${user.id}, UserName ${user.username}`}
                            </option>
                        ))}
                    </Select> :
                    <Select id="state" disabled readOnly>
                    </Select>}
            </div>
            {formError && <p className="text-red-500">{formError}</p>}

            {editingProductId ? <Button type="submit" className='w-full'>
                Edit Product
            </Button> :
                <Button type="submit" className='w-full'>
                    New Product
                </Button>}
        </form>
    );
}