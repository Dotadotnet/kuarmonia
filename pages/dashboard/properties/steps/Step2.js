import React from "react";

const Step2 = ({
  
  register,
  control,
  createDate,
  errors,
  publishDate
}) => {

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <label htmlFor="title" className="flex flex-col gap-y-1 w-full">
        <span className="text-sm">عنوان ملک را وارد کنید</span>
        <input
          type="text"
          name="title"
          id="title"
          {...register("title", {
            required: "وارد کردن عنوان الزامی است",
            minLength: {
              value: 3,
              message: "عنوان باید حداقل ۳ حرف داشته باشد"
            },
            maxLength: {
              value: 45,
              message: "عنوان نباید بیشتر از ۴۵ حرف باشد"
            }
          })}
          placeholder="عنوان ملک"
          maxLength="50"
          className="p-2 rounded border w-full"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </label>

      <label htmlFor="summary" className="flex flex-col gap-y-1 w-full">
        <span className="text-sm">خلاصه ای از ملک را وارد کنید</span>
        <input
          type="text"
          name="summary"
          id="summary"
          {...register("summary", {
            required: "وارد کردن خلاصه الزامی است",
            minLength: {
              value: 3,
              message: "خلاصه باید حداقل ۳ حرف داشته باشد"
            },
            maxLength: {
              value: 150,
              message: "خلاصه نباید بیشتر از ۱۵۰ حرف باشد"
            }
          })}
          placeholder="خلاصه ملک"
          maxLength="150"
          className="p-2 rounded border w-full"
        />
        {errors.summary && (
          <span className="text-red-500 text-sm">{errors.summary.message}</span>
        )}
      </label>

      <label htmlFor="createDate" className="flex flex-col gap-y-2 w-full">
        تاریخ ساخت
        <input
          type="text"
          name="createDate"
          id="createDate"
          className="rounded p-2 border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          {...register("createDate", {
            required: "تاریخ ساخت الزامی است",
            pattern: {
              value: /^\d{1,2}$/, // فقط سال 4 رقمی را قبول می‌کند
              message: "لطفاً سال را به درستی وارد کنید"
            }
          })}
        />
        {errors.createDate && (
          <span className="text-red-500 text-sm">
            {errors.createDate.message}
          </span>
        )}
      </label>
      <label htmlFor="square" className="flex flex-col gap-y-2 w-full">
      مساحت
        <input
          type="text"
          name="square"
          id="square"
          className="rounded p-2 border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          {...register("square", {
            required: "مساحت ساخت الزامی است",
            pattern: {
              value: /^\d{1,2,3,4}$/, 
              message: "لطفاً مساحت را به درستی وارد کنید"
            }
          })}
        />
        {errors.square && (
          <span className="text-red-500 text-sm">
            {errors.square.message}
          </span>
        )}
      </label>
      <label htmlFor="bedroom" className="flex flex-col gap-y-2 w-full">
      تعداد اتاق
        <input
          type="text"
          name="bedroom"
          id="bedroom"
          className="rounded p-2 border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          {...register("bedroom", {
            pattern: {
              value: /^\d{1,2}$/, 
              message: "لطفاً تعداد اتاق را به درستی وارد کنید"
            }
          })}
        />
        {errors.bedroom && (
          <span className="text-red-500 text-sm">
            {errors.bedroom.message}
          </span>
        )}
      </label>
      <label htmlFor="bathroom" className="flex flex-col gap-y-2 w-full">
      تعداد حمام
        <input
          type="text"
          name="bathroom"
          id="bathroom"
          className="rounded p-2 border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          {...register("bathroom", {
            pattern: {
              value: /^\d{1,2,3,4}$/, 
              message: "لطفاً تعداد حمام را به درستی وارد کنید"
            }
          })}
        />
        {errors.bathroom && (
          <span className="text-red-500 text-sm">
            {errors.bathroom.message}
          </span>
        )}
      </label>
     

    
    </>
  );
};

export default Step2;
