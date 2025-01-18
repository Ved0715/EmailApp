import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, redirect, useNavigate } from 'react-router-dom'
import { setAuthUser } from '../redux/appSlice';
import { useGoogleLogin } from '@react-oauth/google';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/user/login", input, {
        headers: {
          'Content-Type': "application/json"
        },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        setIsSuccess(true);
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/");
        }, 2000); 
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  }

  const responseGoogle = async (authResult) => {
    try {
      if (authResult?.code) {
        const res = await axios.get(`http://localhost:8080/api/v1/user/google-login?code=${authResult.code}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, 
        });
        toast.success(res.data.message);
        if (res.data.success) {
          if (!res.data.newUser) {
          dispatch(setAuthUser(res.data.user));
          }
        }
        navigate(res.data.redirectUrl, {
          state: { token: res.data.token },
        });
        

      } else {
        console.error("Google login error:", authResult);
        toast.error("Google login error:", authResult);
      }
    } catch (error) {
      console.error("Error during Google login process:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code',
    
  });

  return (
    <div className='relative flex items-center justify-center w-screen h-screen'>
      <div className='relative flex flex-col gap-4 bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-md animate-fade-in'>
        <h1 className='font-bold text-3xl text-center text-gray-800 mb-4'>Login</h1>
        <form onSubmit={submitHandler} className={`flex flex-col gap-4`}>
          <input onChange={changeHandler} value={input.email} name='email' className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' type="email" placeholder='Email' />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder='Password'
              value={input.password}
              onChange={changeHandler}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </div>
          <button type='submit' className='bg-blue-600 p-2 text-white rounded-md hover:bg-blue-700 transition duration-300'>Login</button>
        </form>
        <p className='text-center text-gray-600'>Don't have an account? <Link to={'/signup'} className='text-blue-600 hover:underline'>Signup</Link></p>
        <p className='text-center text-gray-600'>Forgot Password? <Link to={'/forgot-password'} className='text-blue-600 hover:underline'>Reset Password</Link></p>
        <button onClick={googleLogin} className="flex items-center justify-center bg-white border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1">
            <title>Google-color</title>
            <desc>Created with Sketch.</desc>
            <defs> </defs>
            <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Color-" transform="translate(-401.000000, -860.000000)">
                <g id="Google" transform="translate(401.000000, 860.000000)">
                  <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path>
                  <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path>
                  <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path>
                  <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path>
                </g>
              </g>
            </g>
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  )
}

export default Login