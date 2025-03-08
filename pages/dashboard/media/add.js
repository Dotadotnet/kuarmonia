import React, { useState, useEffect, useMemo,useCallback } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import Modal from "@/components/shared/modal/Modal";
import DisplayImages from "@/components/shared/gallery/DisplayImages";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import { toast } from "react-hot-toast";
import {
  useAddMediaMutation,
  useUpdateMediaMutation
} from "@/services/media/mediaApi";
import { useSelector } from "react-redux";
import {  Controller } from "react-hook-form";
import MultiSelectDropdown from "@/components/shared/multiSelectDropdown/MultiSelectDropdown";
import SearchableDropdown from "@/components/shared/dropdownmenu/SearchableDropdown";
import { useGetCategoriesForDropDownMenuQuery } from "@/services/category/categoryApi";
import { useGetTagsForDropDownMenuQuery } from "@/services/tag/tagApi";
import AddCategory from "../categories/add";
import AddTag from "../tags/add";
import {TagIcon} from "@/utils/SaveIcon"
import { FaPlus } from "react-icons/fa";
const AddMedia = ({ isOpen, onClose, onSuccess, mediaToEdit = null }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors }
  } = useForm();
  const [addMedia, { isLoading: isAdding, data: addData, error: addError }] = useAddMediaMutation();
  const [updateMedia, { isLoading: isUpdating, data: updateData, error: updateError }] = useUpdateMediaMutation();
  const { data: categoriesData, refetch: refetchCategories } = useGetCategoriesForDropDownMenuQuery();
    const { data: tagsData, refetch: refetchTags } =
      useGetTagsForDropDownMenuQuery();
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [url, setUrl] = useState(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [media, setMedia] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const user = useSelector((state) => state?.auth);
  useEffect(() => {
    if (mediaToEdit) {
      setValue("title", mediaToEdit.title);
      setValue("description", mediaToEdit.description);
      setThumbnailPreview(mediaToEdit.thumbnail);
      setMediaPreview(mediaToEdit.media);
      setIsFeatured(mediaToEdit.isFeatured);
      setVisibility(mediaToEdit.visibility);
    } else {
      reset();
    }
  }, [mediaToEdit, setValue, reset]);

  const defaultValues = useMemo(() => {
    return {
      name: user?.name,
      avatar: user?.avatar,
      id: user?._id
    };
  }, [user]);

  const categories = Array.isArray(categoriesData?.data) ? categoriesData.data : [];
  const tags = Array.isArray(tagsData?.data) ? tagsData.data : [];

  const categoryOptions = categories?.map(category => ({
    id: category._id,
    value: category.title,
  }));
  const tagsOptions = tags?.map((tag) => ({
    id: tag._id,
    value: tag.title,
    description: tag.description,
  }));

  const closeCategoryModal = useCallback(() => setIsCategoryModalOpen(false), []);
  const handleCategoryAdded = useCallback(() => refetchCategories(), [refetchCategories]);
  const openCategoryModal = useCallback(() => setIsCategoryModalOpen(true), []);
  const closeTagModal = useCallback(() => setIsTagModalOpen(false), []);
  const handleTagAdded = useCallback(() => refetchTags(), [refetchTags]);
  const openTagModal = useCallback(() => setIsTagModalOpen(true), []);
  const handleAddOrUpdateMedia = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("thumbnail", thumbnail);
    formData.append("media", media);
    formData.append("isFeatured", data.isFeatured);
    formData.append("category", data.category);
    formData.append("visibility", data.visibility);
    formData.append("authorId", user?._id);
    formData.append("tags[]", JSON.stringify(data.tags));

    try {
      if (mediaToEdit) {
        await updateMedia({ id: mediaToEdit._id, ...formData }).unwrap();
      } else {
        await addMedia(formData).unwrap();
      }
    } catch (error) {
      console.error("Error: ", error);
    }

  };

  useEffect(() => {
    const isLoading = isAdding || isUpdating;
    const data = addData || updateData;
    const error = addError || updateError;
    if (isLoading) {
      toast.loading("در حال پردازش...", { id: "media" });
    }

    if (data?.success) {
      toast.success(data?.message, { id: "media" });
      reset();
      onSuccess();
      onClose();
    }
    if (error?.data) {
      toast.error(error?.data?.message, { id: "media" });
    }
  }, [addData, updateData, addError, updateError, isAdding, isUpdating, reset, onSuccess]);
  const handleTagChange = (selectedTags) => {
    setValue("tags", selectedTags);
  };
console.log(mediaToEdit?.tags)
  return (
    <>

    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="lg:w-1/3 md:w-1/3 w-full z-50"
    >
      <form
        className="text-sm flex flex-col gap-y-4"
        onSubmit={handleSubmit(handleAddOrUpdateMedia)}
      >
        <div className="flex flex-col gap-y-2">
          {/* عنوان */}
          <label htmlFor="title" className="flex flex-col gap-y-1 w-full">
            <span className="text-sm">عنوان</span>
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
                  value: 50,
                  message: "عنوان نباید بیشتر از ۵۰ حرف باشد"
                }
              })}
              placeholder="عنوان رسانه"
              maxLength="50"
              className="p-2 rounded border w-full"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">
                {errors.title.message}
              </span>
            )}
          </label>

          {/* توضیحات */}
          <label htmlFor="description">
            توضیحات
            <textarea
              id="description"
              {...register("description", {
                required: "توضیحات الزامی است",
                minLength: {
                  value: 10,
                  message: "توضیحات باید حداقل ۱۰ کاراکتر داشته باشد."
                },
                maxLength: {
                  value: 500,
                  message: "توضیحات نباید بیشتر از ۵۰۰ کاراکتر باشد."
                }
              })}
              className="rounded h-32 w-full"
              placeholder="توضیحات رسانه را تایپ کنید..."
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </label>
          <div className="flex flex-col gap-y-2 w-full ">
          <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
            <div className="flex flex-col flex-1">
              <label htmlFor="tags" className="flex flex-col gap-y-2 w-full">
                تگ‌ها
                <Controller
                  control={control}
                  name="tags"
                  rules={{ required: 'انتخاب تگ الزامی است' }}
                  render={({ field: {value} }) => (
                    <MultiSelectDropdown
                      items={tagsOptions}
                      selectedItems={
                        mediaToEdit?.tags?.map(tag => ({
                          id: tag._id,
                          title: tag.title
                        })) || value
                      }
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
                      value={mediaToEdit?.category||value}
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

          {/* آپلود تصویر */}
          <ThumbnailUpload
              setThumbnailPreview={setMediaPreview}
              setThumbnail={setMedia}
              name="media"
              title="یک رسانه پویا انتخاب کنید"
              register={register('media')}
              maxFiles={1}
              />
              {errors.media && (
                <span className="text-red-500">{errors.media.message}</span>
              )}
            {mediaPreview && <DisplayImages galleryPreview={[mediaPreview]} imageSize={150} />}
       
  {/* آپلود تصویر */}
            <ThumbnailUpload
              setThumbnailPreview={setThumbnailPreview}
              setThumbnail={setThumbnail}
              name="Thumbnail"
              register={register('media')}
              title="یک تصویر بند انگشتی انتخاب کنید"
              maxFiles={1}
              />
              {errors.Thumbnail && (
                <span className="text-red-500">{errors.Thumbnail.message}</span>
              )}
            {thumbnailPreview && <DisplayImages galleryPreview={[thumbnailPreview]} imageSize={150} />}
       
          <div className="flex flex-row justify-between">


          {/* رسانه ویژه */}
          <div className="flex flex-col gap-y-2 w-full ">
            <label className="inline-flex items-center cursor-pointer justify-start w-full">
              <span className="ml-3 text-right">آیا این رسانه ویژه است؟</span>
              <input
                type="checkbox"
                className="sr-only peer"
                id="isFeatured"
                {...register("isFeatured")}
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex flex-col gap-y-2 w-full flex-end">
            <label className="inline-flex items-center cursor-pointer justify-start w-full">
              <span className="ml-3 text-right">محتوای خصوصی</span>
              <input
                type="checkbox"
                className="sr-only peer"
                id="visibility"
                {...register("visibility")}
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-blue-600"></div>
            </label>
          </div>
          </div>

          {/* دکمه ارسال */}
          <Button
            type="submit"
            className="py-2 mt-4"
            isLoading={isAdding || isUpdating}
          >
            {mediaToEdit ? "ویرایش کردن" : "ایجاد کردن"}
          </Button>
        </div>
      </form>
    </Modal>

    <AddCategory
        isOpen={isCategoryModalOpen}
        onClose={closeCategoryModal}
        onSuccess={handleCategoryAdded}
      />
      {/* مدال افزودن تگ */}
      <AddTag
        isOpen={isTagModalOpen}
        onClose={closeTagModal}
        onSuccess={handleTagAdded}
      />
    </>
  );
};

export default AddMedia;
