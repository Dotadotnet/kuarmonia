import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSignUpPhoneMutation } from "@/services/auth/userAuthApi";
import Spinner from "@/components/shared/loading/Spinner";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

function Mobile({ onSuccess, phone, setPhone }) {
  const [message, setMessage] = useState("");
  const [signUp, {data, isLoading, error  }] = useSignUpPhoneMutation();
    const { register, handleSubmit, reset } = useForm();
  
  console.log(data);



  const handleSignUp = async (data) => {
    const formData = new FormData();
    formData.append("phone", data.phone);
  
    try {
      // ارسال داده‌ها و دریافت نتیجه با استفاده از unwrap
      const result = await signUp({ phone: data.phone }).unwrap();
      console.log('Server response:', result); // اینجا داده‌ها را بررسی کنید
    } catch (err) {
      console.error('Error:', err); // خطاها را بررسی کنید
    }
  };
  
  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال ورود...", { id: "signup" });
    }

    if (data?.success) {
      toast.success(data?.message, { id: "signup" });
    }
    if (data && !data?.success) {
      toast.dismiss(data?.message, { id: "signup" });
    }
    if (error?.data) {
      toast.error(error?.data?.message, { id: "signup" });
    }
  }, [isLoading, data, error]);

  return (
    <form onSubmit={handleSubmit(handleSignUp)}> 
      <input
        type="text"
        className="form-control block w-full h-14 px-8 text-gray-700 bg-white dark:text-gray-100 dark:bg-slate-800 border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 dark:focus:text-gray-100 focus:bg-white focus:border-orange-600 focus:outline-none text-left !text-2xl"
        placeholder="شماره تلفن"
        dir="ltr"
        inputMode="tel"
        id="phone"
        name="phone"
        {...register("phone", { required: true })}

      />

      <motion.button
        type="submit" 
        className="cursor-pointer flex items-center justify-center px-7 py-3 bg-gradient-to-br from-orange-400 to-orange-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-orange-600 hover:shadow-lg focus:bg-orange-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out w-full mt-3"
        whileHover={!isLoading ? { scale: 1.05 } : {}}
        whileTap={!isLoading ? { scale: 0.95 } : {}}
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : "ورود"}
      </motion.button>

      {message && (
        <p
          className={`mt-3 text-sm text-center ${
            error ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}

export default Mobile;
