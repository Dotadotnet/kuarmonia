// import Image from "next/image";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Logo = ({justify="center"}) => {
  const router = useRouter();

  return (
    <>
      <div
        className={`flex justify-${justify} items-center cursor-pointer w-full`}
        onClick={() => router.push("/")}
      >
        <Image width={1383} height={827} alt="logo" src={"/logo.png"} className="w-[100px] h-[60px]" />
        
      </div>
    </>
  );
};

export default Logo;
