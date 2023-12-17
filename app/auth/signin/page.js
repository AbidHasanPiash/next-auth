'use client'
import { signIn } from 'next-auth/react';
import React, { useState } from 'react'

export default function Login() {
  const [formData, setFormData] = useState({ email: 'admin@admin.com', password: 'admin'});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: true,
        callbackUrl: '/'
    })
  }
  return (
    <div className='md:h-screen flex items-center justify-center text-gray-700'>
      <div className='w-full md:w-5/6 xl:w-4/6 m-2'>
            <div>
                <form onSubmit={handleSubmit} className='space-y-6 px-0 sm:px-4 md:px-8'>
                    <div>
                        <h1 className='text-3xl md:text-5xl font-bold'>Login.</h1>
                        <p className='text-base md:text-xl font-bold p-1'>With your Account</p>
                    </div>
                    <div className='w-full relative flex flex-col'>
                        <input 
                            type="email"
                            name="email"
                            id="email"
                            placeholder='Email'
                            className='input-body peer'
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label 
                            htmlFor="userName" 
                            className='input-label'>
                            email
                        </label>
                    </div>
                    <div className='w-full relative flex flex-col'>
                        <input 
                            type="password"
                            name="password"
                            id="password"
                            placeholder='Password'
                            className='input-body peer'
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <label 
                            htmlFor="password" 
                            className='input-label'>
                            password
                        </label>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <button 
                            type="submit" 
                            className='bg-sky-500 text-white px-6 py-2 rounded-full transition-all duration-200
                            hover:ring-1 hover:tracking-widest hover:bg-inherit hover:text-black'>
                            SignIn
                        </button>
                    </div>
                </form>
            </div>
      </div>
    </div>
  )
}
