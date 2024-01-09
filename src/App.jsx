import { useState } from 'react'
import './App.css'
import {Login} from  './components/login';
import { TableProduct } from  './components/TableProduct';
import { useEffect } from 'react';
import { Button } from 'flowbite-react';

function App() {
  const [appToken, setAppToken] = useState(null);
  const [role, setRole] = useState(null);

  // Función para recibir el token desde el componente hijo
  const handleTokenChange = (loggedTokenUser, roleUser) => {
    setRole(roleUser)
    setAppToken(loggedTokenUser);
  };

  const handleLogout= async (event) => {
    window.localStorage.removeItem('loggedTokenUser');
    window.localStorage.removeItem('loggedRoleUser');
    setAppToken(null);
    setRole(null);
  };

  useEffect(() => {
    const loggedTokenUser = window.localStorage.getItem('loggedTokenUser')
    const loggedRoleUser = window.localStorage.getItem('loggedRoleUser')
    if(loggedTokenUser){
      const token = JSON.parse(loggedTokenUser)
      const role = JSON.parse(loggedRoleUser)
      setAppToken(token)
      setRole(role);
    }
}, [])

  return (
    <>
     {appToken && (
        <Button color="gray" onClick={handleLogout} className='mb-2'>
          Log Out
        </Button>
      )}
      { 
      appToken ?  <TableProduct token={ appToken } role={ role } />
        : <Login onTokenChange={ handleTokenChange } />
      }
    </>
  )
}

export default App
