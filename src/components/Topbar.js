import React, { useEffect, useState } from "react";
import { ImSearch } from "react-icons/im";
import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import DropDown from "./DropDown";
import { useAuth } from "../context/AuthContext";
import { useCart } from "./../context/CartContext";

const Topbar = (props) => {
  const { currentUser } = useAuth();
  const { getCartItems, cartItemsLength, setCartItemsLength } = useCart();
  const [searchTerm, setSerachTem] = useState("");

  useEffect(() => {
    const getItemsNumber = async () => {
      const result = await getCartItems(currentUser.uid);
      setCartItemsLength(result.length);
    };

    getItemsNumber();
  }, [currentUser.uid, getCartItems, setCartItemsLength]);

  return (
    <div className="flex justify-between px-4 mx-0 bg-gray-900 text-white items-center">
      <div className="md:flex md:items-center sm:hidden ">
        <Link to="/">
          <div className="object-contain">
            <img
              src="/assets/logo.png"
              alt=""
              className="h-14 object-contain w-56"
            />
          </div>
        </Link>
        <div className="flex flex-col mx-5 w-5">
          <p>{props.AddressLline2}</p>
        </div>
      </div>
      <div className="w-full md:flex md:flex-col hidden">
        <div className="px-2 flex items-center">
          <input
            onChange={(e) => setSerachTem(e.target.value)}
            className="sm:w-1/4 md:w-full px-2 mx-4  py-2 rounded-xl text-black focus:outline-none focus:ring-2 ring-yellow-400 ring-opacity-80  "
            type="text"
            value={searchTerm}
          />
          <Link
            to={`/search/${searchTerm}`}
            className="bg-yellow-500  h-full w-10 p-3 -mx-8 rounded-r-lg hover:bg-yellow-600 cursor-pointer"
          >
            <ImSearch size="20" />
          </Link>
        </div>
      </div>
      <div className="md:w-56 md:mx-20">
        <DropDown />
      </div>
      <div className="px-10">
        <Link
          to={`/cart/${currentUser.uid}`}
          className="ralative cursor-pointer"
        >
          <BiCart size="35" />
          <div className="absolute top-0 mx-3 text-yellow-500 font-bold">
            <p>{cartItemsLength}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
