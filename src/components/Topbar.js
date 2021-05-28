import React, { useState, useEffect } from "react";
import { ImSearch } from "react-icons/im";
import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import DropDown from "./DropDown";
import { useAuth } from "../context/AuthContext";
import { useCart } from "./../context/CartContext";

const Topbar = (props) => {
  const { currentUser } = useAuth();
  const { getCartItems } = useCart();
  const [itemsInCart, setItemsInCart] = useState();

  useEffect(() => {
    const getItemsNumber = async () => {
      const result = await getCartItems(currentUser.uid);
      setItemsInCart(result.length);
    };

    getItemsNumber();
  }, [currentUser.uid, getCartItems]);

  return (
    <div className="flex justify-between px-4 bg-gray-900 text-white items-center">
      <div className="flex items-center w-96">
        <Link to="/">
          <div className="w-18">
            <img src="/assets/logo.png" alt="" className="h-14" />
          </div>
        </Link>
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
          <div className="bg-yellow-500  h-full w-10 p-3 -mx-8 rounded-r-lg hover:bg-yellow-600 cursor-pointer">
            <ImSearch size="20" />
          </div>
        </div>
      </div>
      <div className="w-56 mx-20">
        <DropDown />
      </div>
      <div className="px-10">
        <Link
          to={`/cart/${currentUser.uid}`}
          className="ralative cursor-pointer"
        >
          <BiCart size="35" />
          <div className="absolute top-0 mx-3 text-yellow-500 font-bold">
            <p>{itemsInCart}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
