import React from "react";
import Image from "next/image";
import { AiTwotoneFire } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; 

const Banner1 = () => {
  const router = useRouter();

  return (
      <div className="grid md:grid-cols-3   justify-center grid-cols-1 md:gap-4">
        <div className="col-span-2 h-full flex flex-col gap-y-4 ">          <div
  className="w-full bg-green-300 dark:bg-blue-400 md:mt-5 h-full rounded-primary relative flex flex-col gap-y-8 lg:px-22  md:pt-8 pb-0"
  
>                           
    

<motion.div
    className="lg:absolute bottom-0 right-0 order-2 lg:w-[500px] lg:ml-0 md:ml-auto"
    initial={{ x: 200, opacity: 0 }}  // شروع از سمت راست
    animate={{
      opacity: 1,
      x: 0,  // به موقعیت اصلی برسد
      y: ["0px", "20px", "0px"],  // حرکت بالا و پایین
    }}
    transition={{
      duration: 2,  // سرعت انیمیشن برای حرکت از سمت راست
      ease: "easeInOut",  // نوع انیمیشن
      repeat: 0,  // از تکرار حرکت از سمت راست جلوگیری می‌کند
      delay: 0.3,  // کمی تأخیر قبل از شروع حرکت
    }}
  >
    <motion.div
  className="lg:absolute bottom-0 right-0 order-2 lg:w-[500px] lg:ml-0 md:ml-auto"
  animate={{
    y: ["0px", "20px", "0px"],  // حرکت بالا و پایین
  }}
  transition={{
    // نوع انیمیشن
    repeat: Infinity,  // تکرار انیمیشن حرکت بالا و پایین
    repeatType: "loop",  // نوع تکرار: حلقه‌ای
    duration: 3,  // مدت زمان یک سیکل حرکت بالا و پایین
  }}
>


    <Image
      src="/assets/home/banner/model1.png"
      alt="model"
      height={872}
      width={500}
      className="lg:w-[500px] lg:ml-0 md:ml-auto"
    />
  </motion.div>
  </motion.div>
            <div className="md:grid md:grid-cols-5 gap-4">
              <div className="md:col-span-3 hidden md:flex p-4">
              </div>
              <div className="md:col-span-2 flex flex-col gap-4 p-4">
                {/* Animated Title */}
                <motion.h1
                  className="md:text-6xl text-white font-nozha text-4xl w-full text-right"
                  initial={{ x: -200, opacity: 0 }} // Initial state: Slide from left
                  animate={{ x: 0, opacity: 1 }} // End state: Position in place
                  transition={{ duration: 0.3 }} // Duration of slide-in effect
                >
                  مهاجرت و سرمایه گذاری با
                  <span className="md:text-6xl text-black">کارمونیا</span>
                  <br />
                </motion.h1>

                <motion.h1
                  className="md:text-3xl font-nozha text-4xl w-full text-right"
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  طعمی از جنس {" "}
                  <span className="text-white">اصالت</span> {" "}
                  و <span className="text-white">لذت خالص</span>
                </motion.h1>

                <motion.p
                  className="flex flex-row gap-x-0.5 items-center text-right justify-start md:text-md text-black"
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  در این فصل، طعمی ماندگار را تجربه کنید
                  <AiTwotoneFire className="text-[#ffa384] w-6 h-6 drop-shadow" />
                </motion.p>

                {/* Animated Button */}
                <motion.button
                  className="px-8 py-4 border border-black justify-start rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit mt-4"
                  onClick={() => router.push("/")}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                  شروع تجربه شیرین شما
                </motion.button>
              </div>
            </div>
          </div>

        </div>

        {/* Animated Right Component */}
        <div className="flex flex-col w-full pt-4 gap-4">
         
        </div>
      </div>
  );
};

export default Banner1;
