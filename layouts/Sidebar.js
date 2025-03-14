import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useLogoutMutation } from "@/services/auth/logout";
import toast from "react-hot-toast";

const Sidebar = ({ routes }) => {
  const router = useRouter();
  const admin = useSelector((state) => state?.auth?.admin);
  const user = useSelector((state) => state?.auth?.user);
    const [logout, { isLoading, error, data }] = useLogoutMutation();
  
  const [openSubRoutes, setOpenSubRoutes] = useState({});
  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال خروج ...", { id: "logout" });
    }

    if (data?.success) {
      toast.success(data?.message, { id: "logout" });
      window.location.href = "/";
    }
    if (data && !data?.success) {
      toast.error(data?.message, { id: "logout" });
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "logout" });
    }
  }, [isLoading, data, error]);

  const isActive = (href) => {
    return router.pathname === href ? "bg-primary dark:bg-blue-500 text-white" : "";
  };

  const toggleSubRoutes = (index) => {
    setOpenSubRoutes((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };
  

  const handleRouteClick = (route, index) => {
    if (route.path) {
      router.push(route.path);
    } else {
      toggleSubRoutes(index);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-y-2">
      <div className="flex flex-col gap-y-1 overflow-y-auto scrollbar-hide">
        {routes.map((route, index) => (
          <div key={index}>
            <div
              className="flex flex-row gap-x-2 items-center px-4 py-2 cursor-pointer justify-between hover:text-white link-hover transition-colors rounded text-sm"
              onClick={() => handleRouteClick(route, index)}
            >
              <span className="flex flex-row gap-x-2 items-center">
                {route.icon}
                {route.name}
              </span>
              {route.subRoutes && (
                <FaChevronDown
                  className={`ml-auto w-4 h-4 transition-transform transform ${openSubRoutes[index] ? "rotate-180" : ""}`}
                />
              )}
            </div>
            {route.subRoutes && openSubRoutes[index] && (
              <div className="pr-6 flex flex-col mt-4 gap-y-2">
                {route.subRoutes.map((subRoute, subIndex) => (
                  <Link
                    key={subIndex}
                    href={subRoute.path}
                    className={
                      "flex flex-row gap-x-2 items-center px-4 py-2 hover:text-white dark:hover:bg-blue-500 link-hover transition-colors rounded text-sm " +
                      isActive(subRoute.path)
                    }
                  >
                    {subRoute.icon}
                    {subRoute.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-y-2 mt-auto">
        <div
          className="px-4 py-2 flex flex-row gap-x-2 hover:bg-primary hover:text-white transition-colors rounded cursor-pointer"
          onClick={() =>  logout() }
        >
          <Image
            src={admin?.avatar?.url || user?.avatar?.url || "/placeholder.png"}
            alt={admin?.avatar?.public_id || "User Avatar"}
            height={100}
            width={100}
            className="rounded-full object-cover w-[35px] h-[35px]"
          />
          <article className="flex flex-col gap-y-0.5">
            <h2 className="line-clamp-1 text-base">{admin?.name} {admin?.user}</h2>
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
