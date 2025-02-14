import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";
import LoadingIndicator from "@/components/shared/loading/LoadingIndicator";

const Main = ({ children }) => {
  return (
    <>
      <LoadingIndicator />
      {children}
      <Navbar />
      <Footer />
    </>
  );
};

export default Main;
