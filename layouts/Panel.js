import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import LoadingIndicator from "@/components/shared/loading/LoadingIndicator";
import Navbar from "@/components/shared/container/Navbar";
import { useSelector } from "react-redux";
import { MdFavoriteBorder, MdOutlineRateReview } from "react-icons/md";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { TbUserEdit, TbUserShare } from "react-icons/tb";
import { BsCartCheck, BsPostcardHeart } from "react-icons/bs";
import { FaBlog, FaCogs, FaConciergeBell, FaGifts, FaGlassMartiniAlt, FaHotel, FaListUl, FaTrophy, FaWrench } from "react-icons/fa";
import { BsTags } from "react-icons/bs";
import { PiCreditCardLight, PiCubeTransparent } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { GrGallery } from "react-icons/gr";
import { RxVideo } from "react-icons/rx";
import { LiaToolsSolid } from "react-icons/lia";
import { FaBuilding, FaHome, FaExchangeAlt, FaMoneyCheckAlt, FaList } from 'react-icons/fa'; 



const Panel = ({ children }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state?.auth?.user);
  const admin = useSelector((state) => state?.auth?.admin);

  const userRole = admin?.role || (user ? "user" : null);
  const routes = [
    {
      name: "پروفایل من",
      path: "/dashboard/my-profile",
      icon: <TbUserEdit className="w-5 h-5" />,
      allowedRoles: ["user", "operator", "admin", "superAdmin"]
    },
    {
      name: "دسته بندی ها",
      path: "/dashboard/categories",
      icon: <FaListUl className="w-5 h-5" />,
      allowedRoles: ["admin", "superAdmin"]
    },
    {
      name: "تگ ها",
      path: "/dashboard/tags",
      icon: <BsTags className="w-5 h-5" />,
      allowedRoles: ["admin", "superAdmin"]
    },
    {
      name: "املاک",
      icon: <FaBuilding className="w-5 h-5" />,
      allowedRoles: ["admin", "superAdmin"],
      subRoutes: [
        {
          name: "لیست",
          path: "/dashboard/properties",
          icon: <FaList className="w-5 h-5" />,
          allowedRoles: ["admin", "superAdmin", "operator"]
        },
        {
          name: "نوع ملک",
          path: "/dashboard/prop-type",
          icon: <FaHome className="w-5 h-5" />,
          allowedRoles: ["admin", "superAdmin"]
        },
        {
          name: "نوع معامله",
          path: "/dashboard/prop-trade",
          icon: <FaExchangeAlt className="w-5 h-5" />,
          allowedRoles: ["admin", "superAdmin"]
        },
        {
          name: "نوع فروش",
          path: "/dashboard/prop-sale",
          icon: <FaMoneyCheckAlt className="w-5 h-5" />,
          allowedRoles: ["admin", "superAdmin"]
        }
      ]
    },
    {
      name: "مراسمات",
      icon: <FaGlassMartiniAlt  className="w-5 h-5" />,
      allowedRoles: ["admin", "superAdmin"],
      subRoutes: [
        {
          name: "لیست",
          path: "/dashboard/venues",
          icon: <FaList className="w-5 h-5" />,
          allowedRoles: ["admin", "superAdmin", "operator"]
        },
        {
          name: "نوع مکان مراسمات",
          path: "/dashboard/venue-type",
          icon: <FaHotel  className="w-5 h-5" />,
          allowedRoles: ["admin", "superAdmin"]
        },
        {
          name: "نوع مراسم",
          path: "/dashboard/ceremony-type",
          icon: <FaExchangeAlt className="w-5 h-5" />,
          allowedRoles: ["admin", "superAdmin"]
        },
        {
          name: "خدمات مراسم",
          path: "/dashboard/venue-services",
          icon: <FaConciergeBell className="w-5 h-5" />,
          allowedRoles: ["admin", "superAdmin"]
        },
        {
          name: "امکانات مراسم",
          path: "/dashboard/venue-aminities",
          icon: <FaCogs className="w-5 h-5" />,
          allowedRoles: ["admin", "superAdmin"]
        },
        {
          name: "تنظیمات مراسم",
          path: "/dashboard/venue-setting",
          icon: <FaWrench className="w-5 h-5" />,
          allowedRoles: ["admin", "superAdmin"]
        },        
        {
          name: "جشن‌ها",
          path: "/dashboard/venue-events",
          icon: <FaGifts className="w-5 h-5" />,
          allowedRoles: ["admin", "superAdmin"]
        },
        {
          name: "جوایز و استانداردها",
          path: "/dashboard/venue-awards",
          icon: <FaTrophy className="w-5 h-5" />,
          allowedRoles: ["admin", "superAdmin"]
        }
      ]
    },    
    {
      name: "رسانه",
      path: "/dashboard/media",
      icon: <RxVideo className="w-5 h-5" />,
      allowedRoles: ["admin", "superAdmin", "author"]
    },
    {
      name: "پست",
      path: "/dashboard/posts",
      icon: <BsPostcardHeart className="w-5 h-5" />,
      allowedRoles: ["admin", "superAdmin", "author"]
    },
    {
      name: "بلاگ",
      path: "/dashboard/blogs",
      icon: <FaBlog className="w-5 h-5" />,
      allowedRoles: ["admin", "superAdmin", "author"]
    },
    {
      name: "اخبار",
      path: "/dashboard/news",
      icon: <PiCubeTransparent className="w-5 h-5" />,
      allowedRoles: ["admin", "superAdmin", "author"]
    },
    {
      name: "گالری",
      path: "/dashboard/gallery",
      icon: <GrGallery className="w-5 h-5" />,
      allowedRoles: ["admin", "superAdmin", "author"]
    },
    {
      name: "سفارشات",
      path: "/dashboard/view-cart",
      icon: <BsCartCheck className="w-5 h-5" />,
      allowedRoles: ["user"]
    },
    {
      name: "علاقه‌مندی‌ها",
      path: "/dashboard/view-favorites",
      icon: <MdFavoriteBorder className="w-5 h-5" />,
      allowedRoles: ["admin", "superAdmin", "operator"]
    },
    {
      name: "سبد خرید",
      path: "/dashboard/view-purchases",
      icon: <PiCreditCardLight className="w-5 h-5" />,
      allowedRoles: ["user"]
    },
    {
      name: "امکانات",
      path: "/dashboard/tools",
      icon: <LiaToolsSolid className="w-5 h-5" />,
      allowedRoles: ["admin", "superAdmin"]
    },
    {
      name: "خریداران",
      path: "/dashboard/list-buyers",
      icon: <AiOutlineUserSwitch className="w-5 h-5" />,
      allowedRoles: ["superAdmin"]
    },
    {
      name: "اپراتورها",
      path: "/dashboard/list-sellers",
      icon: <TbUserShare className="w-5 h-5" />,
      allowedRoles: ["superAdmin"]
    },
    {
      name: (
        <p className="flex flex-row gap-x-2 items-center w-full h-fit">
          لیست کاربران{" "}
          <span
            className="border border-cyan-900 text-cyan-900 bg-cyan-100/50 px-1.5 py-0 rounded uppercase"
            style={{ fontSize: "10px" }}
          >
            مدیر
          </span>
        </p>
      ),
      path: "/dashboard/users",
      icon: <FiUsers className="w-5 h-5" />,
      allowedRoles: ["superAdmin"]
    },
    {
      name: "تنظیمات سایت",
      path: "/dashboard/setting",
      icon: <MdOutlineRateReview className="w-5 h-5" />,
      allowedRoles: ["superAdmin"]
    }
  ];
  
  const filteredRoutes = routes.filter(route => 
    route.allowedRoles.includes(userRole) || 
    (route.subRoutes && route.subRoutes.some(subRoute => subRoute.allowedRoles.includes(userRole)))
  );
  
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-slate-900">
      <LoadingIndicator />
      <header className="bg-gray-800 text-white text-center">
        <Navbar router={router} open={open} setOpen={setOpen} />
      </header>
      <div className="flex flex-1 w-full overflow-hidden p-2">
        <aside className="bg-secondary dark:bg-gray-800 rounded m-4 lg:w-[300px] md:w-[250px] md:block lg:block hidden p-4 h-auto shadow-lg text-slate-900 dark:text-white">
          <Sidebar routes={filteredRoutes} />
        </aside>
        <main className="flex-1 p-1 lg:p-8 pb-8 overflow-hidden dark:bg-gray-900">
          <div className="h-full overflow-y-auto scrollbar-hide">
            {children}
          </div>
          <footer className="px-4 py-2 flex justify-center items-center flex-row rounded">
            <p className="text-xs">
              © {new Date().getFullYear()} تمامی حقوق این اثر متعلق به شرکت
              کارمونیا می باشد.
            </p>
          </footer>
        </main>
      </div>
      {open && (
        <div className="lg:hidden md:hidden sticky top-[100px] right-2 w-3/4 h-[500px] bg-secondary dark:bg-gray-900 overflow-y-auto scrollbar-hide z-50 rounded p-4 mt-16 text-slate-900 dark:text-white">
          <button
            className="absolute top-2 left-2 border p-1 rounded-secondary dark:border-gray-600 p-2 mb-2"
            onClick={() => setOpen(false)}
          >
            <RxCross2 className="h-5 w-5 text-gray-800 dark:text-gray-200" />
          </button>
          <Sidebar routes={filteredRoutes} />
        </div>
      )}
    </div>
  );
};

export default Panel;
