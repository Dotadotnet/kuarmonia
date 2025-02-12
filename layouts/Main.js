import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import LoadingIndicator from "@/components/shared/loading/LoadingIndicator";

const Main = ({ children }) => {
  return (
    <>
      <LoadingIndicator />
      <Navbar />
      {children}


      <Footer />
    </>
  );
};

export default Main;
