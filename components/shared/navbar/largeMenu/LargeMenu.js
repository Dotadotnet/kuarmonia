import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  IoHomeOutline,
  IoNewspaperOutline,
  IoReceiptOutline,
  IoInformationCircleOutline,
  IoCallOutline, // اضافه کردن آیکون تماس
} from "react-icons/io5";

const LargeMenu = () => {
  const router = useRouter();

  const menuItems = [
    { id: 1, label: "خانه", icon: <IoHomeOutline size={24} />, href: "/" },
    { id: 2, label: "وبلاگ", icon: <IoReceiptOutline size={24} />, href: "/blog" },
    { id: 3, label: "تماس با ما", icon: <IoCallOutline size={24} />, href: "/contact" }, // استفاده از آیکون تماس
    { id: 4, label: "درباره ما", icon: <IoInformationCircleOutline size={24} />, href: "/about" },
  ];
  // مقداردهی پیش‌فرض به صفحه‌ی جاری
  const [selectMenu, setSelectMenu] = useState("");

  useEffect(() => {
    // پیدا کردن آیتمی که آدرسش با مسیر فعلی یکی است
    const currentMenu = menuItems.find((item) => item.href === router.pathname);
    if (currentMenu) {
      setSelectMenu(currentMenu.label);
    }
  }, [router.pathname]); // هر بار که مسیر تغییر کرد، مقدار selectMenu به‌روزرسانی شود.

  const handleClick = (menuItem) => {
    setSelectMenu(menuItem.label);
    router.push(menuItem.href);
  };

  return (
    <nav className="bg-neutral-100/70 col-span-8 mx-8 rounded-primary hidden md:flex w-full">
      <div className="bg-neutral-100/70 rounded-primary hidden md:flex">
        <div className="flex flex-row justify-center gap-x-4 overflow-x-auto">
          <div className="flex flex-row justify-center gap-x-4 border p-1 rounded-secondary bg-white dark:bg-gray-800 overflow-x-auto scrollbar-hide">
            {menuItems.map((menuItem) => (
              <button
                key={menuItem.id}
                className={
                  "text-sm text-black dark:text-gray-100 w-44 text-center h-10 flex flex-row items-center gap-x-1 px-8 py-2 justify-center rounded-secondary border border-transparent" +
                  (selectMenu === menuItem.label ? " bg-black text-white" : "")
                }
                onClick={() => handleClick(menuItem)}
              >
                {menuItem.icon}
                {menuItem.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LargeMenu;
