import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store/store";
import Link from "next/link";
import React, { useEffect } from "react";
import { CiShare2 } from "react-icons/ci";

interface AdminPhoneViewProps {
  username?: string;
}
const AdminPhoneView: React.FC<AdminPhoneViewProps> = ({ username }) => {
  const socialLinks = useAppSelector(
    (state: RootState) => state.socialLinks.socialLinks
  );
  const UsersAvatar = useAppSelector(
    (state: RootState) => state.userAvatar.Avatar
  );

  useEffect(() => {
    console.log("admin phone view", socialLinks);
  }, [socialLinks]);
  return (
    <>
      <div className="border-l h-screen w-full ">
        <div className="py-3 flex justify-end px-5">
          <div className="shadow-lg cursor-pointer rounded-full flex justify-center py-3 w-32 bg-white text-black">
            <button className="flex items-center gap-3 font-semibold text-lg">
              <CiShare2 className="text-xl font-semibold" /> Share
            </button>
          </div>
        </div>
        {/* mobile  */}
        <div className="flex justify-center items-center mt-16">
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.2) 0px 20px 30px",
            }}
            className="border-[5.2px]  border-white rounded-e-[40px] rounded-s-[40px] h-[680px] w-[322px] "
          >
            <div className="bg-black h-full flex flex-col pt-20 rounded-e-[35px] rounded-s-[35px]">
              <div>
                <div className="flex flex-col items-center gap-3 mb-5">
                  <div className="rounded-full h-20 w-20 bg-white flex items-center justify-center">
                    {UsersAvatar && UsersAvatar.key ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={UsersAvatar.key}
                        alt="User Avatar"
                        className="rounded-full h-full w-full object-cover"
                      />
                    ) : (
                      <p className="font-bold text-xl">
                        {username ? username.charAt(0).toUpperCase() : ""}
                      </p>
                    )}
                  </div>
                  <div className="text-white font-semibold">
                    <p>@{username}</p>
                  </div>
                </div>
                {socialLinks
                  ?.filter((link) => link.active)
                  .map((link, i) => (
                    <Link href={link.url} target="_blank" key={link._id}>
                      <div className="px-2 scale-90 hover:scale-100 transition-transform duration-300 ease-in-out">
                        <div className="py-4 bg-[#222222] text-white text-sm font-medium text-center rounded-xl">
                          <p>{link.platform}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPhoneView;
