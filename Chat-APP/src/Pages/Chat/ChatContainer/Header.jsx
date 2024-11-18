import React from 'react'
import { RiCloseFill } from "react-icons/ri";

function Header() {
  return (
    <div className='h-[10vh] shadow-sm flex items-center px-20 bg-[#373844]'>
        <div className='flex gap-5 items-center'>
            <div className='flex gap-3 items-center justify-center'></div>
            <div className='flex gap-5 items-center justify-center'>
                <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-200 transition-all'>
                    <RiCloseFill className='text-3xl'/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Header