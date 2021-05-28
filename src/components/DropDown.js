import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { Menu } from "@headlessui/react";
import { useAuth } from "./../context/AuthContext";
import { useUser } from "./../context/UserContext";

const DropDown = () => {
  const history = useHistory();
  const { logout, currentUser } = useAuth();
  const { getCurrentUserProfile } = useUser();

  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    const res = async () => {
      const result = await getCurrentUserProfile(currentUser.uid);
      console.log(result[0]);
      setUserProfile(result[0]);
    };

    res();
  }, [currentUser, getCurrentUserProfile]);

  const logoutHandler = async () => {
    await logout();
    history.push("/login");
  };

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            type="button"
            className="inline-flex justify-center w-full   shadow-sm px-4 py-2  text-sm font-medium text-gray-300  focus:outline-none"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            Hello {userProfile?.userName}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Menu.Button>
        </div>

        <Menu.Items
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <Link
              to="/profile"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-yellow-300"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              Account settings
            </Link>

            {userProfile?.role === "Seller" && (
              <Link
                to={`/product-management/${currentUser.uid}`}
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-yellow-300"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-0"
              >
                Manage Products
              </Link>
            )}

            <a
              href="/orders"
              className="text-gray-700 block px-4 py-2 text-sm  hover:bg-yellow-300"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-1"
            >
              Orders
            </a>
            <a
              href="/"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-yellow-300"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-2"
            >
              Wish List
            </a>

            <button
              className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-yellow-300"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-3"
              onClick={logoutHandler}
            >
              Sign out
            </button>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default DropDown;
