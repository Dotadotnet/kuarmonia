
import React, { useState } from "react";
import MenuItems from "./MenuItems";
import { useSelector } from "react-redux";
import { HiOutlineUser } from "react-icons/hi";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state?.auth);

  return (
    <div className="relative">
      <button
          className="p-1.5 border  rounded  border-primary/20 dark:border-gray-800"
          onClick={() => setIsOpen(!isOpen)}
      >
        <HiOutlineUser className="text-lg" />
      </button>
      <MenuItems isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default MobileMenu;
