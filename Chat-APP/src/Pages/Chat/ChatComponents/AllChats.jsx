import React from 'react'
import Header from '../ChatContainer/Header'
import MessageBar from '../ChatContainer/MessageBar'
import MessageContainer from '../ChatContainer/MessageContainer'

function AllChats() {
  return (
    <div className="fixed flex top-0 w-[100vw] h-[100vh] bg-[#27282f] flex-col md:static md:flex ">
        <Header/>
        <MessageContainer/>
        <MessageBar/>
    </div>
  )
}

export default AllChats