"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/public/linktree-logo.png";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Link from "next/link";
import { CiShare1 } from "react-icons/ci";
import { useRouter, useSearchParams } from "next/navigation";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { resetPassword } from "../utiles/services/login.service";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const router = useRouter();

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handlePasswordChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };

  const handleForgotPassword = async () => {
    setLoading(true);

    try {
      if (token && password.trim()) {
        const response = await resetPassword({ token, password });
        console.log(response);
        setPassword("");
        router.push("/login");
      } else {
        console.error("Token or password is missing");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center py-12 px-12 sm:px-6 sm:py-6 sm:mb-12 mb-8">
          <h1 className="text-3xl font-medium sm:text-2xl">Linktree</h1>
          <Image src={logo} height={25} width={19} alt="linktree-logo" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-[550px] flex flex-col gap-8 px-5 py-5">
            <h1 className="text-5xl font-bold">Create new password</h1>
            <p className="text-gray-500">
              If you signed up with an email and password, reset your password
              below.
            </p>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2 bg-gray-100">
                <TextField
                  id="outlined-basic"
                  label="New Password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleShowPassword}
                          edge="end"
                          className="text-gray-500 hover:text-gray-700"
                          size="small"
                        >
                          {showPassword ? (
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

              <div className="flex flex-col gap-10 items-center">
                <div
                  className="cursor-pointer bg-purple-700 text-white py-2 text-center rounded-full w-full"
                  onClick={handleForgotPassword}
                >
                  <button
                    className="text-base font-medium"
                    disabled={loading || !password.trim()}
                  >
                    {loading ? "Changing..." : "Confirm Password"}
                  </button>
                </div>

                <Link href="/login">
                  <div className="cursor-pointer hover:bg-gray-100 text-purple-700 py-2 flex items-center justify-center text-center rounded-full w-[160px]">
                    <button className="text-base font-medium flex items-center gap-3">
                      <CiShare1 className="text-lg" /> Back to login
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
