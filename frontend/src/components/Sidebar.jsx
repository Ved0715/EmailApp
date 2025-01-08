import React from 'react'

import { LuPencil } from "react-icons/lu";
import { MdInbox, MdMore, MdOutlineDrafts, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoMdStarOutline } from "react-icons/io";
import { MdOutlineWatchLater } from "react-icons/md";
import { TbSend2 } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { setOpen } from '../redux/appSlice';

const sidebarItems = [
    {   id :1,
        icon:<MdInbox size={"24px"}/>,
        text: "Inbox",
    },
    {   id :2,
        icon:<IoMdStarOutline size={"24px"}/>,
        text: "Starred",
    },
    {   id :3,
        icon:<MdOutlineWatchLater size={"24px"}/>,
        text: "Snoozed",
    },
    {   id :4,
        icon:<TbSend2 size={"24px"}/>,
        text: "Sent",
    },
    {   id :5,
        icon:<MdOutlineDrafts size={"24px"}/>,
        text: "Drafts",
    },
    {   id :6,
        icon:<MdOutlineKeyboardArrowDown size={"24px"}/>,
        text: "More",
    },
]

const Sidebar = () => {
    const dispatch =useDispatch();
  return (
    <div className='w-[15%]'>
        <div className='p-3'>
            <button onClick={() => dispatch(setOpen(true))} className='flex items-center gap-2 bg-[#C2E7FF] p-4 rounded-2xl hover:shadow-md'>
            <LuPencil size="18px" />
            <p className='text-sm'>Compose</p>
            </button>
        </div>
        <div className='text-gray-600'>
            {
                sidebarItems.map((item, index) => {
                    return ( 
                        <div key={item.id} className='flex items-center pl-6 py-1 rounded-r-full gap-4 my-2 hover:cursor-pointer hover:bg-gray-200 text-sm'>
                            {item.icon} 
                            <p>{item.text}</p>
                        </div>
                    )
                })
            }
            
        </div>
    </div>
  )
}

export default Sidebar