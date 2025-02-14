// components/signup/steps/NameStep.jsx
import React from "react";
import NavigationButton from "@/components/shared/button/NavigationButton";

const NameStep = ({ register, errors, prevStep }) => {
  return (
    <>
      <label htmlFor="name" className="flex flex-col gap-y-1">
        <span className="text-sm">نام و نام خانوادگی</span>
        <input
          type="text"
          name="name"
          id="name"
          {...register("name", {
            required: "وارد کردن نام الزامی است",
            minLength: {
              value: 3,
              message: "نام باید حداقل ۳ حرف داشته باشد",
            },
            maxLength: {
              value: 30,
              message: "نام نباید بیشتر از ۳۰ حرف باشد",
            },
          })}          placeholder="نام"
          maxLength="100"
          className="p-2 rounded border "
        />
        {errors.name && (
          <span className="text-red-500 mr-5 text-sm">{errors.name.message}</span>
        )}
      </label>
      <div className="flex sm:scale-100 scale-90 justify-between sm:mt-8 mt-6">
      </div>
    </>
  );
};

export default NameStep;
