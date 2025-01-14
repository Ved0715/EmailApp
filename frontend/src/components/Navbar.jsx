import React from "react";
import Avatar from "react-avatar";

import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { GrCircleQuestion } from "react-icons/gr";
import { IoSettingsSharp } from "react-icons/io5";
import { TbGridDots } from "react-icons/tb";
import { useSelector } from "react-redux";
import store from "../redux/store";

const Navbar = () => {
  const {user} = useSelector(store => store.app);
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
              src= {user.profilePhoto}
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
