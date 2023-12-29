import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Login} from  './components/login';
import { TableProduct } from  './components/Table';
import { useEffect } from 'react';

function App() {
  const [appToken, setAppToken] = useState(null);

  // Función para recibir el token desde el componente hijo
  const handleTokenChange = (token) => {
    setAppToken(token);
  };
  useEffect(() => {
    const loggedTokenUser = window.localStorage.getItem('loggedTokenUser')
    if(loggedTokenUser){
      setAppToken(loggedTokenUser)
    }
}, [])

  return (
    <>
      { 
      appToken ? <TableProduct/>
        : <Login onTokenChange={handleTokenChange} />
      }
    </>
  )
}

export default App
