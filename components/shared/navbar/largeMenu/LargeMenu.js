import React from 'react';
import { useRouter } from "next/router";

import { IoHomeOutline, IoMailOutline, IoNewspaperOutline, IoReceiptOutline, IoInformationCircleOutline, IoHeadsetOutline } from "react-icons/io5";
const largeMenu = () => {
  const router = useRouter();

  const menuItems = [
    { id: 1, label: 'خانه', icon: <IoHomeOutline size={24} />,href:""},
    { id: 2, label: 'وبلاگ', icon: <IoReceiptOutline  size={24}/> ,href:""},
    { id: 3, label: 'اخبار', icon: <IoNewspaperOutline size={24} />  ,href:""},
    { id: 4, label: 'مشاوره', icon: <IoHeadsetOutline size={24}/> ,href:""},
 { id: 5, label: 'درباره ما', icon: <IoInformationCircleOutline size={24} />, href: "/about" },
  { id: 6, label: 'ارتباط', icon: <IoMailOutline size={24} />, href: "/about" },
  ];
  return (

    <nav className=" flex  lg:col-span-8  justify-center items-center gap-8 space-x-4 lg:space-x-6">
    <div className=" hidden md:grid     md:grid-cols-6 justify-center gap-12 outl ">
  {menuItems.map((link) => (
    <a
      key={link.id}
      onClick={(e) => { e.preventDefault(); router.push(link.href); }}
      className={
        "flex flex-col items-center col-span-1 slide-in-ul justify-center text-sm font-medium transition-colors "}
    >
      <span className="mb-2 text-xl  ">{link.icon}</span>
      <span className="mb-2 ">{link.label}</span>

    </a>
  ))}
</div>
</nav>

  );
};

export default largeMenu;
