import {React, useState} from 'react'
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({email: "", password: ""});

    const handleChange = (e)=>{
        setInputs({...inputs,  [e.target.id]: e.target.value})
    }

    const handleSubmit = async ()=>{
        const response = await fetch("http://localhost:4000/api/user/login", {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs)
        })
        const data = await response.json();
        console.log(data);
        if(data.success){
            toast.success("You are Logged in successfully");
            localStorage.setItem('token', data.token);
            navigate("/");
        }
        else{
            toast.error("Unable to login. Please try again later.")
        }
    }


  return (
    <div>
        <h1>Login</h1>    
        <label htmlFor="email">Email: </label>
        <input onChange = {handleChange} type="text" id='email' placeholder='email' />
        <br />
        <br />
        <label htmlFor="password">Password: </label>
        <input onChange = {handleChange} type="password" id='password' placeholder='Password' />
        <br />
        <br />
        <button onClick={handleSubmit}>Submit</button>

    
    </div>
  )
}

export default Login