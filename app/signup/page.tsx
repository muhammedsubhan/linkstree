"use client";

import React, { useState } from "react";
import Image from "next/image";
import signup_banner from "@/public/signup-banner.png";
import google_logo from "@/public/google.png";
import logo from "@/public/linktree-logo.png";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Link from "next/link";
import {
  SignUpCredentials,
  SignUpUser,
} from "../utiles/services/signUp.service";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [showpassword, setShowPassword] = useState<boolean>(false);
  const [createUser, setCreateUser] = useState<SignUpCredentials>({
    email: "",
    username: "",
    password: "",
  });

  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUpUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = await SignUpUser(createUser);

    if (newUser) {
      router.push("/login");
    }
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
              <h1 className="text-5xl font-bold sm:text-4xl">Join Linktree</h1>
              <p className="text-gray-500 text-lg sm:text-base">
                Sign up for free!
              </p>
            </div>
            <form className="flex justify-center ">
              <div className="flex flex-col gap-5 lg:w-full">
                <div className="w-full flex flex-col gap-6">
                  <div className=" flex flex-col gap-2 bg-gray-100 xl:w-[500px] lg:w-full">
                    <TextField
                      id="outlined-basic"
                      label="Username"
                      name="username"
                      value={createUser.username}
                      onChange={handleOnChange}
                      variant="outlined"
                      className="xl:w-[500px] lg:w-full"
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
                  <div className=" flex flex-col gap-2 bg-gray-100 xl:w-[500px] lg:w-full">
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      name="email"
                      value={createUser.email}
                      onChange={handleOnChange}
                      variant="outlined"
                      className="xl:w-[500px] lg:w-full"
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
                    <div className=" flex items-center w-[650px] xl:w-[500px] lg:w-full bg-gray-100 rounded-lg ">
                      <TextField
                        id="outlined-basic"
                        label="Password"
                        name="password"
                        value={createUser.password}
                        variant="outlined"
                        onChange={handleOnChange}
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
                  onClick={handleSignUpUser}
                  className="cursor-pointer bg-purple-700 text-white py-3 text-center rounded-full"
                >
                  <button className="text-lg font-medium">
                    Create Account
                  </button>
                </div>
              </div>
            </form>

            <div className="flex justify-center mt-5">
              <div className="w-[650px] text-center flex flex-col gap-4 xl:w-[500px] lg:w-full">
                <p className="text-center text-gray-500 sm:text-sm">
                  By clicking{" "}
                  <span className="text-gray-600 font-medium">
                    Create account
                  </span>
                  , you agree to Linktree's{" "}
                  <span className="underline">privacy notice</span>,{" "}
                  <span className="underline">T&Cs</span> and to receive offers,
                  news and updates.
                </p>
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
                      Sign up with Google
                    </button>
                  </div>
                </div>
                <div className="py-8">
                  <p className="text-gray-500">
                    Already have an account?{" "}
                    <Link href="/login">
                      <span className="text-purple-700 underline cursor-pointer">
                        Log in.
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
            src={signup_banner}
            alt="signup-banner"
            style={{ height: "100%", width: "100vh", objectFit: "cover" }}
            priority
            className="lg:hidden flex"
          />
        </div>
      </div>
    </>
  );
};

export default Signup;
