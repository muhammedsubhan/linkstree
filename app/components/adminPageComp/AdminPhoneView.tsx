import React from "react";
import { CiShare2 } from "react-icons/ci";

const AdminPhoneView = () => {
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
        <div></div>
      </div>
    </>
  );
};

export default AdminPhoneView;
