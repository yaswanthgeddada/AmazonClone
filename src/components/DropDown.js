import React from "react";

import { Menu } from "@headlessui/react";

const DropDown = ({ userName }) => {
  return (
    <div>
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <Menu.Button
            type="button"
            class="inline-flex justify-center w-full   shadow-sm px-4 py-2  text-sm font-medium text-gray-300  focus:outline-none"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            Hello {userName}
            <svg
              class="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </Menu.Button>
        </div>

        <Menu.Items
          class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          <div class="py-1" role="none">
            <a
              href="/"
              class="text-gray-700 block px-4 py-2 text-sm hover:bg-yellow-300"
              role="menuitem"
              tabindex="-1"
              id="menu-item-0"
            >
              Account settings
            </a>
            <a
              href="/"
              class="text-gray-700 block px-4 py-2 text-sm  hover:bg-yellow-300"
              role="menuitem"
              tabindex="-1"
              id="menu-item-1"
            >
              Orders
            </a>
            <a
              href="/"
              class="text-gray-700 block px-4 py-2 text-sm hover:bg-yellow-300"
              role="menuitem"
              tabindex="-1"
              id="menu-item-2"
            >
              Wish List
            </a>

            <button
              class="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-yellow-300"
              role="menuitem"
              tabindex="-1"
              id="menu-item-3"
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
