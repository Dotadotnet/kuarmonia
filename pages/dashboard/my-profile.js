import Button from "@/components/shared/button/Button";
import Modal from "@/components/shared/modal/Modal";
import { setUser } from "@/features/user/userSlice";
import Panel from "@/layouts/Panel";
import {
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/services/user/userApi";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { CiWarning } from "react-icons/ci";
import {
  MdDeleteOutline,
  MdFavoriteBorder,
  MdOutlineReviews,
  MdWarningAmber,
} from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { TbDoorEnter } from "react-icons/tb";
import Image from "next/image";

const MyProfile = () => {
  const user = useSelector((state) => state?.auth);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [updateUser, { isLoading, data, error }] = useUpdateUserMutation();

  const defaultValues = useMemo(() => {
    return {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      avatar: user?.avatar,
      address: user?.address,
    };
  }, [user]);
  const { register, handleSubmit, reset } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);

    if (isLoading) {
      toast.loading("در حال بروزرسانی اطلاعات...", { id: "updateUser" });
    }

    if (data) {
      toast.success(data?.message, { id: "updateUser" });
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "updateUser" });
    }
  }, [defaultValues, reset, data, error, isLoading]);

  const handleAvatarPreview = (e) => {
    const file = e.target.files[0];

    if (!avatarPreview) {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
        };

        reader.readAsDataURL(file);
      }
    }
  };

  const handleUpdateUser = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("address", data.address);

    if (avatarPreview !== null && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }

    updateUser({ id: user?._id, body: formData });
  };

  return (
    <>
  <Panel>
  <form
    action=""
    className="text-sm lg:w-1/2 md:w-3/4 w-full flex flex-col gap-y-4 dark:text-gray-100"
    onSubmit={handleSubmit(handleUpdateUser)}
  >
    {/* تصویر پروفایل */}
    <div className="flex flex-col gap-y-2 w-fit">
    <Image
  src={avatarPreview || defaultValues?.avatar?.url || "/placeholder.png"} // تصویر پیش‌فرض در صورت نبودن URL
  alt={defaultValues?.avatar?.public_id || "تصویر پروفایل"}
  height={100}
  width={100}
  className="h-[100px] w-[100px] rounded object-cover"
/>
      <label htmlFor="avatar" className="relative">
        <button
          type="button"
          className="py-1 px-4 flex flex-row gap-x-2 bg-green-100 border border-green-900 text-green-900 rounded-secondary w-fit"
        >
          <IoCloudUploadOutline className="h-5 w-5" />
          ویرایش تصویر پروفایل
        </button>
        <input
          type="file"
          name="avatar"
          id="avatar"
          accept="image/png, image/jpg, image/jpeg"
          className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
          {...register("avatar", {
            onChange: (event) => handleAvatarPreview(event),
          })}
        />
      </label>
    </div>

    <label htmlFor="name" className="flex flex-col gap-y-1">
      <span className="text-sm">نام شما</span>
      <input
        type="text"
        name="name"
        id="name"
        {...register("name")}
        placeholder="مثال: علی رضایی"
        className=""
      />
    </label>

    <label htmlFor="email" className="flex flex-col gap-y-1">
      <span className="text-sm">ایمیل شما</span>
      <input
        type="email"
        name="email"
        id="email"
        {...register("email")}
        placeholder="مثال: ali.rezaei@gmail.com"
        className=""
      />
    </label>

    <label htmlFor="phone" className="flex flex-col gap-y-1">
      <span className="text-sm">شماره تلفن شما</span>
      <input
        type="tel"
        name="phone"
        id="phone"
        {...register("phone")}
        placeholder="مثال: +۹۸۹۱۲۳۴۵۶۷۸۹"
        className=""
      />
    </label>

    <label htmlFor="address" className="flex flex-col gap-y-2">
      آدرس شما*
      <textarea
        name="address"
        id="address"
        rows="2"
        maxLength={500}
        placeholder="آدرس خود را وارد کنید..."
        className="rounded"
        {...register("address", { required: true })}
      ></textarea>
    </label>

    <Button type="submit" className="py-2 mt-4">
      بروزرسانی اطلاعات
    </Button>
  </form>
  <RemoveInformation id={user?._id} />
</Panel>

    </>
  );
};

function RemoveInformation({ id }) {
  const [isOpen, setIsOpen] = useState(false);
    const {
      isLoading: fetching,
      data: fetchData,
      error: fetchError,
    } = useGetUserQuery(id);
  const user = useMemo(() => fetchData?.data || {}, [fetchData]);
  const [
    deleteUser,
    { isLoading: deleting, data: deleteData, error: deleteError },
  ] = useDeleteUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetching) {
      toast.loading("در حال بروزرسانی اطلاعات...", {
        id: "fetchUser",
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
      window.open("/", "_self");
    }

    if (deleteError?.data) {
      toast.error(deleteError?.data?.message, { id: "deleteUser" });
    }
  }, [fetching, fetchData, fetchError, deleting, deleteData, deleteError]);

  return (
    <>
    <Button
      type="submit"
      className="py-2 mt-4 lg:w-1/2 md:w-3/4 w-full !bg-red-500 !border-red-600 !hover:bg-red-900/90"
      onClick={() => {
        dispatch(setUser(user));
        setIsOpen(true);
      }}
    >
      حذف اطلاعات
    </Button>
  
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
  src={user?.avatar?.url || "/placeholder.png"} // مسیر پیش‌فرض در صورت نبودن تصویر
  alt={user?.avatar?.public_id || "User Avatar"}
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
  {user.role === "superAdmin"
    ? "مدیر کل"
    : user.role === "admin"
    ? "مدیر"
    : user.role === "user"
    ? "کاربر"
    : "نامشخص"}
</span>
                  <span className="bg-indigo-100/50 text-indigo-900 border border-indigo-900 px-1.5 !text-xs rounded-primary uppercase">
                    {user.status==="active" ? "فعال" :"غیر فعال" }
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
                <MdWarningAmber className="w-5 h-5" /> این عملیات قابل بازگشت
                نیست!
              </p>
              <p className="flex flex-row gap-x-1 items-center">
                <LuShoppingCart className="h-5 w-5" /> آیتم‌های سبد خرید شما حذف
                خواهند شد!
              </p>
              <p className="flex flex-row gap-x-1 items-center">
                <MdFavoriteBorder className="h-5 w-5" /> آیتم‌های مورد علاقه شما
                حذف خواهند شد!
              </p>
              <p className="flex flex-row gap-x-1 items-center">
                <BiSolidPurchaseTag className="h-5 w-5" /> تعداد{" "}
                {user?.purchases?.length} خرید شما حذف خواهد شد!
              </p>
              <p className="flex flex-row gap-x-1 items-center">
                <TbDoorEnter className="h-5 w-5" /> تعداد{" "}
                {user?.rents?.length} اجاره شما حذف خواهد شد!
              </p>
              <p className="flex flex-row gap-x-1 items-center">
                <MdOutlineReviews className="h-5 w-5" /> تعداد{" "}
                {user?.reviews?.length} نظر شما حذف خواهد شد!
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
              disabled={user?.role === "admin"}
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
}

export default MyProfile;