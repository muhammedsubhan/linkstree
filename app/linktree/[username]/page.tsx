"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getCurrentUsersLinks } from "@/app/utiles/services/login.service";
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
    avatar: string;
  }>();
  const [socialLinks, setSocialLinks] = useState<[]>([]);
  const [loading, setLoading] = useState(true);

  const currentUserData = async () => {
    if (typeof param?.username === "string") {
      try {
        setLoading(true);
        const UserSocialLinks = await getCurrentUsersLinks({
          username: param?.username,
        });

        if (UserSocialLinks?._id) {
          setUserProfile(UserSocialLinks);
          console.log(UserSocialLinks);

          await getUserSocialLinksById(UserSocialLinks?._id);
        } else {
          console.error("No user ID found in response");
        }
      } catch (error) {
        console.error("Error fetching user social links:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Invalid username parameter:", param?.username);
    }
    setLoading(false);
  };

  const getUserSocialLinksById = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/social-links/all-socials`
      );

      const filteredLinks = response.data.filter((link: SocialLink) => {
        return String(link.user) === String(userId);
      });

      console.log("Filtered links:", filteredLinks);
      setSocialLinks(filteredLinks);
    } catch (error) {
      console.error("Error fetching user social links:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    currentUserData();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-black">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="spinner-border animate-spin border-t-4 border-b-4 border-purple-500 rounded-full w-16 h-16"></div>
          </div>
        ) : (
          <div className="h-screen  flex flex-col items-center py-10 bg-black">
            <div className="w-[650px]">
              <div className="flex items-center flex-col gap-3 mb-10">
                <div className="rounded-full bg-[#F5F6F8] h-24 w-24 flex items-center justify-center text-white">
                  {userProfile && userProfile.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`https://linktree-bucket.s3.us-east-1.amazonaws.com/${userProfile.avatar}`}
                      alt="User Avatar"
                      className="rounded-full  h-24 w-24  object-cover"
                    />
                  ) : (
                    <p className="text-2xl font-bold text-black">
                      {" "}
                      {userProfile?.username
                        ? userProfile.username.charAt(0).toUpperCase()
                        : ""}
                    </p>
                  )}
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
        )}
      </div>
    </>
  );
};

export default page;
