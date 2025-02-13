import React, { useState, useEffect } from "react";
import Logo from "../logo/Logo";
import Container from "../container/Container";
import UserMenu from "./userMenu/UserMenu";
import LargeMenu from "./largeMenu/LargeMenu";
import ProgressBar from "@/components/shared/loading/ProgressBar";
import MobileMenu from "@/components/shared/navbar/mobileMenu/MobileMenu";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    checkScreenSize(); 
    window.addEventListener("resize", checkScreenSize); 

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <header>
      <Container>
        <ProgressBar />
        <nav className="fixed top-0 m-4  left-0 flex flex-row justify-between right-0 shadow-lg lg:grid lg:grid-cols-12 items-center z-[9999] p-4 bg-white dark:bg-gray-900 rounded-xl dark:text-gray-100">
          
          {isMobile ? <>
          <MobileMenu /> 
       
          </> 
          : <>
            <UserMenu />
            <LargeMenu />
          </>}
          
          <Logo />
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
