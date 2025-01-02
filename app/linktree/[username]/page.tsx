"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store/store";
import Link from "next/link";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import {
  getCurrentUsersLinks,
  getUserSocialLinksById,
} from "@/app/utiles/services/login.service";
import axios from "axios";

interface SocialLink {
  active: boolean;
  platform: string;
  url: string;
  user: string;
  __v: number;
  _id: string;
}

const page = () => {
  const param = useParams();
  const [userProfile, setUserProfile] = useState<{
    username: string;
    email: string;
    _id: string;
    __v: number;
  }>();
  const [socialLinks, setSocialLinks] = useState<[]>([]);

  const currentUserData = async () => {
    if (typeof param?.username === "string") {
      try {
        const UserSocialLinks = await getCurrentUsersLinks({
          username: param.username,
        });

        if (UserSocialLinks?._id) {
          setUserProfile(UserSocialLinks);
          console.log(UserSocialLinks);

          await getUserSocialLinksById(UserSocialLinks._id);
        } else {
          console.error("No user ID found in response");
        }
      } catch (error) {
        console.error("Error fetching user social links:", error);
      }
    } else {
      console.error("Invalid username parameter:", param?.username);
    }
  };

  const getUserSocialLinksById = async (id: any) => {
    if (!id) {
      console.error("No user ID provided");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/social-links/all-socials/${id}`
      );
      setSocialLinks(response.data);
      console.log("Social links fetched:", response.data);
    } catch (error) {
      console.error("Error fetching user social links:", error);
      throw error;
    }
  };

  useEffect(() => {
    currentUserData();
  }, []);

  return (
    <>
      <div className="h-screen  flex flex-col items-center py-10 bg-black">
        <div className="w-[650px]">
          <div className="flex items-center flex-col gap-3 mb-10">
            <div className="rounded-full bg-[#F5F6F8] h-24 w-24 flex items-center justify-center text-white">
              <p className="text-2xl font-bold text-black">
                {" "}
                {userProfile?.username
                  ? userProfile.username.charAt(0).toUpperCase()
                  : ""}
              </p>
            </div>
            <div>
              <p className="font-bold text-white text-2xl">
                @{userProfile?.username}
              </p>
            </div>
          </div>
          <div className="w-full">
            {socialLinks &&
              socialLinks
                .filter((link: SocialLink) => link.active)
                .map((link: SocialLink) => (
                  <Link href={link.url} target="_blank" key={link._id}>
                    <div className="mt-2 scale-90 hover:scale-100 transition-transform duration-300 ease-in-out">
                      <div className="py-6 bg-[#222222] text-white text-lg font-medium text-center rounded-xl">
                        <p>{link.platform}</p>
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
