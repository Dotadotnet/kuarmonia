// AddType.jsx
import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import { useAddTypeMutation, useUpdateTypeMutation } from "@/services/type/typeApi";
import { Minus, Plus } from "@/utils/SaveIcon";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import { useSelector } from "react-redux";

const AddType = ({ isOpen, onClose, onSuccess, typeToEdit = null }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [addType, { isLoading: isAdding, data: addData, error: addError }] = useAddTypeMutation();
  const [features, setFeatures] = useState([""]);

  const [updateType, { isLoading: isUpdating, data: updateData, error: updateError }] = useUpdateTypeMutation();
  const admin = useSelector((state) => state?.auth);

  // مقداردهی اولیه برای ویرایش
  useEffect(() => {
    if (typeToEdit) {
      setValue("title", typeToEdit.title);
      setValue("description", typeToEdit.description);
      setFeatures(typeToEdit.features || [""]); // مقداردهی امکانات
    } else {
      reset();
      setFeatures([""]); // مقداردهی اولیه امکانات در صورت اضافه‌کردن نوع جدید
    }
  }, [typeToEdit, setValue, reset]);

  // افزودن ویژگی جدید
  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  // حذف ویژگی
  const handleRemoveFeature = (index) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    setFeatures(updatedFeatures);
  };

  // تغییر مقدار ویژگی
  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };

  // ارسال اطلاعات برای ایجاد یا ویرایش
  const handleAddOrUpdateType = async (formData) => {
    try {
      const finalData = {
        ...formData,
        authorId: admin?._id,
        features, // ارسال ویژگی‌ها به‌صورت آرایه
      };

      if (typeToEdit) {
        await updateType({ id: typeToEdit._id, ...finalData }).unwrap();
      } else {
        await addType(finalData).unwrap();
      }
    } catch (err) {
      console.error("خطا در هنگام پردازش نوع ملک: ", err);
      toast.error("خطا در هنگام پردازش نوع ملک");
    }
  };

  // نمایش پیام‌های پردازش و موفقیت یا خطا
  useEffect(() => {
    if (isAdding || isUpdating) {
      toast.loading("در حال پردازش...", { id: "type" });
    }

    if ((addData?.success || updateData?.success) && !addError && !updateError) {
      toast.success((addData || updateData).message, { id: "type" });
      reset();
      setFeatures([""]); // ریست کردن ویژگی‌ها بعد از موفقیت
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    }

    if (addError?.data || updateError?.data) {
      toast.error((addError?.data || updateError?.data)?.message, { id: "type" });
    }
  }, [addData, updateData, addError, updateError, isAdding, isUpdating, reset, onClose, onSuccess]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="lg:w-1/3 md:w-1/2 w-full z-50">
      <form className="text-sm w-full h-full flex flex-col gap-y-4" onSubmit={handleSubmit(handleAddOrUpdateType)}>
        <div className="flex gap-4 flex-col">
          {/* فیلد عنوان */}
          <label htmlFor="title" className="flex flex-col gap-y-2">
            عنوان
            <input
              type="text"
              name="title"
              id="title"
              maxLength={50}
              placeholder="عنوان نوع ملک را تایپ کنید..."
              className="rounded"
              autoFocus
              {...register("title", { required: "عنوان الزامی است" })}
            />
          </label>

          {/* فیلد توضیحات */}
          <label htmlFor="description" className="flex flex-col gap-y-2">
            توضیحات
            <textarea
              name="description"
              id="description"
              maxLength={200}
              placeholder="توضیحات نوع ملک را تایپ کنید..."
              className="rounded h-32"
              {...register("description")}
            />
          </label>

          {/* امکانات ملک */}
          <label className="flex flex-col gap-y-2">
            امکانات
            {features.map((feature, index) => (
              <div key={index} className="flex flex-row items-center gap-x-2">
                <input
                  type="text"
                  name={`features[${index}]`}
                  placeholder="امکانات را وارد کنید"
                  maxLength="100"
                  defaultValue={feature}
                  {...register(`features[${index}]`, {
                    required: "امکانات الزامی است",
                    minLength: { value: 2, message: "امکانات باید حداقل ۲ کاراکتر باشد" },
                    maxLength: { value: 100, message: "امکانات نباید بیشتر از ۱۰۰ کاراکتر باشد" },
                  })}
                  className="flex-1 p-2 rounded border"
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                />
                {/* دکمه حذف */}
                {index > 0 && (
                  <span
                    className="cursor-pointer p-1 border dark:border-gray-900 rounded-full bg-red-500 text-white"
                    onClick={() => handleRemoveFeature(index)}
                  >
                    <Minus />
                  </span>
                )}
                {/* دکمه اضافه کردن */}
                {index === features.length - 1 && (
                  <span
                    className="cursor-pointer p-1 border rounded-full bg-green-500 dark:border-gray-900 text-white"
                    onClick={handleAddFeature}
                  >
                    <Plus />
                  </span>
                )}
              </div>
            ))}
          </label>

          {/* دکمه ارسال */}
          <Button type="submit" className="py-2 mt-4">
            {typeToEdit ? "ویرایش کردن" : "ایجاد کردن"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddType;
