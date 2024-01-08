import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Login} from  './components/login';
import { TableProduct } from  './components/Table';
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
    setAppToken(null);
  };

  useEffect(() => {
    const loggedTokenUser = window.localStorage.getItem('loggedTokenUser')
    console.log(loggedTokenUser)
    if(loggedTokenUser){
      const token = JSON.parse(loggedTokenUser)
      setAppToken(token)
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
