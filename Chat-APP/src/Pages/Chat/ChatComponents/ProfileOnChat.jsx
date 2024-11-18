import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { useAppStore } from "@/Store";
import React from "react";
import { FaEdit } from "react-icons/fa";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { APIClient } from "@/lib/APIClient";
import { LOGOUT } from "@/Utilities/Constant";
import { toast } from "sonner";

function ProfileOnChat() {
  const { userInfo ,setUserInfo} = useAppStore();
  const navigate = useNavigate();
  const HandleLogout= async ()=>{
    try {
        const response = await APIClient.patch(LOGOUT,{},{withCredentials:true});
        
        if(response.status===200){
            navigate("/auth")
            setUserInfo({userInfo:null})
            toast.success(response.data.message)
        }        
    } catch (error) {
        console.error("Logout error:", error.response?.data || error.message);
        toast.error("Failed to logout. Please try again.");
    }
  }
  return (
    <div className="absolute bottom-0 h-[10vh] shadow-md flex items-center justify-between p-5 w-full bg-[#2c2d35]  ">
      <div className="flex justify-center items-center gap-3">
        <div className="w-12 h-12 relative">
          <Avatar className="h-12 w-12  rounded-full overflow-hidden">
            {userInfo.image ? (
              <AvatarImage
                src={userInfo.image}
                alt="Profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div className="uppercase h-12 w-12 flex items-center justify-center text-6xl font-semibold border-[1px] rounded-full bg-blue-400">
                {userInfo.firstname
                  ? userInfo.firstname.charAt(0) || "N/A"
                  : userInfo?.email?.charAt(0) || "N/A"}
              </div>
            )}
          </Avatar>
        </div>
        <div className="text-[16px]">
          {userInfo.firstname && userInfo.lastname
            ? `${userInfo.firstname} ${userInfo.lastname}`
            : ""}
        </div>
      </div>
      <div className=" flex gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
                <FaEdit className="text-purple-500 text-xl font-medium"
                onClick={()=> navigate("/profile")}
                />
            </TooltipTrigger>
            <TooltipContent className="bg-slate-500 border-none">
              <p className="text-white">Edit profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
                <AiOutlineLogout className="text-purple-500 text-xl font-medium"
                onClick={HandleLogout}
                />
            </TooltipTrigger>
            <TooltipContent className="bg-slate-500 border-none">
              <p className="text-white">Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default ProfileOnChat;
