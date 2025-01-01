"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PiInstagramLogoThin } from "react-icons/pi";
import { PiPlusLight } from "react-icons/pi";
import { GoPencil } from "react-icons/go";
import { PiTiktokLogoThin } from "react-icons/pi";
import { PiYoutubeLogoThin } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import SwitchToggle from "@/app/MUI/SwitchToggle";
import {
  createSocialLinks,
  deleteSocialLinksData,
  fetchAllSocialLinks,
  getAllSocialLinks,
  updateSocialLinksData,
} from "@/app/utiles/services/socialLinks.service";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store/store";
import {
  addSocialLinkStart,
  addSocialLinkSuccess,
  removeSocialLink,
  SocialLink,
  updateSocialLink,
} from "@/app/lib/store/features/sociallinks/SocialLinksSlice";
import axios from "axios";
import Cookies from "js-cookie";
import jwt, { JwtPayload } from "jsonwebtoken";

const AdminLinksComponent = () => {
  const [decodedData, setDecodedData] = useState<{
    email: string;
    _id: string;
    iat: number;
    exp: number;
    username?: string;
  }>();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<"platform" | "url" | null>(
    null
  );
  const [tempValue, setTempValue] = useState<string>("");

  const dispatch = useAppDispatch();
  const socialLinks = useAppSelector(
    (state: RootState) => state.socialLinks.socialLinks
  );

  const handleAddClick = () => {
    if (!decodedData?._id) {
      console.error("User ID is missing");
      return;
    }

    dispatch(addSocialLinkStart());

    const newLink: SocialLink = {
      userId: decodedData._id,
      platform: "defaultPlatform",
      url: "http://default.url",
      active: false,
      _id: "",
    };

    createSocialLinks(newLink);
    dispatch(addSocialLinkSuccess(newLink));
  };

  const handleEditStart = (
    id: string,
    field: "platform" | "url",
    value: string
  ) => {
    setEditingId(id);
    setEditingField(field);
    setTempValue(value);
  };

  const handleEditComplete = (id: string, field: "platform" | "url") => {
    if (editingId && editingField) {
      handleUpdateLink(id, field, tempValue);
      setEditingId(null);
      setEditingField(null);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    id: string,
    field: "platform" | "url"
  ) => {
    if (e.key === "Enter") {
      handleEditComplete(id, field);
    }
    if (e.key === "Escape") {
      setEditingId(null);
      setEditingField(null);
    }
  };

  const handleUpdateLink = async (
    id: string,
    field: "platform" | "url" | "active",
    value: string | boolean
  ) => {
    const updatedLink = socialLinks.find((link) => link._id === id);
    if (updatedLink) {
      const updatedData = { ...updatedLink, [field]: value };
      dispatch(updateSocialLink(updatedData));
      const updatedSocialsData = await updateSocialLinksData(updatedData);
    } else {
      console.error(`Social link with _id ${id} not found`);
    }
  };

  const handleRemoveLink = async (id: string) => {
    const linkToRemove = socialLinks.find((link) => link._id === id);
    if (linkToRemove) {
      dispatch(removeSocialLink(id));
      const deletedataSocialLinks = await deleteSocialLinksData(id);
      console.log(deletedataSocialLinks);
    } else {
      console.error(`Social link with _id ${id} not found`);
    }
  };

  const fetchSocialLinks = async () => {
    try {
      const data = await fetchAllSocialLinks();
      dispatch(addSocialLinkSuccess(data));
    } catch (error) {
      console.error("Error fetching social links:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchSocialLinks();
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
        };
        setDecodedData(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.log("No access token found");
    }
  }, []);

  return (
    <div className="px-5 h-screen">
      <div className="py-3 px-5 bg-[#DFE8F9] my-2 rounded-3xl">
        <div className="flex items-center justify-between">
          <p className="font-medium">
            🔥 Your Linktree is live:{" "}
            <Link
              href={`/linktree/${decodedData?.username}`}
              className="font-normal underline text-purple-950"
            >
              {`linktree/${decodedData?.username}`}
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
                <p className="font-semibold text-lg">
                  @{decodedData?.username}
                </p>
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

          {socialLinks.map((item, index) => (
            <div
              key={`${item.platform}-${index}`}
              className="w-[700px] h-full bg-white py-5 rounded-3xl shadow-md mt-6 "
            >
              <div className="flex items-center justify-between px-10 ">
                <div className="flex flex-col gap-2  py-4 w-full ">
                  <div className="flex items-center  ">
                    {editingId === item._id && editingField === "platform" ? (
                      <input
                        type="text"
                        className="min-w-[100px] w-auto px-0 py-0 border-none focus:outline-none rounded "
                        value={tempValue}
                        name="platform"
                        placeholder={`Platform ${index + 1}`}
                        onChange={(e) => setTempValue(e.target.value)}
                        onBlur={() => handleEditComplete(item._id, "platform")}
                        onKeyDown={(e) =>
                          handleKeyDown(e, item._id, "platform")
                        }
                        autoFocus
                      />
                    ) : (
                      <div className="flex items-center gap-2 w-full">
                        <span
                          className="min-w-[100px] w-auto break-words cursor-pointer"
                          onClick={() =>
                            handleEditStart(item._id, "platform", item.platform)
                          }
                        >
                          {item.platform}
                        </span>
                        <GoPencil
                          className="text-base text-black cursor-pointer flex-shrink-0"
                          onClick={() =>
                            handleEditStart(item._id, "platform", item.platform)
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* <div className="flex items-center justify-between px-10"> */}
                  <div className="flex items-center">
                    {editingId === item._id && editingField === "url" ? (
                      <input
                        type="text"
                        className="min-w-[100px] w-auto px-0 py-0 border-none focus:outline-none rounded "
                        value={tempValue}
                        name="url"
                        placeholder={`URL ${index + 1}`}
                        onChange={(e) => setTempValue(e.target.value)}
                        onBlur={() => handleEditComplete(item._id, "url")}
                        onKeyDown={(e) => handleKeyDown(e, item._id, "url")}
                        autoFocus
                      />
                    ) : (
                      <div className="flex items-center gap-2 w-full">
                        <span
                          className="min-w-[200px] w-auto break-words cursor-pointer"
                          onClick={() =>
                            handleEditStart(item._id, "url", item.url)
                          }
                        >
                          {item.url}
                        </span>
                        <GoPencil
                          className="text-base text-black cursor-pointer flex-shrink-0"
                          onClick={() =>
                            handleEditStart(item._id, "url", item.url)
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2  py-6 ">
                  <SwitchToggle
                    status={item.active}
                    onChange={(checked) =>
                      handleUpdateLink(item._id, "active", checked)
                    }
                  />
                  <AiOutlineDelete
                    className="text-2xl cursor-pointer"
                    onClick={() => handleRemoveLink(item._id)}
                  />
                </div>
                {/* </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminLinksComponent;
