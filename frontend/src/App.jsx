import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import './App.css'

import Inbox from './components/Inbox' 
import Navbar  from './components/Navbar'
import Sidebar from './components/Sidebar'
import Body from './components/Body'
import Mail from './components/Mail'
import SendEmail from './components/SendEmail'
import Login from './components/Login'
import Signup from './components/Signup'
import { useEffect } from 'react';
import store from './redux/store';
import { useSelector } from 'react-redux';
import PageNotFound from './components/PageNotFound';
import {GoogleOAuthProvider} from '@react-oauth/google'
import SetPassword from './components/SetPassword';

const GoogleoAuthWrapper = () => {
  return (
    <GoogleOAuthProvider clientId='978414188823-15b809q9j6ihmqjrj4thc4me7298kb41.apps.googleusercontent.com'>
      <Login ></Login>
    </GoogleOAuthProvider>
  )
}



const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body/>,
    children:[
      {
        path:'/',
        element:<Inbox/>
      },
      {
        path:"/mail/:id",
        element: <Mail/>
      }
    ]
  },
  {
    path:'/login',
    element:<GoogleoAuthWrapper/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:'/set-password',
    element:<SetPassword />
  },
  {
    path:"*",
    element:<PageNotFound />
  }
])

function App() {

  return (
    <div className='bg-[#F6F8FC] h-screen'>
      <RouterProvider router={appRouter} />
      <div className='absolute w-[30%] bottom-0 right-20 z-10'>
        <SendEmail />
      </div>
      <Toaster />
    </div>
  )
}

export default App
