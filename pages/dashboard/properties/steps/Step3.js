import React from "react";
import GalleryUpload from "@/components/shared/gallery/GalleryUpload";
import DisplayImages from "@/components/shared/gallery/DisplayImages";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import { Controller } from "react-hook-form";

const Step3 = ({
  setGalleryPreview,
  setGallery,
  register,
  galleryPreview,
  setThumbnailPreview,
  setThumbnail,
  editorData,
  setEditorData,
  errors,
  useState,
  control
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stripHtmlTags = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };
  return (
    <>
      <label htmlFor="thumbnail" className="flex flex-col text-center gap-y-2">
        تصویر عنوان وبلاگ
        <ThumbnailUpload
          setThumbnailPreview={setThumbnailPreview}
          setThumbnail={setThumbnail}
          register={register("thumbnail", {
            required: "آپلود تصویر عنوان الزامی است"
          })}
          maxFiles={1}
        />
      </label>
      {errors.gallery && (
        <span className="text-red-500 text-sm">{errors.gallery.message}</span>
      )}
      <div className="flex flex-col text-center gap-y-2">
        <GalleryUpload
          setGallery={setGallery}
          setGalleryPreview={setGalleryPreview}
          maxFiles={5}
          register={register("gallery", {
            required: "آپلود حداقل یک تصویر الزامی است"
          })}
          title="آپلود تصاویر گالری"
        />

        {/* نمایش پیش‌نمایش تصاویر */}
        <DisplayImages
          galleryPreview={galleryPreview.map((item) => item)}
          imageSize={150}
        />
      </div>
      <label htmlFor="description" className="flex flex-col gap-y-1 w-full">
        <span className="text-sm">توضیحات   ملک را وارد کنید</span>
        <textarea
          type="text"
          name="description"
          id="description"
          {...register("description", {
            required: "وارد کردن توضیحات الزامی است",
            minLength: {
              value: 3,
              message: "توضیحات باید حداقل ۳ حرف داشته باشد"
            },
            maxLength: {
              value: 460,
              message: "توضیحات نباید بیشتر از ۴۶۰ حرف باشد"
            }
          })}
          placeholder="توضیحات ملک"
          maxLength="460"
          className="p-2 rounded border w-full"

        />
        {errors.description && (
          <span className="text-red-500 text-sm">{errors.description.message}</span>
        )}
      </label>
    </>
  );
};

export default Step3;
