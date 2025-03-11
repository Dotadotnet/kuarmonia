import React, { useEffect, useState } from "react";
import Dashboard from "@/components/icons/Dashboard";
import { useSelector } from "react-redux";
import OutsideClick from "../../outsideClick/OutsideClick";
import Image from "next/image";
import Logout from "@/components/icons/Logout";
import Link from "next/link";
import { useLogoutMutation } from "@/services/auth/logout";
import toast from "react-hot-toast";
import UserNav from "@/components/icons/UserNav";

function Auth() {
  const user = useSelector((state) => state?.auth?.user);
  const admin = useSelector((state) => state?.auth?.admin);
  const [isOpen, setIsOpen] = useState(false);
  const [logout, { isLoading, error, data }] = useLogoutMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال خروج ...", { id: "logout" });
    }

    if (data?.success) {
      toast.success(data?.message, { id: "logout" });
      window.location.href = "/";

    }
    if (data && !data?.success) {
      toast.error(data?.message, { id: "logout" });
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "logout" });
    }
  }, [isLoading, data, error]);

  return (
    <div>
      {(user && Object.keys(user).length > 0) ||
      (admin && Object.keys(admin).length > 0) ? (
        <button
          className="p-2 rounded-secondary bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Dashboard className="h-6 w-6" />
        </button>
      ) : (
        <div className="flex items-center">
          <Link
            className="p-2 rounded-secondary flex items-center hover:bg-slate-200 bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            href="/auth/signin"
          >
            <UserNav className="h-6 w-6" />
          </Link>
        </div>
      )}
      {isOpen && (
        <OutsideClick
          onOutsideClick={() => setIsOpen(false)}
          className="absolute md:top-full bottom-full left-2 md:right-0 md:w-80 w-52 h-fit bg-white dark:bg-slate-900 border border-primary dark:border-blue-500 rounded p-2 flex flex-col mb-4 md:mb-0  dark:text-gray-100"
        >
          <div className="flex flex-col ">
            <div className="flex flex-row gap-x-2 p-4">
              <Image
                src={
                  user?.avatar?.url || admin?.avatar?.url || "/placeholder.png"
                }
                alt={user?.avatar?.public_id || "User Avatar"}
                height={300}
                width={300}
                className="rounded object-cover h-[50px] w-[50px]"
              />
              <article className="flex flex-col">
                <h2 className="line-clamp-1">
                  {user?.name || admin?.name || "نام کاربر ثبت نشده است"}
                </h2>
                <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis dark:text-gray-100">
                  {user?.phone ||
                    user?.email ||
                    admin?.phone ||
                    admin?.email ||
                    "شماره تلفن"}
                </p>
              </article>
            </div>
            <p className="flex flex-row gap-x-2 ">
              {user?.status === "inactive" && (
                <span className="bg-red-50 border border-red-900 px-2 rounded-secondary text-red-900 text-xs lowercase w-fit">
                  در انتظار تأیید
                </span>
              )}
            </p>
            <p className="mt-2 text-sm px-4">
              سطح کاربری:{" "}
              <span className="text-green-500">
                {user?.userLevel === "basic"
                  ? "پایه"
                  : user?.userLevel === "verified"
                  ? "تأیید شده"
                  : user?.userLevel === "completed"
                  ? "کامل"
                  : admin?.adminLevel === "basic"
                  ? "پایه"
                  : admin?.adminLevel === "verified"
                  ? "تأیید شده"
                  : admin?.adminLevel === "completed"
                  ? "کامل"
                  : "نامشخص"}
              </span>
            </p>
            {admin && (
              <p className="my-2 text-sm px-4">
                نقش:{" "}
                <span className="text-green-500 ml-2">
                  {admin?.role === "superAdmin"
                    ? "مدیر کل"
                    : admin?.role === "admin"
                    ? "مدیر"
                    : admin?.role === "operator"
                    ? "اپراتور"
                    : admin?.role === "author"
                    ? "نویسنده"
                    : "نامشخص"}{" "}
                </span>
              </p>
            )}
            <hr className="border-primary" />
            <div className="flex flex-col md:flex-row justify-between">
              <div
                className="w-full flex  md:flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded cursor-pointer"
                onClick={() => logout()} 
              >
                <span className="bg-sky-500/5 p-1 rounded rotate-180">
                  <Logout />
                </span>
                <article className="whitespace-nowrap">
                  <h2 className="text-sm">خروج</h2>
                  <p className="text-xs">حذف اطلاعات ورود</p>
                </article>
              </div>

              <div
                className="w-full flex flex-row-reverse md:flex-row md:justify-end justify-end  gap-x-2 p-2 border border-transparent hover:border-black rounded cursor-pointer items-center"
                onClick={() => window.open("/dashboard", "_self")}
              >
                <article className="whitespace-nowrap">
                  <h2 className="text-sm">پنل کاربری</h2>
                </article>
                <span className="bg-sky-500/5 p-1 rounded ">
                  <Logout />
                </span>
              </div>
            </div>
          </div>
        </OutsideClick>
      )}
    </div>
  );
}

export default Auth;
