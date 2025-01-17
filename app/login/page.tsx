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
import { redirect } from "next/navigation";
import { LoginCredentials, loginUser } from "../utiles/services/login.service";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Login = () => {
  const [showpassword, setShowPassword] = useState<boolean>(false);
  const [loginUserData, setLoginUserData] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const handleShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const newloginUser = await loginUser(loginUserData);

    if (!newloginUser.access_token) {
      toast.error("Token is missing");
    }

    toast.success(`you are login successfully`);

    Cookies.set("accessToken", newloginUser.access_token, {
      expires: 7,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    localStorage.setItem("accessToken", newloginUser.access_token);

    redirect("/admin");
  };

  return (
    <>
      <div className="flex ">
        <div className="flex-1 ">
          <div className="flex items-center py-12 px-12 sm:px-6 sm:py-6 sm:mb-12">
            <h1 className="text-3xl font-medium sm:text-2xl">Linktree</h1>
            <Image src={logo} height={25} width={19} alt="linktree-logo" />
          </div>
          <div className="px-5">
            <div className="flex flex-col items-center gap-4 mb-10">
              <h1 className="text-5xl font-bold  sm:text-4xl">Welcome back</h1>
              <p className="text-gray-500 text-lg sm:text-base">
                Log in to your Linktree
              </p>
            </div>
            <form className="flex justify-center ">
              <div className="flex flex-col gap-5 lg:w-full">
                <div className="w-full flex flex-col gap-6">
                  <div className=" flex flex-col gap-2 bg-gray-100  xl:w-[500px] lg:w-full">
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      name="email"
                      value={loginUserData.email}
                      onChange={handleOnChange}
                      className="xl:w-[500px] lg:w-full"
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
                    <div className=" flex items-center w-[650px]  bg-gray-100 rounded-lg  xl:w-[500px] lg:w-full">
                      <TextField
                        id="outlined-basic"
                        label="Password"
                        name="password"
                        value={loginUserData.password}
                        onChange={handleOnChange}
                        variant="outlined"
                        type={showpassword ? "text" : "password"}
                        className="w-[650px] xl:w-[500px] lg:w-full"
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

                <div
                  onClick={handleLoginUser}
                  className="cursor-pointer bg-purple-700 text-white py-3 text-center rounded-full"
                >
                  <button className="text-lg font-medium">Log in</button>
                </div>
              </div>
            </form>

            <div className="flex justify-center mt-5">
              <div className="w-[650px] text-center flex flex-col gap-4 lg:w-full">
                <p className="text-gray-500 font-medium">OR</p>

                <div className=" flex flex-col justify-center items-center">
                  <div className="w-full xl:w-[500px] lg:w-full cursor-pointer bg-white text-black flex  items-center justify-center gap-4 py-3 text-center rounded-full border border-gray-150 hover:bg-gray-100 transition-all ">
                    <Image
                      src={google_logo}
                      height={22}
                      width={22}
                      alt="google_logo"
                    />
                    <button className="text-lg font-medium">
                      Continue with Google
                    </button>
                  </div>
                </div>
                <div className="flex  justify-center gap-3 mt-4">
                  <Link href="/forgot-password">
                    <p className="underline text-purple-600 cursor-pointer">
                      Forgot password?
                    </p>
                  </Link>
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
