// Step5.js
import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step6 = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <>
      <h2 className="text-xl font-bold mb-4">تنظیمات</h2>
      <label htmlFor="metaTitle" className="flex flex-col gap-y-1 w-full"> 
        <span className="text-sm">عنوان متا را وارد کنید</span>
        <input
          type="text"
          name="metaTitle"
          id="metaTitle"
          {...register("metaTitle", {
            minLength: {
              value: 3,
              message: "عنوان متا باید حداقل ۳ حرف داشته باشد",
            },
            maxLength: {
              value: 60,
              message: "عنوان متا نباید بیشتر از ۶۰ حرف باشد",
            },
          })}
          placeholder="عنوان متا بلاگ" 
          maxLength="60"
          className="p-2 rounded border w-full"
        />
        {errors.metaTitle && ( 
          <span className="text-red-500 text-sm">{errors.metaTitle.message}</span>
        )}
      </label>

      <label htmlFor="metaDescription" className="flex flex-col gap-y-2 w-full mt-4">
        <span className="text-sm">توضیحات متا را وارد کنید</span>
        <textarea
          name="metaDescription"
          id="metaDescription"
          maxLength={160}
          placeholder="توضیحات متا را تایپ کنید..."
          className="p-2 rounded h-[170px] border w-full form-textarea"
          {...register("metaDescription", { 
            minLength: {
              value: 20,
              message: "توضیحات متا باید حداقل ۲۰ حرف داشته باشد",
            },
            maxLength: {
              value: 160,
              message: "توضیحات متا نباید بیشتر از ۱۶۰ حرف باشد",
            },
          })}
        />
        {errors.metaDescription && ( 
          <span className="text-red-500 text-sm">{errors.metaDescription.message}</span>
        )}
      </label>
       {/* بلاگ ویژه بودن */}
      
    </>
  );
};

export default Step6;
