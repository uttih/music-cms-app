import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../lib/next-auth/options";
import { User } from "../types/types";
import { FcMusic } from "react-icons/fc";
import { FaHome } from "react-icons/fa";

const Header = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;
  //console.log(user);

  return (
    <header className=" text-gray-100 shadow-lg">
      <nav className="flex items-center justify-between p-4">
        <Link
          href={"/"}
          className="text-xl font-medium flex items-center text-black"
        >
          <FcMusic className="w-8 h-8" />
          <span className="ml-2 font-serif">Music-CMS</span>
        </Link>
        <div className="flex-grow mx-4 max-w-md">
          <input
            type="text"
            placeholder="商品を検索...."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="text-black  hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
          >
            <FaHome className="w-8 h-8" />
            <span className="ml-2 font-serif">ホーム</span>
          </Link>
          <Link
            href={user ? "/profile" : "/api/auth/signin"}
            className="text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            <span className="ml-2 font-serif">
              {user ? "プロフィール" : "ログイン"}
            </span>
          </Link>
          {user ? (
            <Link
              href={"/api/auth/signout"}
              //onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              <span className="ml-2 font-serif">ログアウト</span>
            </Link>
          ) : (
            ""
          )}

          <Link href={`/profile`}>
            <Image
              width={50}
              height={50}
              alt="profile_icon"
              src={user?.image || "/default_icon.png"}
              className="rounded-full"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
