"use client";

import React, { useState } from "react";
import Image from "next/image";
import signup_banner from "@/public/signup-banner.png";
import google_logo from "@/public/google.png";
import logo from "@/public/linktree-logo.png";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const Signup = () => {
  const [showpassword, setShowPassword] = useState<Boolean>(false);

  const handleShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  return (
    <>
      <div className="flex ">
        <div className="flex-1 ">
          <div className="flex items-center py-12 px-12">
            <h1 className="text-3xl font-medium">Linktree</h1>
            <Image src={logo} height={25} width={19} alt="linktree-logo" />
          </div>
          <div className="">
            <div className="flex flex-col items-center gap-4 mb-5">
              <h1 className="text-5xl font-bold">Join Linktree</h1>
              <p className="text-gray-500 text-lg">Sign up for free!</p>
            </div>
            <form className="flex justify-center ">
              <div className="flex flex-col gap-5">
                <div className="w-full flex flex-col gap-3">
                  <div className=" flex flex-col gap-2">
                    <label htmlFor="email">Email:</label>
                    <input
                      className=" w-[650px] h-[45px] px-2 py-6 bg-gray-100  rounded-lg"
                      type="email"
                      id="email"
                      name="email"
                    />
                  </div>
                  <div className=" flex flex-col gap-2">
                    <label htmlFor="email">Password:</label>
                    <div className=" flex items-center w-[650px] px-2 py-6 h-[45px]  bg-gray-100 rounded-lg ">
                      <input
                        className=" w-[650px] h-[45px]  bg-gray-100  rounded-lg focus:outline-none"
                        type={showpassword ? "text" : "password"}
                        id="password"
                        name="password"
                      />
                      <div
                        className="px-2 cursor-pointer"
                        onClick={handleShowPassword}
                      >
                        {showpassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cursor-pointer bg-purple-700 text-white py-3 text-center rounded-full">
                  <button className="text-lg font-medium">Continue</button>
                </div>
              </div>
            </form>

            <div className="flex justify-center mt-5">
              <div className="w-[650px] text-center flex flex-col gap-4">
                <p className="text-center text-gray-500">
                  By clicking{" "}
                  <span className="text-gray-600 font-medium">
                    Create account
                  </span>
                  , you agree to Linktree's{" "}
                  <span className="underline">privacy notice</span>,{" "}
                  <span className="underline">T&Cs</span> and to receive offers,
                  news and updates.
                </p>
                <p>OR</p>

                <div>
                  <div className="cursor-pointer bg-white text-black flex  items-center justify-center gap-4 py-3 text-center rounded-full border border-gray-100 hover:bg-gray-100 transition-all ">
                    <Image
                      src={google_logo}
                      height={22}
                      width={22}
                      alt="google_logo"
                    />
                    <button className="text-lg font-medium">
                      Sign up with Google
                    </button>
                  </div>
                </div>
                <div className="mt-8">
                  <p className="text-gray-500">
                    Already have an account?{" "}
                    <span className="text-purple-700 underline cursor-pointer">
                      Log in
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <Image
            src={signup_banner}
            height={960}
            width={1000}
            alt="signup-banner"
            objectFit="contain"
            priority
          />
        </div>
      </div>
    </>
  );
};

export default Signup;
