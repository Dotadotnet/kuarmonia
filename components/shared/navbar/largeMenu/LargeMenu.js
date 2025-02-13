import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  IoHomeOutline,
  IoMailOutline,
  IoNewspaperOutline,
  IoReceiptOutline,
  IoInformationCircleOutline,
  IoHeadsetOutline,
} from "react-icons/io5";

const LargeMenu = () => {
  const router = useRouter();

  const menuItems = [
    { id: 1, label: "خانه", icon: <IoHomeOutline size={24} />, href: "/" },
    { id: 2, label: "وبلاگ", icon: <IoReceiptOutline size={24} />, href: "/blog" },
    { id: 3, label: "اخبار", icon: <IoNewspaperOutline size={24} />, href: "/news" },
    { id: 4, label: "مشاوره", icon: <IoHeadsetOutline size={24} />, href: "/consulting" },
    {
      id: 5,
      label: "درباره ما",
      icon: <IoInformationCircleOutline size={24} />,
      href: "/about",
    },
  ];

  return (
    <nav className="bg-neutral-100/70 col-span-8 mx-8 rounded-primary hidden md:flex w-full">
      <div className="flex flex-row justify-center gap-x-4 overflow-x-auto">
        <div className="flex flex-row justify-center gap-x-4 border p-1 rounded-secondary bg-white overflow-x-auto scrollbar-hide">
          {menuItems.map((link) => {
            const isActive = router.pathname === link.href; // بررسی فعال بودن مسیر
            return (
              <button
                key={link.id}
                className={`text-sm text-black w-44 text-center h-10 flex flex-row items-center gap-x-1 px-8 py-2 justify-center rounded-secondary border ${
                  isActive ? "bg-black text-white" : "border-transparent"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(link.href);
                }}
              >
                {link.icon}
                {link.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default LargeMenu;
