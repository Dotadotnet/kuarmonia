// Step4.js
import React from 'react';
import SearchableDropdown from "@/components/shared/dropdownmenu/SearchableDropdown";
import { useFieldArray, Controller } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import SocialInformationField from './SocialInformationField';
import { toast } from "react-hot-toast";
import {  FaPlus } from 'react-icons/fa';
import MultiSelectDropdown from '@/components/shared/multiSelectDropdown/MultiSelectDropdown';
import { useGetCategoriesForDropDownMenuQuery } from "@/services/category/categoryApi";
import { useGetTagsForDropDownMenuQuery } from "@/services/tag/tagApi";
import { TagIcon } from '@/utils/SaveIcon';
const Step5 = ({ register, errors, control,getValues }) => {
  const {
    fields: informationFields,
    append: informationAppend,
    remove: informationRemove,
  } = useFieldArray({
    control,
    name: "socialLinks",
  });
    const { data: categoriesData, refetch: refetchCategories } =
      useGetCategoriesForDropDownMenuQuery();
    const { data: tagsData, refetch: refetchTags } =
      useGetTagsForDropDownMenuQuery();
    const categories = Array.isArray(categoriesData?.data)
      ? categoriesData.data
      : [];
    const tags = Array.isArray(tagsData?.data) ? tagsData.data : [];
 
  
  const categoryOptions = categories?.map((category) => ({
    id: category._id,
    value: category.title,
    description: category.description
  }));
  const tagsOptions = tags?.map((tag) => ({
    id: tag._id,
    value: tag.title,
    description: tag.description
  }));
  const maxInformationCount = 3; // حداکثر تعداد لینک‌ها


  return (
    <>
    <div className="flex flex-col items-center justify-between gap-2 gap-y-4 w-full">
        {/* بخش تگ‌ها */}
        <div className="flex flex-col gap-y-2 w-full ">
          <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
            <div className="flex flex-col flex-1">
              <label htmlFor="tags" className="flex flex-col gap-y-2 ">
                تگ‌ها
                <Controller
                  control={control}
                  name="tags"
                  rules={{ required: 'انتخاب تگ الزامی است' }}
                  render={({ field: { onChange, value } }) => (
                    <MultiSelectDropdown
                      items={tagsOptions}
                      selectedItems={value || []}
                      handleSelect={onChange} 

                      icon={<TagIcon />}
                      placeholder="چند مورد انتخاب کنید"
                      className={"w-full h-12"}
                    />
                  )}
                />
              </label>
            </div>
            <div className="mt-7 flex justify-start">
              <button
                type="button"
                className="p-4 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
                aria-label="افزودن تگ جدید"
              >
                <FaPlus />
              </button>
            </div>
          </div>
          {errors.tags && (
            <span className="text-red-500 text-sm">{errors.tags.message}</span>
          )}
        </div>

        {/* بخش دسته‌بندی */}
        <div className="flex flex-col gap-y-2 w-full ">
          <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
            <div className="flex flex-col flex-1">
              <label htmlFor="category" className="flex flex-col gap-y-2">
                دسته‌بندی
                <Controller
                  control={control}
                  name="category"
                  rules={{ required: 'انتخاب دسته‌بندی الزامی است' }}
                  render={({ field: { onChange, value } }) => (
                    <SearchableDropdown
                    items={categoryOptions}
                      handleSelect={onChange}
                      value={value}
                      sendId={true}
                      errors={errors.category}
                      className={"w-full h-12"}
                    />
                  )}
                />
              </label>
            </div>
            <div className="mt-7 flex justify-start">
              <button
                type="button"
                className="p-4 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
                aria-label="افزودن دسته‌بندی جدید"
              >
                <FaPlus />
              </button>
            </div>
          </div>
          {errors.category && (
            <span className="text-red-500 text-sm">{errors.category.message}</span>
          )}
        </div>

        {/* بخش بلاگ ویژه بودن */}
        <div className="flex flex-col gap-y-2 w-full ">
          <label className="inline-flex items-center cursor-pointer justify-start w-full">
            <span className="ml-3 text-right">آیا این ملک ویژه است؟</span>
            <input
              type="checkbox"
              className="sr-only peer"
              id="isFeatured"
              {...control.register('isFeatured')}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
          </label>
        </div>
      </div>
     
      {/* افزودن لینک شبکه‌های اجتماعی */}
      <label htmlFor="socialLinks" className="flex w-full flex-col gap-y-2">
        افزودن لینک شبکه های اجتماعی*
        <div className="flex flex-col gap-y-4">
          {informationFields.map((field, index) => (
            <SocialInformationField
              key={field.id}
              control={control}
              register={register}
              index={index}
              remove={informationRemove}
              errors={errors}
              getValues={getValues}
            />
          ))}

          {/* دکمه افزودن */}
          <button
            type="button"
            className="bg-green-100 dark:bg-blue-100 border border-green-900 dark:border-blue-900 text-green-900 dark:text-blue-900 py-1 rounded-secondary flex flex-row gap-x-1 items-center px-2 w-fit text-xs"
            onClick={() => {
              if (informationFields.length < maxInformationCount) {
                informationAppend({ name: "FaInstagram" });
              } else {
                toast.error(`شما نمی‌توانید بیش از ${maxInformationCount} مورد اضافه کنید.`);
              }
            }}
          >
            <FiPlus className="w-4 h-4" /> افزودن
          </button>
        </div>
      </label>
    </>
  );
};

export default Step5;
