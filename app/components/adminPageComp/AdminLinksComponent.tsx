"use client";

import Link from "next/link";
import React, { useState } from "react";
import { PiInstagramLogoThin } from "react-icons/pi";
import { PiPlusLight } from "react-icons/pi";
import { GoPencil } from "react-icons/go";
import { PiTiktokLogoThin } from "react-icons/pi";
import { PiYoutubeLogoThin } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import SwitchToggle from "@/app/MUI/SwitchToggle";

const AdminLinksComponent = () => {
  const [isAddBtn, setIsAddBtn] = useState<boolean>(false);
  const [data, setData] = useState<
    { id: number; title: string; url: string }[]
  >([]);

  const handleAddClick = () => {
    setIsAddBtn(true);
    setData((prevData) => [
      ...prevData,
      { id: prevData.length + 1, title: "", url: "" },
    ]);
  };

  return (
    <>
      <div className="px-5 h-screen">
        <div className="py-3 px-5 bg-[#DFE8F9] my-2 rounded-3xl">
          <div className="flex items-center justify-between">
            <p className="font-medium">
              🔥 Your Linktree is live:{" "}
              <Link href="#" className="font-normal underline text-purple-950">
                linktree/MuhammadSubhan
              </Link>
            </p>
            <div className="bg-white py-3 px-4 rounded-full">
              <button className="font-semibold">Copy your Linktree URL</button>
            </div>
          </div>
        </div>
        <div className="py-5 px-2 flex items-center justify-around">
          <div className="flex items-center gap-3">
            <div className="relative rounded-full bg-black text-white flex items-center justify-center w-[70px] h-[70px]">
              <p className="font-semibold text-lg">@</p>
              <div className="absolute -bottom-1 -right-1 bg-white text-black rounded-full px-2 py-2">
                <GoPencil className="text-lg text-[#A8AAA2]" />
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-lg">@MuhammadSubhan</p>
                  <p className="text-sm font-medium text-[#A9ABA3]">Add bio</p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="relative w-10">
                    <PiInstagramLogoThin className="text-3xl text-[#A8AAA2]" />
                    <div className="absolute -top-1 right-0 rounded-full h-5 w-5 text-base border bg-white text-[#A8AAA2] flex items-center justify-center">
                      <PiPlusLight />
                    </div>
                  </div>
                  <div className="relative w-10">
                    <PiTiktokLogoThin className="text-3xl text-[#A8AAA2]" />
                    <div className="absolute -top-1 right-0 rounded-full h-5 w-5 text-base border bg-white text-[#A8AAA2] flex items-center justify-center">
                      <PiPlusLight />
                    </div>
                  </div>
                  <div className="relative w-10">
                    <PiYoutubeLogoThin className="text-3xl text-[#A8AAA2]" />
                    <div className="absolute -top-1 right-0 rounded-full h-5 w-5 text-base border bg-white text-[#A8AAA2] flex items-center justify-center">
                      <PiPlusLight />
                    </div>
                  </div>
                  <div className="rounded-full h-8 w-8 text-lg border bg-[#E7E9E2] text-black flex items-center justify-center">
                    <PiPlusLight />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="rounded-full h-10 w-10 text-lg border bg-[#E7E9E2] text-black flex items-center justify-center">
              <BsThreeDots className="text-2xl" />
            </div>
          </div>
        </div>
        <div className="flex justify-center py-1">
          <div className="flex flex-col h-full">
            <div
              onClick={handleAddClick}
              className="cursor-pointer bg-purple-600 hover:bg-purple-700 flex justify-center w-[700px] h-[50px] text-white text-center rounded-full"
            >
              <button className="flex items-center font-semibold">
                <PiPlusLight className="text-xl mr-2" /> Add
              </button>
            </div>

            {isAddBtn &&
              data.map((item, index) => (
                <div
                  key={item.id}
                  className="w-[700px] h-full bg-white py-5 rounded-3xl shadow-md mt-10"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center px-10">
                      <input
                        type="text"
                        className="w-20"
                        value={item.title}
                        placeholder={`Title ${index + 1}`}
                        onChange={(e) =>
                          setData((prev) =>
                            prev.map((d) =>
                              d.id === item.id
                                ? { ...d, title: e.target.value }
                                : d
                            )
                          )
                        }
                      />
                      <GoPencil className="text-base text-black" />
                    </div>
                    <div className="flex items-center justify-between px-10">
                      <div className="flex items-center">
                        <input
                          type="text"
                          className="w-20"
                          value={item.url}
                          placeholder={`URL ${index + 1}`}
                          onChange={(e) =>
                            setData((prev) =>
                              prev.map((d) =>
                                d.id === item.id
                                  ? { ...d, url: e.target.value }
                                  : d
                              )
                            )
                          }
                        />
                        <GoPencil className="text-base text-black" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <SwitchToggle />
                        <AiOutlineDelete
                          className="text-2xl cursor-pointer"
                          onClick={() =>
                            setData((prev) =>
                              prev.filter((d) => d.id !== item.id)
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLinksComponent;
