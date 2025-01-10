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

import jwt from "jsonwebtoken";
import { useClipboard } from "use-clipboard-copy";
import Image from "next/image";
import {
  getAvatarByUsersId,
  handleUploadUserAvatar,
} from "@/app/utiles/services/login.service";
import { toast } from "react-toastify";
import {
  Avatar,
  setAvatar,
} from "@/app/lib/store/features/avatarSlice/AvatarSlice";

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
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const [avatar, setAvatarState] = useState<string>();
  const [uploading, setUploading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const socialLinks = useAppSelector(
    (state: RootState) => state.socialLinks.socialLinks
  );

  const UsersAvatar = useAppSelector(
    (state: RootState) => state.userAvatar.Avatar
  );

  const clipboard = useClipboard();

  const handleAddClick = async () => {
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

    try {
      const createdLink = await createSocialLinks(newLink);

      if (createdLink) {
        dispatch(addSocialLinkSuccess(createdLink));
      } else {
        console.error("Failed to create social link");
      }
    } catch (error) {
      console.error("Error creating social link:", error);
    }
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

      try {
        const updatedSocialsData = await updateSocialLinksData(updatedData);
        console.log("Updated socials data:", updatedSocialsData);
      } catch (error) {
        console.error("Error updating social link:", error);
      }
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

  const handleCopy = () => {
    const url = `http://localhost:3000/linktree/${decodedData?.username}`;
    clipboard.copy(url);
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 2000);
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
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setAvatarState(reader.result as string);
      };

      reader.readAsDataURL(file);

      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      if (decodedData?._id) {
        formData.append("userId", decodedData._id);
      } else {
        console.error("User ID is missing");
        return;
      }

      try {
        const response = await handleUploadUserAvatar(formData);
        console.log("Upload Response:", response);

        if (response) {
          const avatarData = {
            key: response?.key,
            message: "Image uploaded successfully",
          };
          dispatch(setAvatar(avatarData));
          localStorage.setItem("avatarUrl", JSON.stringify(response?.key));
        }
      } catch (error) {
        console.error("Error uploading avatar:", error);
      } finally {
        setUploading(false);
      }
    }
  };
  const getCurrentUsersAvatar = async () => {
    try {
      if (decodedData?._id) {
        const response = await getAvatarByUsersId(decodedData._id);
        console.log("Avatar Response backend:", response);

        if (response) {
          const avatarData: Avatar = {
            key: response,
            message: "Image fetched successfully"
          };
          
          dispatch(setAvatar(avatarData));
        } else {
          console.error("Avatar key is missing in the response");
        }
      } else {
        console.error("User ID is missing");
      }
    } catch (error) {
      console.error("Error fetching avatar:", error);
    }
  };

  useEffect(() => {
    if (decodedData?._id) {
      getCurrentUsersAvatar();
    } else {
      console.log("User ID is not available");
    }
  }, [decodedData]);

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
          <div className="bg-white py-3 px-4 rounded-full" onClick={handleCopy}>
            <button className="font-semibold">
              {" "}
              {isCopied ? "Copied!" : "Copy your Linktree URL"}
            </button>
          </div>
        </div>
      </div>

      <div className="py-5 px-2 flex items-center justify-around">
        <div className="flex items-center gap-3">
          {/* users avatar / profile image */}
          <div className="relative rounded-full bg-black text-white flex items-center justify-center w-[70px] h-[70px]">
            {UsersAvatar && UsersAvatar.key ? (
              // eslint-disable-next-line @next/next/no-img-element
              <Image
                src={UsersAvatar.key}
                alt="User Avatar"
                fill
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <div className="text-xl flex items-center justify-center text-white">
                <p>@</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              id="avatar-upload"
              className="hidden"
              onChange={handleAvatarUpload}
            />
            <div
              className="absolute -bottom-1 -right-1 bg-white text-black rounded-full px-2 py-2 cursor-pointer"
              onClick={() => document.getElementById("avatar-upload")?.click()}
            >
              <GoPencil className="text-lg text-[#A8AAA2]" />
            </div>
            {uploading && (
              <p className="absolute bottom-[-20px] text-sm text-gray-600">
                Uploading...
              </p>
            )}
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
                          {item.url.length > 20
                            ? `${item.url.substring(0, 20)}...`
                            : item.url}
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
