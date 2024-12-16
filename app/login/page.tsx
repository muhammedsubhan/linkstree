"use client";

import React, { useState } from "react";
import Image from "next/image";
import login_banner from "@/public/login-banner.png";
import google_logo from "@/public/google.png";
import logo from "@/public/linktree-logo.png";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Link from "next/link";

const Login = () => {
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
            <div className="flex flex-col items-center gap-4 mb-10">
              <h1 className="text-5xl font-bold">Welcome back</h1>
              <p className="text-gray-500 text-lg">Log in to your Linktree</p>
            </div>
            <form className="flex justify-center ">
              <div className="flex flex-col gap-5">
                <div className="w-full flex flex-col gap-6">
                  <div className=" flex flex-col gap-2 bg-gray-100">
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      name="email"
                      variant="outlined"
                      sx={{
                        borderRadius: "8px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          "&:hover fieldset": {
                            borderColor: "lightgray",
                            borderWidth: "2px",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "black",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "gray",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "gray",
                        },
                      }}
                    />
                  </div>
                  <div className=" flex flex-col gap-2">
                    <div className=" flex items-center w-[650px]  bg-gray-100 rounded-lg ">
                      <TextField
                        id="outlined-basic"
                        label="Password"
                        name="password"
                        variant="outlined"
                        type={showpassword ? "text" : "password"}
                        className="w-[650px]"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleShowPassword}
                                edge="end"
                                className="text-gray-500 hover:text-gray-700"
                                size="small"
                              >
                                {showpassword ? (
                                  <FaRegEye className="w-4 h-4" />
                                ) : (
                                  <FaRegEyeSlash className="w-4 h-4" />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                          sx: {
                            borderRadius: "8px",
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "lightgray",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "black",
                            },
                          },
                        }}
                        InputLabelProps={{
                          sx: {
                            color: "gray",
                            "&.Mui-focused": {
                              color: "gray",
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="cursor-pointer bg-purple-700 text-white py-3 text-center rounded-full">
                  <button className="text-lg font-medium">
                    Create Account
                  </button>
                </div>
              </div>
            </form>

            <div className="flex justify-center mt-5">
              <div className="w-[650px] text-center flex flex-col gap-4">
                <p className="text-gray-500 font-medium">OR</p>

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
                <div className="flex  justify-center gap-3 mt-4">
                  <p className="underline text-purple-600 cursor-pointer">
                    Forgot password?
                  </p>
                  <p className="text-xl">•</p>
                  <p className="underline text-purple-600 cursor-pointer">
                    Forgot email?
                  </p>
                </div>
                <div className="mt-8">
                  <p className="text-gray-500">
                    Don't have an account?{" "}
                    <Link href="/signup">
                      <span className="text-purple-700 underline cursor-pointer">
                        Sign up.
                      </span>
                    </Link>
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
            justifyContent: "center",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <Image
            src={login_banner}
            alt="signup-banner"
            style={{ height: "100%", width: "100vh", objectFit: "cover" }}
            className="lg:hidden flex"
            priority
          />
        </div>
      </div>
    </>
  );
};

export default Login;
