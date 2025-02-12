// PreviewSection.js
import React, { useState, useRef, useEffect } from "react";
import { BsArrowsFullscreen } from "react-icons/bs";
import Content from "@/components/shared/content/Content";
import { toggleFullscreen } from '@/utils/functionHelpers';

const PreviewSection = ({
  watch,
  thumbnailPreview,
  isLoading,
  handleImageLoad,
  publishDate,
  editorData,
  selectedTags,
  defaultValues,
  author,
  avatar
}) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const previewRef = useRef(null);


  const handleToggleFullscreen = () => {
    toggleFullscreen(previewRef);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement === previewRef.current) {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  console.log("selectedTags",selectedTags)
  return (
    <div
    className={`flex-1 px-4 pt-10 rounded-xl bg-white dark:bg-gray-800  h-[550px] dark:text-gray-100  
      ${isFullscreen ? "fixed inset-0  " : "relative"} overflow-y-auto scrollbar-hide relative`}
    ref={previewRef}
  >
    <button
  className={`p-3   ${isFullscreen ? 'hidden' : '' } rounded-full shadow-lg cursor-pointer bg-white dark:bg-gray-800 z-20 absolute left-1/2 top-4 transform -translate-x-1/2 dark:text-gray-100`}
  onClick={handleToggleFullscreen}
>
  {isFullscreen ? (
    <></>
  ) : (
    <BsArrowsFullscreen size={20} />
  )}
</button>
    <div
    className={`mt-8`}

  >
    <Content
        title={watch("title")}
        content={watch("content")}
        featureImage={thumbnailPreview}
        isLoading={isLoading}
        publishDate={watch("publishDate")}
        author={author}
        avatar={avatar}
        selectedTags={selectedTags}

    />
  </div>
  </div>
  
  );
};

export default PreviewSection;
