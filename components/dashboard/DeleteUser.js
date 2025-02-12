import React, { useEffect, useMemo, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { AiOutlineDelete, AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  useDeleteUserMutation,
  useGetUserQuery
} from "@/services/user/userApi";
import { toast } from "react-hot-toast";
import Modal from "../shared/modal/Modal";
import { RxCross2 } from "react-icons/rx";
import { setUser } from "@/features/user/userSlice";
import { useDispatch } from "react-redux";
import {
  MdFavoriteBorder,
  MdOutlineReviews,
  MdWarningAmber
} from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { TbDoorEnter } from "react-icons/tb";
import Image from 'next/image'

const DeleteUser = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isLoading: fetching,
    data: fetchData,
    error: fetchError
  } = useGetUserQuery(id);
  const user = useMemo(() => fetchData?.data || {}, [fetchData]);
  const [
    deleteUser,
    { isLoading: deleting, data: deleteData, error: deleteError }
  ] = useDeleteUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetching) {
      toast.loading("در حال به‌روزرسانی اطلاعات کاربر...", {
        id: "fetchUser"
      });
    }

    if (fetchData) {
      toast.success(fetchData?.message, { id: "fetchUser" });
    }

    if (fetchError?.data) {
      toast.error(fetchError?.data?.message, { id: "fetchUser" });
    }

    if (deleting) {
      toast.loading("در حال حذف کاربر...", { id: "deleteUser" });
    }

    if (deleteData) {
      toast.success(deleteData?.message, { id: "deleteUser" });
      setIsOpen(false);
    }

    if (deleteError?.data) {
      toast.error(deleteError?.data?.message, { id: "deleteUser" });
    }
  }, [fetching, fetchData, fetchError, deleting, deleteData, deleteError]);

  return (
    <>
      <span
        type="button"
        disabled={deleting ? true : undefined} // اصلاح شده
        className="cursor-pointer rounded-full border border-red-500/5 bg-red-500/5 p-2 text-red-500 transition-colors hover:border-red-500/10 hover:bg-red-500/10 hover:!opacity-100 group-hover:opacity-70"
        onClick={() => {
          dispatch(setUser(user));
          setIsOpen(true);
        }}
      >
        <FiTrash className="w-5 h-5" />
      </span>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            dispatch(setUser({}));
            setIsOpen(false);
          }}
          className="lg:w-3/12 md:w-1/2 w-full z-50"
        >
          <section className="h-full w-full flex flex-col gap-y-4">
            <article className="flex flex-col gap-y-8 h-full overflow-y-auto">
              <div className="flex flex-col gap-y-1">
                <div className="flex flex-col gap-y-4">
                  <Image
                    src={user?.avatar?.url}
                    alt={user?.avatar?.public_id}
                    height={100}
                    width={100}
                    className="h-[100px] w-[100px] rounded object-cover"
                  />
                  <h1 className="text-2xl">{user.name}</h1>
                </div>
                <div className="flex flex-col gap-y-1">
                  <p className="text-xs">{user.email}</p>
                  <p className="text-xs">{user.phone}</p>
                  <p className="flex flex-row gap-x-1">
                    <span className="bg-purple-100/50 text-purple-900 border border-purple-900 px-1.5 !text-xs rounded-primary uppercase">
                      {user.role}
                    </span>
                    <span className="bg-indigo-100/50 text-indigo-900 border border-indigo-900 px-1.5 !text-xs rounded-primary uppercase">
                      {user.status}
                    </span>
                    {user?.rents?.length > 0 && (
                      <span className="bg-cyan-100/50 text-cyan-900 border border-cyan-900 px-1.5 !text-xs rounded-primary uppercase">
                        فروشنده
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="text-sm flex flex-col gap-y-2.5">
                <p className="flex flex-row gap-x-1 items-center">
                  <MdWarningAmber className="w-5 h-5" /> این عملیات غیر قابل
                  بازگشت است!
                </p>
                <p className="flex flex-row gap-x-1 items-center">
                  <LuShoppingCart className="h-5 w-5" /> آیتم‌های سبد خرید شما
                  حذف خواهند شد!
                </p>
                <p className="flex flex-row gap-x-1 items-center">
                  <MdFavoriteBorder className="h-5 w-5" /> آیتم‌های مورد علاقه
                  شما حذف خواهند شد!
                </p>
                <p className="flex flex-row gap-x-1 items-center">
                  <BiSolidPurchaseTag className="h-5 w-5" />{" "}
                  {user?.purchases?.length} خرید شما حذف خواهند شد!
                </p>
                <p className="flex flex-row gap-x-1 items-center">
                  <TbDoorEnter className="h-5 w-5" /> {user?.rents?.length}{" "}
                  اجاره شما حذف خواهند شد!
                </p>
                <p className="flex flex-row gap-x-1 items-center">
                  <MdOutlineReviews className="h-5 w-5" />{" "}
                  {user?.reviews?.length} نظر شما حذف خواهند شد!
                </p>
              </div>
            </article>
            <div className="flex flex-row gap-x-2 justify-end text-sm">
              <button
                type="button"
                className="flex flex-row items-center gap-x-0.5 bg-red-100/50 border border-red-900 text-red-900 px-2 py-1 rounded uppercase"
                onClick={() => {
                  dispatch(setUser({}));
                  setIsOpen(false);
                }}
              >
                <RxCross2 className="h-4 w-4" />
                لغو
              </button>
              <button
                type="button"
                className="flex flex-row items-center gap-x-0.5 bg-green-100/50 border border-green-900 text-green-900 px-2 py-1 rounded uppercase"
                onClick={() => deleteUser(id)}
              >
                <AiOutlineDelete className="h-4 w-4" />
                حذف
              </button>
            </div>
          </section>
        </Modal>
      )}
    </>
  );
};

export default DeleteUser;
