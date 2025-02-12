import React from "react";
import Logo from "../logo/Logo";
import Container from "../container/Container";
import UserMenu from "./userMenu/UserMenu";
import LargeMenu from "./largeMenu/LargeMenu";
import MobileMenu from "./largeMenu/MobileMenu";
import ProgressBar from "@/components/shared/loading/ProgressBar";
import ToggleThemeButton from "@/components/shared/theme/ToggleThemeButton";

const Navbar = () => {
  return (
    <header className="">
      <Container>
        <ProgressBar />
        <nav className="fixed top-0 m-4 md:m-8 left-0 flex flex-row justify-between right-0 shadow-lg lg:grid lg:grid-cols-12 items-center z-[9998] p-4 bg-white dark:bg-gray-900  rounded-xl  dark:text-gray-100">
        <UserMenu />
          <LargeMenu />
          <ToggleThemeButton />
          <Logo />
        </nav>
          <MobileMenu />
      </Container>
    </header>
  );
};

export default Navbar;
