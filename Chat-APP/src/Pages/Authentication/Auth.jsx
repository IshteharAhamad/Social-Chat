import React, { useState } from "react";
import victory from "@/assets/victory.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/Components/ui/button";
import background from "@/assets/login2.png";
import { toast } from "sonner";
import { APIClient } from "@/lib/APIClient";
import { LOGIN, SIGNUP } from "@/Utilities/Constant";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/Store";

function Auth() {
  const navigate = useNavigate();
  const {setUserInfo}=useAppStore()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Loginvalidation = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }

    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    return true;
  };
  const SignUpvalidation = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!username.length) {
      toast.error("Username is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    return true;
  };
  const HandleLogin = async () => {
    if (Loginvalidation()) {
      const response = await APIClient.post(
        LOGIN,
        { email, password },
        { withCredentials: true }
      );
      const data=await response.data;
      toast.success(data.message);
      setUserInfo(data?.data?.user)
      if (data?.data?.user?.isUser) {
          navigate("/chat");
        } else {
            navigate("/profile");
        }
    }
    setEmail("");
    setPassword("");
  };
  const HandleSignup = async () => {
    if (SignUpvalidation()) {
      try {
        const response = await APIClient.post(
          SIGNUP,
          {
            username,
            email,
            password,
          },
          { withCredentials: true }
        );
        
        setUserInfo(response.data.data)
        // Check if the request was successful and handle accordingly
        if (response?.status === 201) {
          toast.success(response.data.message);
          setUsername("");
          setEmail("");
          setPassword("");
          navigate("/profile");
        }
      } catch (error) {
        // Handle specific error cases, like 409 conflict
        if (error?.response?.status === 409) {
          toast.error("User email already exists!");
        } else {
          toast.error("An error occurred during signup. Please try again.");
        }
      }
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-gradient-to-tr from-violet-800 to-blue-800 ">
      <div className="w-[80vw] h-auto bg-slate-100 shadow-2xl rounded-3xl text-opacity-90 md:w-[90vw] xl:w-[60vw] lg:w-[70vw] grid xl:grid-cols-2">
        <div className="flex justify-center items-center flex-col gap-10">
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex justify-center items-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={victory} alt="emoji" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Please fill in your details to log in and start chatting on the
              platform.
            </p>
          </div>
          <div className="flex justify-center items-center w-full">
            <Tabs defaultValue="login" className="w-3/4">
              <TabsList className="bg-transparent w-full rounded-none">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90
                w-full border-b-2 rounded-none data-[state=active]:text-black data-[state=active]:font-semibold
                data-[state=active]:border-b-sky-600 p-3 transition-all duration-300
                "
                >
                  Log In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90
                w-full border-b-2 rounded-none data-[state=active]:text-black data-[state=active]:font-semibold
                data-[state=active]:border-b-sky-600 p-3 transition-all duration-300
                "
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="flex flex-col gap-5 mt-8">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className=" shadow-md rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Enter your password"
                  className="shadow-md rounded-full p-6"
                />
                <Button className="rounded-full p-6" onClick={HandleLogin}>
                  Login
                </Button>
              </TabsContent>
              <TabsContent value="signup" className="flex flex-col gap-5">
                <Input
                  type="text"
                  placeholder="Enter your username"
                  className=" shadow-md rounded-full p-6"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className=" shadow-md rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Enter your password"
                  className="shadow-md rounded-full p-6"
                />
                <Button className="rounded-full p-6" onClick={HandleSignup}>
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={background} alt="image" className="w-[410px]" />
        </div>
      </div>
    </div>
  );
}

export default Auth;
