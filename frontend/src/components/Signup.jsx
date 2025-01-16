import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/user/register", input, {
        headers: {
          'Content-Type': "application/json"
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className='relative flex items-center justify-center w-screen h-screen'>
      <form onSubmit={submitHandler} className={`relative flex flex-col gap-4 bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-md animate-fade-in`}>
        <h1 className='font-bold text-3xl text-center text-gray-800 mb-4'>Sign Up for GamilApp</h1>
        <input onChange={changeHandler} value={input.fullname} name='fullname' className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder='Name' />
        <input onChange={changeHandler} value={input.email} name='email' className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' type='email' placeholder='Email' />
        <input onChange={changeHandler} value={input.password} name='password' className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' type="password" placeholder='Password' />
        <button type='submit' className='bg-blue-600 p-2 text-white rounded-md hover:bg-blue-700 transition duration-300'>Sign Up</button>
        <p className='text-center text-gray-600'>Already have an account? <Link to={'/login'} className='text-blue-600 hover:underline'>Login</Link></p>
      </form>
    </div>
  )
}

export default Signup