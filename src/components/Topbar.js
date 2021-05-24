import React from "react";
import { ImSearch } from "react-icons/im";
import { BiCart } from "react-icons/bi";

import DropDown from "./DropDown";

const Topbar = (props) => {
  return (
    <div className="flex justify-between px-4 bg-gray-900 text-white items-center">
      <div className="flex items-center w-96">
        <div className="w-18">
          <img src="/assets/logo.png" alt="" className="h-14" />
        </div>
        <div className="flex flex-col mx-5 w-5">
          <p>{props.AddressLline2}</p>
        </div>
      </div>
      <div className="w-full ">
        <div className="px-2 flex items-center">
          <input
            className="w-full px-2 mx-4  py-2 rounded-xl text-black focus:outline-none focus:ring-2 ring-yellow-400 ring-opacity-80  "
            type="text"
          />
          <div className="bg-yellow-500 h-10 w-10 p-3 -mx-8 rounded-r-lg hover:bg-yellow-600 cursor-pointer">
            <ImSearch size="20" />
          </div>
        </div>
      </div>
      <div className="w-56 mx-20">
        <DropDown userName="yashu" />
      </div>
      <div className="px-10">
        <div className="ralative">
          <BiCart size="35" />
          <div className="absolute top-0 mx-3 text-yellow-500 font-bold">
            <p>5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
