import { FaPassport } from 'react-icons/fa'; // برای پاسپورت
import { IoIosPeople } from 'react-icons/io'; // برای مهاجرت به عنوان کارگر
import { MdHomeWork } from 'react-icons/md'; // برای ویزای کاری
import { GiBoatFishing } from 'react-icons/gi'; // برای مهاجرت با کشتی
import { FaHospital } from 'react-icons/fa'; // برای مهاجرت پزشکی
import { MdLocationCity } from 'react-icons/md'; // برای مهاجرت به شهرهای خاص
import { FaPlaneDeparture } from 'react-icons/fa'; // برای مهاجرت از طریق پرواز
import { FaUniversity } from 'react-icons/fa'; // برای تحصیل در خارج
import { GiFamilyHouse } from 'react-icons/gi'; // برای مهاجرت خانواده
import { FaHandshake } from 'react-icons/fa'; // برای مهاجرت از طریق سرمایه‌گذاری

const migrationMethods = [
  { name: "پاسپورت", icon: <FaPassport /> },
  { name: "مهاجرت کاری", icon: <MdHomeWork /> },
  { name: "مهاجرت از طریق کارآفرینی", icon: <FaHandshake /> },
  { name: "مهاجرت از طریق تحصیل", icon: <FaUniversity /> },
  { name: "مهاجرت به عنوان پناهنده", icon: <IoIosPeople /> },
  { name: "مهاجرت پزشکی", icon: <FaHospital /> },
  { name: "مهاجرت با کشتی", icon: <GiBoatFishing /> },
  { name: "مهاجرت به مناطق خاص", icon: <MdLocationCity /> },
  { name: "مهاجرت از طریق پرواز", icon: <FaPlaneDeparture /> },
  { name: "مهاجرت خانواده", icon: <GiFamilyHouse /> },
];

export default migrationMethods;
