"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/public/linktree-logo.png";
import { TextField } from "@mui/material";
import Link from "next/link";
import { CiShare1 } from "react-icons/ci";
import { forgotPassword } from "../utiles/services/login.service";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    setLoading(true);

    try {
      const response = await forgotPassword(email);
      console.log(response.data);
    } catch (error) {
      console.error("Error sending reset password email:", error);
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
            <h1 className="text-5xl font-bold">Reset your password</h1>
            <p className="text-gray-500">
              If you signed up with an email and password, reset your password
              below.
            </p>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2 bg-gray-100">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  sx={{
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      height: "54px",
                      "& input": {
                        padding: "8px",
                      },
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

              <div className="flex flex-col gap-10 items-center">
                <div
                  className="cursor-pointer bg-purple-700 text-white py-2 text-center rounded-full w-full"
                  onClick={handleForgotPassword}
                  disabled={loading || !email.trim()} 
                >
                  <button className="text-base font-medium">
                    {loading ? "Sending..." : "Reset Password"}
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

export default ForgotPassword;
