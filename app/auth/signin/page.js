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
    console.log(formData);
    await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: true,
        callbackUrl: '/'
    })
  }
  return (
    <div className='h-screen flex items-center justify-center text-gray-700'>
      <div className='grid grid-cols-3 gap-10 items-center justify-center w-full h-full p-8'>
          <div className='hidden xl:col-span-2 w-full h-full xl:flex items-center justify-center bg-violet-50 rounded-xl'>
              <img src="/images/pages/auth-v2-login-illustration-bordered-light.png" alt="login image" className='w-[400px]' />
          </div>
          <div className='xl:col-span-1 col-span-3 w-full xl:px-10 px-2 items-center justify-center'>
            <form onSubmit={handleSubmit} className='md:w-96 w-full space-y-8'>
                <div>
                    <h1 className='text-2xl'>Welcome to MCQ-Topper! 👋🏻</h1>
                    <p className='text-sm'>Please sign-in to your account and start the adventure</p>
                </div>
                <div className='text-sm p-3 space-y-3 bg-violet-200 text-violet-700 rounded-md'>
                    <p>Admin Email: <strong>admin@demo.com</strong> / Pass: <strong>admin</strong></p>
                    <p>Client Email: <strong>client@demo.com</strong> / Pass: <strong>client</strong></p>
                </div>
                <div className='w-full relative flex flex-col'>
                    <label
                        htmlFor="email" 
                        className='text-sm pb-2'>
                        Email
                    </label>
                    <input 
                        type="email"
                        name="email"
                        id="email"
                        placeholder='Email'
                        className='input-body'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className='w-full relative flex flex-col'>
                    <label 
                        htmlFor="password" 
                        className='text-sm pb-2'>
                        Password
                    </label>
                    <input 
                        type="password"
                        name="password"
                        id="password"
                        placeholder='Password'
                        className='input-body'
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button 
                    type="submit" 
                    className='w-full bg-violet-600 text-white px-6 py-2 rounded-md
                    hover:ring-1 hover:shadow-lg hover:bg-violet-700'>
                    SignIn
                </button>
            </form>
          </div>
      </div>
    </div>
  )
}
