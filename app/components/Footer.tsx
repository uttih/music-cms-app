import Link from "next/link";
import React from "react";
import { FcMusic } from "react-icons/fc";

const Footer = () => {
  return (
    <footer className="bg-gray-100 shadow-inner mt-10">
      <nav className="flex flex-col items-center justify-between p-4 text-sm">
        <div className="flex mb-4">
          <Link href={"/"} className="flex items-center text-black">
            <FcMusic className="w-6 h-6" />
            <span className="ml-2 font-serif">Music-cms.com</span>
          </Link>
        </div>
        <div className="flex gap-4 mb-4">
          <Link href="/" className="text-black hover:text-gray-700">
            ホーム
          </Link>
          <Link
            href="https://github.com/uttih"
            className="text-black hover:text-gray-700"
          >
            Github
          </Link>
        </div>
        <div className="text-black">
          &copy; {new Date().getFullYear()} Music-cms.com. All rights reserved.
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
