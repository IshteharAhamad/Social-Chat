import React from 'react'
import Logo from './Logo'
import Title from './Title'
import ProfileOnChat from './ProfileOnChat'
import DirectMessage from './DirectMessage'

function Contacts() {
  return (
    <div className='relative md:w-[35vw] xl:w-[25vw] lg:w-[20vw] w-full border-b-2 border-[#828499] bg-[#1b1c24]'>
        <div className='pt-3'>
            <Logo/>
        </div>
        <div className='mt-5 poppins-medium'>
            <div className='flex items-center justify-between pr-10'>
            <Title text="Direct Message"/>
            <DirectMessage/>
            </div>
        </div>
        <div className='mt-5 poppins-medium'>
            <div className='flex items-center justify-between pr-10'>
            <Title text="Channels"/>
            </div>
        </div>
        <ProfileOnChat/>
    </div>
  )
}

export default Contacts