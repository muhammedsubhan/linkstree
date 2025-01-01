"use client";

import React, { useEffect, useState } from "react";
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

import { getCurrentUserName } from "../utiles/services/login.service";
import jwt, { JwtPayload } from "jsonwebtoken";

const Admin = () => {
  const [decodedData, setDecodedData] = useState<{
    email: string;
    _id: string;
    iat: number;
    exp: number;
    username?: string;
  }>();
  const [activeNav, setActiveNav] = useState<string>("Links");

  const getAllUsers = async () => {
    const users = await getCurrentUserName();

    console.log(users);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

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

  return (
    <>
      <div className="bg-[#F3F3F1] flex h-screen ">
        <div className="border-r min-w-[240px] h-screen">
          <div className="mx-3 h-full flex flex-col">
            <div className="py-5 px-2">
              <Image src={admin_logo} height={18} width={18} alt="admin_logo" />
            </div>
            <div className="flex-grow">
              <nav className="h-full flex flex-col">
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
                <div className=" mb-6  flex flex-col justify-end px-1.5 rounded-full hover:bg-[#E7E7E5]">
                  <div className="flex py-1.5 items-center gap-2 ">
                    <div className="rounded-full px-2.5 py-1.5 bg-white">
                      <p className="text-black font-semibold">
                        {" "}
                        {decodedData?.username
                          ? decodedData.username.charAt(0).toUpperCase()
                          : ""}
                      </p>
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
