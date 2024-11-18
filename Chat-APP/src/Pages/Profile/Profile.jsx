import { useAppStore } from "@/Store";
import { Avatar } from "@radix-ui/react-avatar";
import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { AvatarImage } from "@/Components/ui/avatar";
import { Input } from "@/Components/ui/input";
import { toast } from "sonner";
import { APIClient } from "@/lib/APIClient";
import { DELETE_AVATAR, UPDATE_AVATAR, UPDATE_PROFILE } from "../../Utilities/Constant.js";
function Profile() {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const imageref = useRef(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [image, setImage] = useState(null);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (userInfo.isUser) {
      setFirstname(userInfo.firstname);
      setLastname(userInfo.lastname);
    }
    if (userInfo?.image) {
      setImage(userInfo.image);
    }
  }, [userInfo]);
  const validation = () => {
    if (!firstname) {
      toast.error("Firstname is required!");
      return false;
    }
    if (!lastname) {
      toast.error("Lastname is required!");
      return false;
    }
    return true;
  };
  const saveChange = async () => {
    if (validation()) {
      try {
        const response = await APIClient.patch(
          UPDATE_PROFILE,
          { firstname, lastname },
          { withCredentials: true }
        );
        const data = response.data;

        if (response.status === 200) {
          setUserInfo({ ...data.data });
          toast.success(data.message);
          navigate("/chat");
        }
        
      } catch (error) {
        console.log(error);
      }
    }
  };
  const UploadImage = () => {
    imageref.current.click();
  };
  const handleDelete = async () => {
    try {
      const response= await APIClient.delete(DELETE_AVATAR,{withCredentials:true})
      console.log(response)
      if(response.status===200){
        setUserInfo({...response.data.data})
        toast.success(response.data.message)
        setImage(null)
      }
    } catch (error) {
      console.log(error)
    }
  };
  const handleUpdate = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formdata = new FormData();
        formdata.append("image", file);
        const response = await APIClient.patch(UPDATE_AVATAR, formdata, {
          withCredentials: true,
        });
        if (response.status === 200 && response?.data?.data?.image) {
          setUserInfo({ ...response.data.data });
          toast.success(response?.data?.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="bg-slate-800 h:[100vh] flex flex-col items-center justify-center gap-10 ">
      <h1 className="text-center text-4xl font-semibold text-white">
        Profile Details
      </h1>
      <div className="flex w-[80vw] flex-col gap-10 md:max-w-full">
        <div
          onClick={() => {
            if (userInfo.isUser) {
              navigate("/chat");
            } else {
              toast.error("Please setup your profile to contineu chat...");
            }
          }}
        >
          <IoMdArrowRoundBack className="text-3xl xl:text-5xl text-white/90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="relative w-32 h-full md:w-48 md:h-48 flex items-center justify-center"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="Profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div className="uppercase h-32 md:h-48 w-32 md:w-48 flex items-center justify-center text-6xl font-semibold border-[1px] rounded-full bg-blue-400">
                  {firstname
                    ? firstname.charAt(0)||"N/A"
                    : userInfo?.email?.charAt(0) || "N/A"}
                </div>
              )}
            </Avatar>
            {hover && (
              <div
                onClick={image ? handleDelete : UploadImage}
                className=" absolute flex justify-center items-center inset-0 bg-black/50 rounded-full"
              >
                {image ? (
                  <FaTrash className="text-white text-4xl cursor-pointer" />
                ) : (
                  <FaPlusCircle className="text-white text-4xl cursor-pointer" />
                )}
              </div>
            )}
            <input
              type="file"
              ref={imageref}
              className="hidden"
              onChange={handleUpdate}
              name="image"
              accept=".png,.jpg,.jpeg,.svg,.webp"
            />
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-start">
            <div className="w-full">
              <Input
                type="text"
                placeholder="Username"
                value={userInfo.username}
                className="rounded-lg px-4 border-none text-black bg-white"
                disabled
              />
              <div className="w-full mt-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={userInfo.email}
                  className="rounded-lg px-4 border-none text-black bg-white"
                  disabled
                />
              </div>
              <div className="w-full mt-2">
                <Input
                  type="text"
                  placeholder="Enter firstname"
                  value={firstname}
                  className="rounded-lg px-4 border-none text-black bg-white"
                  onChange={(e)=>setFirstname(e.target.value)}
                />
              </div>
              <div className="w-full mt-2">
                <Input
                  type="text"
                  placeholder="Enter lastname"
                  value={lastname}
                  className="rounded-lg px-4 border-none text-black bg-white"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full my-2">
              <button
                onClick={saveChange}
                className="h-10 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300 rounded-lg"
              >
                {" "}
                Save Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
