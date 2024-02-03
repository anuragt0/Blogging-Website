import React, { useState } from 'react'
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

require("../css/register.css")

const Register = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ name: '', email: '', password: '' });

    const handleChange = (e)=>{
        setInputs({...inputs, [e.target.id]: e.target.value});
    }

    const handleRegister = async ()=>{
        const response = await fetch("http://localhost:4000/api/user/register", {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs)
        })
        const data = await response.json();
        if(data.success){
            toast.success("You are registered successfully");
            navigate("/login")
        }
        else{
            toast.error("Unable to register. Please try again later.")
        }

    }

  return (
    <div>
        <h1>Register</h1>

        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id='name' type="text" placeholder='Name' />
        <br />
        <label htmlFor="email">Email: </label>
        <input onChange={handleChange} id='email' type="text" placeholder='Email' />
        <br />
        <label htmlFor="name">Password: </label>
        <input onChange={handleChange} id='password' type="password" placeholder='Password' />

        <br /><br />
        <button onClick={handleRegister}>Register</button>

    </div>
  )
}

export default Register