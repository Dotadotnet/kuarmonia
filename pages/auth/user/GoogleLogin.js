import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { auth, provider } from "@/config/firebaseConfig"; 
import { signInWithRedirect, getRedirectResult } from "firebase/auth";
import { useSigninGoogleMutation } from "@/services/auth/userAuthApi";

function GoogleLogin() {
  const [signUp, { isLoading, error, data }] = useSigninGoogleMutation();

  const handleLogin = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (err) {
      toast.error("خطا در ورود با گوگل!");
    }
  };

  useEffect(() => {
    const fetchRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const idToken = await result.user.getIdToken();
          if (!idToken) {
            toast.error("دریافت توکن ناموفق بود!");
            return;
          }
          
          signUp({ idToken });
        }
      } catch (error) {
        toast.error("خطا در دریافت نتیجه ورود!");
      }
    };

    fetchRedirectResult();

    if (isLoading) {
      toast.loading("در حال ورود...", { id: "signup" });
    }

    if (data) {
      toast.success(data?.description, { id: "signup" });
      
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "signup" });
    }
  }, [isLoading, data, error]);

  return (
    <div>
      <div className="flex items-center justify-center gap-5 text-center">
        <motion.p
          whileHover={{ scale: 1.1 }}
          className="flex items-center w-64 h-10 bg-slate-100 justify-center rounded text-headingColor dark:text-gray-900 px-5 cursor-pointer shadow-sm hover:bg-slate-100"
          onClick={handleLogin}
        >
          <FcGoogle className="text-xl w-5 ml-1" />
          <span>ورود از طریق حساب گوگل</span>
        </motion.p>
      </div>
    </div>
  );
}

export default GoogleLogin;
