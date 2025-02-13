

import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import Image from "next/image";
import JWT from "@/utils/jwt.util";

const Sidebar = ({ routes }) => {
  const router = useRouter();
  const user = useSelector((state) => state?.auth);
  const routes_result = [];
  const jwt = new JWT();
  routes.forEach(route => {
    if(jwt.isAccessAllowedNumber(route.Access)){
      routes_result.push(route)
    }
  });
  const isActive = (href) => {
    return router.pathname === href ? "bg-primary dark:bg-blue-500 text-white" : "";
  };

  return (
    <div className="w-full h-full flex flex-col gap-y-2 ">
      <div className="flex flex-col gap-y-1 overflow-y-auto scrollbar-hide">
        {routes_result.map((route, index) => (
          <Link
            key={index}
            href={route.path}
            className={
              "flex flex-row gap-x-2  items-center px-4 py-2   hover:text-white dark:hover:bg-blue-500 link-hover transition-colors rounded text-sm" +
              " " +
              isActive(route.path)
            }
          >
            {route.icon}
            {route.name}
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-y-2 mt-auto">
        <div
          className="px-4 py-2 flex flex-row gap-x-2 hover:bg-primary hover:text-white transition-colors rounded cursor-pointer"
          onClick={() => {
            localStorage.removeItem("accessToken");
            window.open("/", "_self");
          }}
        >
         <Image
  src={user?.avatar?.url || "/placeholder.png"} 
  alt={user?.avatar?.public_id || "User Avatar"}
  height={100}
  width={100}
  className="rounded-full object-cover w-[35px] h-[35px]"
/>
          <article className="flex flex-col gap-y-0.5">
            <h2 className="line-clamp-1 text-base">{user?.name}</h2>
            <span className="text-xs">خروج</span>
          </article>
        </div>
        <Link
          href="/"
          className="flex flex-row gap-x-2 items-center px-4 py-2 hover:bg-primary hover:text-white transition-colors rounded text-sm !dark:hover:bg-blue-500"
        >
          <IoHomeOutline className="w-4 h-4" />
          خانه
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
