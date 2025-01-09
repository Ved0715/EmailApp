import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='flex items-center justify-center w-screen mt-10'>
        <form action="" className='flex flex-col gap-3 bg-white p-4 w-[20%]'>
            <h1 className='font-bold text-2xl uppercase'>SignUp</h1>
            <input className='border border-gray-400 rounde-md px-2 py-1' type="text" placeholder='Name' />
            <input className='border border-gray-400 rounde-md px-2 py-1' type="email" placeholder='Email' />
            <input className='border border-gray-400 rounde-md px-2 py-1' type="password" placeholder='Password' />
            <button type='submit' className='bg-gray-800 p-2 text-white my-2 rounded-md'>SignUp</button>
            <p>Already Have an account? <Link to={'/login'} className='text-blue-600'>Login</Link></p>
        </form>
    </div>
  )
}

export default Signup