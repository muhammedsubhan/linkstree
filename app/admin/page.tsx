"use client";

import React, { useEffect, useRef, useState } from "react";
import { PiLinkSimpleHorizontalLight } from "react-icons/pi";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { PiShapesThin } from "react-icons/pi";
import { PiCalendarBlankThin } from "react-icons/pi";
import { PiGraphThin } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import Image from "next/image";
import admin_logo from "@/public/linktree_svg.svg";
import AdminLinksComponent from "../components/adminPageComp/AdminLinksComponent";
import AdminPhoneView from "../components/adminPageComp/AdminPhoneView";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { VscAccount } from "react-icons/vsc";
import { CiDollar } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { CiCircleQuestion } from "react-icons/ci";
import { useAppSelector } from "../lib/hooks";
import { RootState } from "../lib/store/store";

const Admin = () => {
  const [decodedData, setDecodedData] = useState<{
    email: string;
    _id: string;
    iat: number;
    exp: number;
    username?: string;
  }>();
  const [activeNav, setActiveNav] = useState<string>("Links");

  const [menuToggle, setMenuToggle] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const UsersAvatar = useAppSelector(
    (state: RootState) => state.userAvatar.Avatar
  );

  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    Cookies.remove("accessToken");
    router.push("/login");
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      try {
        const decoded = jwt.decode(accessToken) as {
          email: string;
          _id: string;
          iat: number;
          exp: number;
          username: string;
        };
        setDecodedData(decoded);
        console.log(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.log("No access token found");
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="bg-[#F3F3F1] flex h-screen ">
        <div className="border-r min-w-[240px] h-screen">
          <div className="mx-3 h-full flex flex-col">
            <div className="py-5 px-2">
              <Image src={admin_logo} height={18} width={18} alt="admin_logo" />
            </div>
            <div className="flex-grow">
              <nav className="h-full flex flex-col relative">
                <ul className="flex flex-col gap-1 flex-grow">
                  <li
                    onClick={() => setActiveNav("Links")}
                    className={`group flex items-center gap-2 py-1.5  text-base font-medium px-2 hover:bg-[#E7E7E5]  rounded-lg ${
                      activeNav === "Links"
                        ? " text-purple-600"
                        : "text-gray-700  hover:text-purple-600 "
                    }`}
                  >
                    <PiLinkSimpleHorizontalLight
                      className={`text-2xl ${
                        activeNav === "Links"
                          ? "text-purple-600"
                          : "text-gray-500 group-hover:text-purple-600"
                      }`}
                    />
                    Links
                  </li>

                  <li
                    onClick={() => setActiveNav("Shop")}
                    className={`group flex items-center gap-2 py-1.5  hover:bg-[#E7E7E5]  text-base font-medium px-2 rounded-lg ${
                      activeNav === "Shop"
                        ? " text-purple-600"
                        : "text-gray-700  hover:text-purple-600"
                    }`}
                  >
                    <PiShoppingCartSimpleThin
                      className={`text-2xl ${
                        activeNav === "Shop"
                          ? "text-purple-600"
                          : "text-gray-500 group-hover:text-purple-600"
                      }`}
                    />
                    Shop
                  </li>

                  <li
                    onClick={() => setActiveNav("Appearance")}
                    className={`group flex items-center gap-2 py-1.5 hover:bg-[#E7E7E5]  text-base font-medium px-2 rounded-lg ${
                      activeNav === "Appearance"
                        ? " text-purple-600"
                        : "text-gray-700  hover:text-purple-600"
                    }`}
                  >
                    <PiShapesThin
                      className={`text-2xl ${
                        activeNav === "Appearance"
                          ? "text-purple-600"
                          : "text-gray-500 group-hover:text-purple-600"
                      }`}
                    />
                    Appearance
                  </li>

                  <li
                    onClick={() => setActiveNav("Social Planner")}
                    className={`group flex items-center gap-2 py-1.5  hover:bg-[#E7E7E5]  text-base font-medium px-2 rounded-lg ${
                      activeNav === "Social Planner"
                        ? " text-purple-600"
                        : "text-gray-700  hover:text-purple-600"
                    }`}
                  >
                    <PiCalendarBlankThin
                      className={`text-2xl ${
                        activeNav === "Social Planner"
                          ? "text-purple-600"
                          : "text-gray-500 group-hover:text-purple-600"
                      }`}
                    />
                    Social Planner
                  </li>

                  <li
                    onClick={() => setActiveNav("Analytics")}
                    className={`group flex items-center gap-2 py-1.5  hover:bg-[#E7E7E5]  text-base font-medium px-2 rounded-lg ${
                      activeNav === "Analytics"
                        ? " text-purple-600"
                        : "text-gray-700  hover:text-purple-600"
                    }`}
                  >
                    <PiGraphThin
                      className={`text-2xl ${
                        activeNav === "Analytics"
                          ? "text-purple-600"
                          : "text-gray-500 group-hover:text-purple-600"
                      }`}
                    />
                    Analytics
                  </li>

                  <li
                    onClick={() => setActiveNav("Settings")}
                    className={`group flex items-center gap-2 py-1.5 hover:bg-[#E7E7E5]  text-base font-medium px-2 rounded-lg ${
                      activeNav === "Settings"
                        ? " text-purple-600"
                        : "text-gray-700  hover:text-purple-600"
                    }`}
                  >
                    <IoSettingsOutline
                      className={`text-2xl ${
                        activeNav === "Settings"
                          ? "text-purple-600"
                          : "text-gray-500 group-hover:text-purple-600"
                      }`}
                    />
                    Settings
                  </li>
                </ul>
                <div
                  onClick={() => setMenuToggle(true)}
                  className="  mb-6  flex flex-col justify-end px-1.5 rounded-full hover:bg-[#E7E7E5] cursor-pointer"
                >
                  <div className="flex py-1.5 items-center gap-2 ">
                    <div className="rounded-full px-2.5 py-1.5 bg-white">
                      {UsersAvatar && UsersAvatar.key ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={UsersAvatar.key}
                          alt="User Avatar"
                          className="rounded-full h-12 w-12 object-cover"
                        />
                      ) : (
                        <p className="text-black font-semibold">
                          {" "}
                          {decodedData?.username
                            ? decodedData.username.charAt(0).toUpperCase()
                            : ""}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        @
                        {decodedData?.username &&
                        decodedData.username.length > 12
                          ? `${decodedData.username.slice(0, 12)}...`
                          : decodedData?.username}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  ref={menuRef}
                  className={`py-6 absolute bg-white rounded-e-[38px] shadow-2xl rounded-s-[38px] z-50 bottom-14 left-20 w-[350px] max-h-[650px] transition-opacity ease-in-out duration-300 ${
                    menuToggle ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="flex  items-center py-3  gap-3 px-5">
                    <div className="h-12 w-[58px] rounded-full bg-[#F5F6F8] text-black flex flex-col items-center justify-center">
                      <p className="font-bold text-base">
                        {decodedData?.username
                          ? decodedData.username.charAt(0).toUpperCase()
                          : ""}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex flex-col gap-1">
                        <p className="text-black font-semibold ">
                          @ {decodedData?.username}
                        </p>
                        <p className="text-xs text-[#969991] font-normal ">
                          {` linktree/${decodedData?.username}`}
                        </p>
                      </div>
                      <div className="flex items-center justify-center w-11 h-6 bg-[#E0E2D9] rounded-3xl">
                        <p className="text-sm font-semibold text-[#6D7165]">
                          Free
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2  ">
                    <div className="mb-6">
                      <p className=" text-[#676B5F] font-medium text-[15px] px-5">
                        Account
                      </p>
                    </div>
                    <div>
                      <ul className="px-2 flex flex-col gap-1">
                        <li className="flex gap-5 px-2.5 items-center cursor-pointer rounded-xl hover:bg-[#F6F7F5] text-[15px]  py-3">
                          <VscAccount className="text-xl" /> My account
                        </li>
                        <li className="flex gap-5 px-2.5 items-center rounded-xl cursor-pointer hover:bg-[#F6F7F5] text-[15px]  py-3">
                          <CiDollar className="text-xl" /> Billing
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="py-2  ">
                    <div className="mb-6">
                      <p className=" text-[#676B5F] font-medium text-[15px] px-5">
                        Support
                      </p>
                    </div>
                    <div>
                      <ul className="px-2 flex flex-col gap-1">
                        <li className="flex gap-5 px-2.5 items-center cursor-pointer  rounded-xl hover:bg-[#F6F7F5] text-[15px]  py-3">
                          <CiCircleQuestion className="text-xl" /> Ask a
                          question
                        </li>
                        <li
                          onClick={() => handleSignOut()}
                          className="flex gap-5 px-2.5 items-center cursor-pointer rounded-xl hover:bg-[#F6F7F5] text-[15px]  py-3"
                        >
                          <CiLogout className="text-xl" /> Sign out
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="min-w-[1130px] ">
          <AdminLinksComponent />
        </div>
        <div className="w-full ">
          <AdminPhoneView username={decodedData?.username} />
        </div>
      </div>
    </>
  );
};

export default Admin;
