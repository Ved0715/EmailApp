import React from 'react'

import { MdCropSquare } from 'react-icons/md'
import { RiStarLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const Email = () => {
    const navigate = useNavigate();
    const openMail = () => {
        navigate("/mail/123")
    }
  return (
    <div onClick={openMail} className='flex items-center justify-between border-b border-gray-200 px-3 py-3 text-sm hover:cursor-pointer hover:shadow-md'>
        <div className='flex items-center gap-2'>
            <div className='text-gray-300'>
                <MdCropSquare size={'20px'}/>
            </div>
            <div className='text-gray-300'>
                <RiStarLine size={'20px'} />
            </div>
            <div>
                <h1 className='font-semibold'>Vedant</h1>
            </div>
        </div>
        <div className='flex-1 ml-4'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis facilis molestiae ex mollitia vero, ipsa unde. Omnis odit, vero veniam deleniti natus repudiandae beatae similique voluptatum ipsa repellendus. Omnis, similique.</p>
        </div>
        <div className='flex-none text-gray text-sm'>
            <p>12 days ago</p>
        </div>
    </div>
  )
}

export default Email