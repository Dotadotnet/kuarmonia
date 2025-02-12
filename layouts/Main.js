import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";
import LoadingIndicator from "@/components/shared/loading/LoadingIndicator";
import ToolBar from "@/components/shared/navbar/mobileMenu/ToolBar";

const Main = ({ children }) => {
  return (
    <>
      <LoadingIndicator />
      <Navbar />
      {children}

<ToolBar />
      <Footer />
    </>
  );
};

export default Main;
