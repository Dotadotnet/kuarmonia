import React from 'react';
import GalleryUpload from "@/components/shared/gallery/GalleryUpload";
import DisplayImages from "@/components/shared/gallery/DisplayImages"; 

const Step3 = ({ setGalleryPreview ,setGallery,register,galleryPreview} ) => { 

    

  return (
    <>
  
      <div className="flex flex-col text-center gap-y-2">
      <GalleryUpload
      setGallery={setGallery}
        setGalleryPreview={setGalleryPreview}
        maxFiles={5}
        register={register("gallery", { required: "آپلود حداقل یک تصویر الزامی است" })}
        title="آپلود تصاویر گالری"
      />

      {/* نمایش پیش‌نمایش تصاویر */}
      <DisplayImages 
      galleryPreview={
        galleryPreview.map((item) => item)
        } 
      imageSize={150} />
      </div>
    </>
  );
};

export default Step3;
