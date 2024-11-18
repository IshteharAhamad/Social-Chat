import React from 'react'
// import Lottie from "lottie-react";
// import animationData from '../../../assets/lottie-json'
function EmptyChat() {
    // const defaultOptions = {
    //     loop: true,
    //     autoplay: true,
    //     animationData: animationData, // Your imported animation JSON
    //   };
  return (
    <div className='flex-1 flex-col justify-center items-center hidden duration-300 md:bg-[#1e1d25] md:flex'>
        {/* <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={defaultOptions}
        /> */}
        <div className='text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 transition-all duration-300 text-center '>
            <h3> Hi, welcome to Social Chats...</h3>
        </div>
    </div>
  )
}

export default EmptyChat