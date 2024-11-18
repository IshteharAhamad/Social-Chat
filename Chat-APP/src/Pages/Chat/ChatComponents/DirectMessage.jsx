import React, { useState } from "react";
import animationData from '@/assets/lottie-json.json'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { FaPlus } from "react-icons/fa";
import { Input } from "@/Components/ui/input";

function DirectMessage() {
  const [openNewContact, setOpenNewContact] = useState(false);
  const [searchContacts, setsearchContacts] = useState([]);
 
  const SearchContact = (e) => {};
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewContact(true)}
            />
          </TooltipTrigger>
          <TooltipContent className=" bg-slate-500 border-none mb-2 p-2 text-white ">
            <p>Select New Contact</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContact} onOpenChange={setOpenNewContact}>
        <DialogContent
          className="bg-slate-700
         border-none text-white w-[400px] h-[400px] flex flex-col
         
         "
        >
          <DialogHeader>
            <DialogTitle className="text-center">
              Please select a Contact.
            </DialogTitle>
            <DialogDescription className="text-white text-2xl"></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              className="rounded-lg p-5 bg-[#2c2e3b] border-none outline-none shadow-md "
              placeholder="Search Contact..."
              onChange={(e) => SearchContact(e.target.value)}
            />
          </div>
          {searchContacts.length <= 0 && <div className="text-center poppins-medium"><p> Hi Search New Contacts ...</p></div>}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DirectMessage;
