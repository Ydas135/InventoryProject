import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/UseAuth';

export const LoginPage = () => {

    const { login } = useAuth()
    const navigate = useNavigate();

    const [ form, setForm ] = useState({
        email: "",
        password: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(  { email: form.email, password: form.password })
            navigate("/")
        }   catch{
            alert("Username or password are incorrects")
        }
    }

  return (
    <form 
        className='min-h-screen flex justify-center items-center'
        onSubmit={handleSubmit}
    >
        <div className='flex flex-col justify-center items-center gap-6 h-105 p-4 w-fit'>
            <h2>Login</h2>
            <input 
            type="text" 
            className="w-2xs focus:outline-white/50 focus:outline-none px-4 border border-slate-700 rounded-lg" 
            placeholder='username'
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input 
            type="password" 
            className="w-2xs focus:outline-white/50 focus:outline-none px-4 border border-slate-700 rounded-lg" 
            placeholder='password'
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button 
                type="submit" 
                className='px-3 py-2 bg-slate-900 text-white  rounded-lg cursor-pointer'
            >
                Submit
            </button>
        </div> 
    </form>
  )
}
