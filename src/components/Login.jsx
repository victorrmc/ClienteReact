import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react'
import loginService from '../services/login'

export function Login({ onTokenChange }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);

    const handleSubmit = async (event) =>{
        event.preventDefault();
    
        try{
        const token = await loginService.login({ username, password })

        window.localStorage.setItem('loggedTokenUser', JSON.stringify(token))
        setToken(token)
        setUsername('')
        setPassword('')

        onTokenChange(token);
        } catch(e){
            console.log(e)
        }
    }
    


  return (
    <Card className="max-w-sm">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {token == null && "Login"}
        {token != null && "The email and the password don't match"}
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
