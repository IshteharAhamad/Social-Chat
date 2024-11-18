import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoMdSend } from "react-icons/io";
import { RiEmotionLine } from "react-icons/ri";

function MessageBar() {
  const EmojiRef=useRef();
  const [message, setMessage] = useState("");
  const [emojiPickerOpen,setEmojiPickerOpen]=useState(false);
  useEffect(()=>{
    const CloseEmojiBox=(e)=>{
        if(EmojiRef.current && !EmojiRef.current.contains(e.target)){
            setEmojiPickerOpen(false)
        }
    }
        document.addEventListener('mousedown',CloseEmojiBox);
        return ()=>{
            document.removeEventListener('mousedown',CloseEmojiBox);
        }
    
  },[EmojiRef])
  const AddEmoji= (emoji)=>{
    setMessage((message)=>message+emoji.emoji)
  }
  const handleSendMessage =()=>{

  }
  return (
    <div className="h-[10vh] flex items-center justify-center px-8 mb-5 gap-6 ">
      <div className="flex-1 flex items-center bg-[#2c2d35] rounded-md gap-3 pr-4 ">
        <input
          type="text"
          placeholder="Typing... "
          className=" shadow-md flex-1 p-3 bg-transparent rounded-md focus:border-none focus:outline-none "
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-200 transition-all">
          <GrAttachment className="text-2xl" />
        </button>
        <div className="relative">
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-200 transition-all"
          onClick={()=>setEmojiPickerOpen(true)}
          >
            <RiEmotionLine className="text-2xl" />
          </button>
          <div className="absolute bottom-10 right-0" ref={EmojiRef}>
            <EmojiPicker
            theme="dark"
            open={emojiPickerOpen}
            onEmojiClick={AddEmoji}
            autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
      <button className="bg-[#444445] rounded-md flex items-center justify-center p-3 focus:border-none focus:outline-none focus:text-white duration-200 transition-all"
      onClick={handleSendMessage}
      >
        <IoMdSend className="text-2xl" />
      </button>
    </div>
  );
}

export default MessageBar;
