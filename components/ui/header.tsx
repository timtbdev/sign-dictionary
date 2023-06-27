"use client";

import { cn, shimmer, toBase64 } from "@/lib/utils";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, FC} from "react";

interface HeaderProps {
  userImage: string;
  userImageCaption: string;
}

export const Header: FC<HeaderProps> = ({userImage, userImageCaption}) => {
  return (
    <div className="max-w-3xl mx-auto p-5 flex items-center justify-between">
      <Link
        href="/"
        className="text-base font-semibold leading-6 text-gray-900"
      >
        SignApp
      </Link>
      <div className="mt-3 sm:ml-4 sm:mt-0">
        {/* Profile dropdown */}
        <Menu as="div" className="relative ml-3 place-items-end">
          <div>
            <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span className="sr-only">Open user menu</span>

              <Image
                className="h-8 w-8 rounded-full"
                height={32}
                width={32}
                src={userImage}
                alt={userImageCaption}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(32, 32)
                )}`}
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/user-profile"
                    className={cn(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Profile
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/saved"
                    className={cn(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Saved
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() => {}}
                    className={cn(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Sign out
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};
