import Link from "next/link";
import React from "react";

const AdminLinksComponent = () => {
  return (
    <>
      <div className="border-2 border-red-600 px-5">
        <div className=" py-3 px-5 bg-[#DFE8F9] my-2 rounded-3xl">
          <div className="flex items-center justify-between">
            <p className="font-medium ">
              🔥 Your Linktree is live:{" "}
              <Link href="#" className="font-normal underline  text-purple-950">
                linktree/MuhammadSubhan
              </Link>
            </p>
            <div className="bg-white py-3 px-4 rounded-full">
              <button className="font-semibold">Copy your Linktree URL</button>
            </div>
          </div>
        </div>
        <div>
            l
        </div>
      </div>
    </>
  );
};

export default AdminLinksComponent;
