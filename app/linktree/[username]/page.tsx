"use client";
import React, { useEffect } from "react";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store/store";
import Link from "next/link";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { getCurrentUsersLinks } from "@/app/utiles/services/login.service";

const page = () => {
  const param = useParams();
  console.log(param);

  // const socialLinks = useAppSelector(
  //   (state: RootState) => state.socialLinks.socialLinks
  // );

  const currentUserData = async () => {
    if (typeof param?.username === "string") {
      try {
        const UserSocialLinks = await getCurrentUsersLinks({
          username: param.username,
        });
        console.log("ehehehhhheh", UserSocialLinks);
      } catch (error) {
        console.error("Error fetching user social links:", error);
      }
    } else {
      console.error("Invalid username parameter:", param?.username);
    }
  };

  useEffect(() => {
    currentUserData();
  }, []);

  const socialLinks = [
    {
      active: true,
      platform: "Instagram",
      url: "https://www.instagram.com/whoissubhanbytheway/",
      user: "676fd50f6c9e982f7e0d38b1",
      __v: 0,
      _id: "6772c0f008f7dc1ra30bde9d2",
    },
    {
      active: true,
      platform: "Instagram",
      url: "https://www.instagram.com/whoissubhanbytheway/",
      user: "676fd50f6c9e982f7e0d38b1",
      __v: 0,
      _id: "6772c0f008f7dqc1a30bde9d2",
    },
    {
      active: true,
      platform: "Instagram",
      url: "https://www.instagram.com/whoissubhanbytheway/",
      user: "676fd50f6c9e982f7e0d38b1",
      __v: 0,
      _id: "6772c0f008f7sdc1a30bde9d2",
    },
    {
      active: true,
      platform: "Instagram",
      url: "https://www.instagram.com/whoissubhanbytheway/",
      user: "676fd50f6c9e982f7e0d38b1",
      __v: 0,
      _id: "6772c0f0q08f7dc1a30bde9d2",
    },
  ];

  return (
    <>
      <div className="h-screen  flex flex-col items-center py-10 bg-black">
        <div className="w-[650px]">
          <div className="flex items-center flex-col gap-3 mb-10">
            <div className="rounded-full bg-[#F5F6F8] h-24 w-24 flex items-center justify-center text-white">
              <p className="text-2xl font-bold text-black">M</p>
            </div>
            <div>
              <p className="font-bold text-white text-2xl">@MuhammadSubhan</p>
            </div>
          </div>
          <div className="w-full">
            {socialLinks
              ?.filter((link) => link.active)
              .map((link, i) => (
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
