import React, { useState, useEffect } from 'react';
import { Label, TextInput, Select, Datepicker, Button, List } from 'flowbite-react';
import { newUser } from '../services/formUser';
export function FormUser({ token, handleRefreshTable, setIsNewUser }) {
    const [formError, setFormError] = useState('');
    const [userData, setUserData] = useState({
        userID: '',
        userName: '',
        password: '',
        role: '',
        country: '',
    });
    const handleSubmit = (event) => {
        event.preventDefault();

        if (userData.userID === "") {
            setFormError('Please enter a ID.');
            return;
        }
        if (userData.userName === "") {
            setFormError('Please enter a User Name.');
            return;
        }
        if (userData.password === "") {
            setFormError('Please enter a Password.');
            return;
        }
        if (userData.role.length === 0) {
            setFormError('Please select at least one role.');
            return;
        }
        let response = newUser({ token, id: userData.userID, username: userData.userName, password: userData.password, country: userData.country, role: userData.role });
        console.log(userData)

        setIsNewUser(false)
        handleRefreshTable()
        setFormError('');
    };
    return (
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="userID" value="User ID" required />
                </div>
                <TextInput name='userID' id="userID" type="number" sizing="md" value={userData.userID} onChange={(e) => setUserData({ ...userData, userID: e.target.value })} />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="userName" value="User Name" required />
                </div>
                <TextInput name='userName' id="userName" type="email" sizing="md" value={userData.userName} onChange={(e) => setUserData({ ...userData, userName: e.target.value })} />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password" value="Password" required />
                </div>
                <TextInput name='password' id="password" type="password" sizing="md" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="country" value="Country" />
                </div>
                <TextInput name='country' id="country" type="text" sizing="md" value={userData.country} onChange={(e) => setUserData({ ...userData, country: e.target.value })} />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="role" value="State" />
                </div>
                 <Select id="role" value={userData.role} onChange={(e) => setUserData({ ...userData, role: e.target.value })} >
                    <option value="">Select an option</option>
                    <option>USER</option>
                    <option>ADMIN</option>
                </Select> 
            </div>
            {formError && <p className="text-red-500">{formError}</p>}
            <Button type="submit" className='w-full'>New User</Button>
        </form>
    );
}