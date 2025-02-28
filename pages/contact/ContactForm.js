import React from "react";
import { motion } from "framer-motion";
import Instagram from "./Instagram";
import Telegram from "./Telegram";
import WhatsApp from "./WhatsApp";
import Image from "next/image";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const ContactForm = () => {
  return (
    <section
      className="py-24 mt-12 rtl"
      initial="hidden"
      animate="visible"
      viewport={{ once: false }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="lg:mb-0  mb-10 h-fit">
          <div className="group w-full h-full">
  <div className="h-full">
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute top-1/2 md:right-64 md:translate-x-0 translate-x-72 left-24 bg-white shadow-xl lg:p-6 p-4 rounded-2xl w-80 rtl"
    >
 <div className="space-y-4" style={{ direction: 'ltr' }}>
  {/* شماره‌های تماس */}
  <a href="tel:+14376675933" className="flex items-center space-x-3">
    <FaPhone className="text-gray-700" size={20} />
    <h5 className="text-black text-base font-normal">+1-437-667-5933</h5>
  </a>
  <a href="tel:+905433575933" className="flex items-center space-x-3">
    <FaPhone className="text-gray-700" size={20} />
    <h5 className="text-black text-base font-normal">+90-543-357-5933</h5>
  </a>

  {/* آدرس‌ها */}
  <div className="border-t border-gray-100 pt-4 space-y-4" style={{ direction: 'ltr' }}>
    <div className="flex items-center space-x-3">
      <FaMapMarkerAlt className="text-gray-700" size={20} />
      <h5 className="text-black text-base font-normal">65 Lillian St, ON, Toronto, canada</h5>
    </div>
    <div className="flex items-center space-x-3">
      <FaMapMarkerAlt className="text-gray-700" size={20} />
      <h5 className="text-black text-base font-normal">تهران، خیابان پاستور، ایران</h5>
    </div>
    <div className="flex items-center space-x-3">
      <FaMapMarkerAlt className="text-gray-700" size={20} />
      <h5 className="text-black text-base font-normal">Gaziosmanpaşa, turkey</h5>
    </div>
  </div>
</div>



      <div className="flex items-center justify-center border-t border-gray-100 pt-6">
        <a href="https://www.instagram.com/kuarmonia" className="mr-6">
          <Instagram />
        </a>
        <a href="https://t.me/kuarmonia" className="mr-6">
          <Telegram />
        </a>
        <a href="https://wa.me/kuarmonia" className="mr-6">
          <WhatsApp />
        </a>
      </div>
    </motion.div>

    <motion.div
      viewport={{ once: false, amount: 0.5 }}
      variants={{
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0 },
      }}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5 }}
    >
      <Image
        src="https://storage.kuarmonia.com/api/v1/download-shared-object/aHR0cHM6Ly9zMy1jb25zb2xlLmt1YXJtb25pYS5jb20vY29udGFjdC9jNWFhMmZkMC01ZWYzLTRiOTYtODEzMy0yNTc2ZjhjYTk1ZDUud2VicD9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUc4MEpVUDVQN0Q5TDNFMDk1UjFUJTJGMjAyNTAyMjglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMjI4VDE2MjMyN1omWC1BbXotRXhwaXJlcz00MzIwMCZYLUFtei1TZWN1cml0eS1Ub2tlbj1leUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaFkyTmxjM05MWlhraU9pSkhPREJLVlZBMVVEZEVPVXd6UlRBNU5WSXhWQ0lzSW1WNGNDSTZNVGMwTURnd01UTTJNU3dpY0dGeVpXNTBJam9pV0hScldYWnZhWEJMZEc4ME5USTFjeUo5LlJ3Tm1ocVFTbVl3bWw4WTFDZEo3bC1jcUl5Rk1NWDcteVA2QWlTejIxc0k0N1Q4UEZ4VVBuR2VwTlRwNTV6djdRWHZLMzVTUl96UTFTWE0zT0VCQjl3JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9NDA2Y2I0MjdkZmIxZGMwNzU5ODQ1OWE2Y2EyYmE1MTk0MDhmZmJlMmJiODQ3ZWNhZTg2MzA4YTZhYjczYTcxYQ"
        alt="📞 تماس با ما"
        height={600}
        width={400}
        className="md:w-2/3 md:h-1/2 w-full h-full lg:rounded-r-2xl rounded-2xl object-cover"
      />
    </motion.div>
  </div>
</div>

          </div>
          <motion.div
  className="p-5 lg:p-11 lg:rounded-l-2xl h-fit rounded-2xl"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: false, amount: 0.5 }}
>
  <h2 className="text-indigo-600 font-manrope text-4xl font-semibold leading-10 mb-11">
    ✉️ برای ما پیام بفرستید
  </h2>
  <motion.input
    type="text"
    placeholder="👤 نام"
    className="w-full h-12 border p-4 mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: false, amount: 0.5 }}
  />
  <motion.input
    type="text"
    placeholder="📧 ایمیل"
    className="w-full h-12 border p-4 mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: false, amount: 0.5 }}
  />
  <motion.input
    type="text"
    placeholder="📞 تلفن"
    className="w-full h-12 border p-4 mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: false, amount: 0.5 }}
  />
  <motion.textarea
    placeholder="📜 پیام شما"
    className="w-full h-24 border p-4 mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: false, amount: 0.5 }}
  />
  <motion.button
    className="w-full h-12 bg-indigo-600 text-white"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: false, amount: 0.5 }}
  >
    ارسال
  </motion.button>
</motion.div>


        </div>
      </div>
    </section>
  );
};

export default ContactForm;
