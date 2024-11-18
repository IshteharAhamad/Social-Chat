import { useAppStore } from "@/Store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import EmptyChat from "./ChatComponents/EmptyChat";
import AllChats from "./ChatComponents/AllChats";
import Contacts from "./ChatComponents/Contacts";
function Chat() {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.isUser) {
      toast("Please setup your profile to contineu chat...");
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  return (
    <div className="h-[100vh] flex text-white overflow-hidden bg-slate-600">
      <Contacts/>
      {/* <EmptyChat/> */}
      <AllChats/>
    </div>
  );
}

export default Chat;
