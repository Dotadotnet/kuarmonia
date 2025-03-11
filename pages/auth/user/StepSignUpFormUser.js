import React, { useState } from "react";
import Mobile from "./Mobile";
import OTPVerification from "./OTPVerification";

export default function MobileLogin() {
  const [currentStep, setCurrentStep] = useState(1);
   const [phone, setPhone] = useState("");
 


  return (
    <div>
     {currentStep === 1 && <Mobile onSuccess={() => setCurrentStep(2)} phone={phone} setPhone={setPhone} />}
     {currentStep === 2 && <OTPVerification phone={phone} />}
    
      <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"></div>
    </div>
  );
}
