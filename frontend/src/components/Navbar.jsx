import React from "react";
import Avatar from "react-avatar";

import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { GrCircleQuestion } from "react-icons/gr";
import { IoSettingsSharp } from "react-icons/io5";
import { TbGridDots } from "react-icons/tb";

const Navbar = () => {
  const user = false;
  return (
    <div className="flex items-center justify-between mx-3 h-16">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <div className="p-2 hover:bg-gray-200 rounded-full cursor-pointer">
            <RxHamburgerMenu />
          </div>
          <img
            className="w-8"
            src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png"
            alt="logo"
          />
          <h1 className="text-2xl text-gray-500 font-medium">Gmail</h1>
        </div>
      </div>
      {user && (
        <>
          <div className="w-[50%] mr-60">
            <div className="flex items-center bg-[#EAF1F8] px-2 py-3 rounded-full">
              <IoIosSearch size={"24px"} className="text-gray-700" />
              <input
                type="text"
                placeholder="Search Mail"
                className="rounded-full w-full bg-transparent outline-none px-1"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <GrCircleQuestion size={"24px"} />
            </div>
            <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <IoSettingsSharp size={"24px"} />
            </div>
            <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <TbGridDots size={"24px"} />
            </div>
            <Avatar
              src="data:image/png;base64,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"
              size="40"
              round={true}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
