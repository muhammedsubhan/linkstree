import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store/store";
import React, { useEffect } from "react";
import { CiShare2 } from "react-icons/ci";

const AdminPhoneView = () => {
  const socialLinks = useAppSelector(
    (state: RootState) => state.socialLinks.socialLinks
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
                    <p className="font-bold text-xl">M</p>
                  </div>
                  <div className="text-white font-semibold">
                    <p>@MuhammadSubhan</p>
                  </div>
                </div>
                <div className="px-5">
                  <div className="border-2 border-red-300 py-5 rounded-xl">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPhoneView;
