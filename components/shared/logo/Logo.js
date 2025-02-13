// import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Logo = () => {
  const router = useRouter();

  return (
    <>
      <div
        className="flex justify-end col-span-2  items-center cursor-pointer"
        onClick={() => router.push("/")}
      >
        <span className="text-green-500 dark:text-blue-500 font-bold text-2xl">
          کار
        </span>
        <span className="text-black dark:text-white font-bold text-2xl">
          مونیا
        </span>
      </div>
    </>
  );
};

export default Logo;
