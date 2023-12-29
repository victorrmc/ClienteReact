import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react'
import loginService from '../services/login'

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);

    const handleSubmit = async (event) =>{
        event.preventDefault();
    
        try{
        const token = await loginService.login({ username, password })
        console.log(token)

        window.localStorage.setItem('loggedTokenUser', JSON.stringify(token))
        setToken(token)
        setUsername('')
        setPassword('')
        } catch(e){
            console.log(e)
            //Mostrar error
        }
    }
    useEffect(() => {
        const loggedTokenUser = window.localStorage.getItem('loggedTokenUser')
        if(loggedTokenUser){
            setToken(loggedTokenUser)
        }
    }, [])


  return (
    <Card className="max-w-sm">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {token == null && "hola"}
        {token != null && "2hola"}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput value={username}  onChange={(event) => setUsername(event.target.value)} id="email1" type="email" placeholder="name@flowbite.com" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput value={password}  onChange={(event) => setPassword(event.target.value)} id="password1" type="password" required />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
}