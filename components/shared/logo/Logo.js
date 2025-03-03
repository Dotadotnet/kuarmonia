// import Image from "next/image";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Logo = () => {
  const router = useRouter();

  return (
    <>
      <div
        className="flex justify-center col-span-2  items-center cursor-pointer w-full"
        onClick={() => router.push("/")}
      >
        <Image width={1383} height={827} src={"/logo.png"} className="w-[100px] h-[60px]" />
        
      </div>
    </>
  );
};

export default Logo;
