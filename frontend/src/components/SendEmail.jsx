import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { setOpen } from '../redux/appSlice'
import store from '../redux/store'

const SendEmail = () => {
  const {open} = useSelector(store => store.app)
  const dispatch = useDispatch();
  return (
    <div className={`${open ? 'block' : 'hidden'} bg-white max-w-7xl shadow-lg shadow-slate-300 rounded-t-md`}>
      <div className='flex items-center justify-between px-3 py-2 bg-[#F2F6FC]'>
        <h1 className='text-sm'>New Message</h1>
        <div onClick={() => dispatch(setOpen(false))} className='p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer'>
          <RxCross2 size={'15px'}/>
        </div>
      </div>
      <form action="" className='flex flex-col p-3 gap-2'>
        <input type="text" placeholder='Recipient' className='outline-none py-1'/>
        <input type="text" placeholder='Subject' className='outline-none py-1'/>
        <textarea name="" id="" cols="30" rows="20" className='outline-none py-1'></textarea>
      </form>
    </div>
  )
}

export default SendEmail