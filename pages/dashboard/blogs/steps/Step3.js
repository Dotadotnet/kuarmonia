// Step3.js
import React from 'react';
import { FaPlus, FaTag } from "react-icons/fa";
import MultiSelectDropdown from "@/components/shared/multiSelectDropdown/MultiSelectDropdown";
import SearchableDropdown from "@/components/shared/dropdownmenu/SearchableDropdown";
import { Controller } from "react-hook-form";
import {TagIcon} from "@/utils/SaveIcon"

const Step3 = ({
  tagsOptions,
  categoryOptions,
  openTagModal,
  openCategoryModal,
  errors,
  control,
  setValue
}) => {
  const handleTagChange = (selectedTags) => {
    setValue("tags", selectedTags);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-2 gap-y-4 w-full">
        {/* بخش تگ‌ها */}
        <div className="flex flex-col gap-y-2 w-full ">
          <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
            <div className="flex flex-col flex-1">
              <label htmlFor="tags" className="flex flex-col gap-y-2 w-full">
                تگ‌ها
                <Controller
                  control={control}
                  name="tags"
                  rules={{ required: 'انتخاب تگ الزامی است' }}
                  render={({ field: { onChange, value } }) => (
                    <MultiSelectDropdown
                      items={tagsOptions}
                      selectedItems={value || []}
                      handleSelect={handleTagChange}
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
                onClick={openTagModal}
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
                onClick={openCategoryModal}
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
            <span className="ml-3 text-right">آیا این بلاگ ویژه است؟</span>
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
    </>
  );
};

export default Step3;
