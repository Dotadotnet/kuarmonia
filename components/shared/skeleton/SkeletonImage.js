import React from "react";

const SkeletonImage = ({
  showSize = false,
<<<<<<< HEAD
  width = null,
  height = null,
=======
  width = "100%",
  height = "100%",
>>>>>>> origin/master
  borderRadius = "rounded-none",
  className = "",
}) => {
  return (
    <div
<<<<<<< HEAD
      className={`relative ${borderRadius} w-full h-full ${className} `}
    >
      <div className={`absolute ${borderRadius} flex justify-center items-center top-0 left-0 w-full h-full bg-gray-300 dark:bg-gray-600 animate-pulse`}></div>
      {showSize && (
        <div className=" absolute inset-0 mt-30 flex justify-center items-center text-6xl text-gray-600">
           {`${height} × ${width}`}
=======
      className={`relative ${borderRadius} ${className}`}
      style={{ width: `${width}`, height: `${height}` }}
    >
      <div className={`absolute top-0 left-0 w-full h-full bg-gray-300 dark:bg-gray-600 animate-pulse ${borderRadius}`} />
      {showSize && (
        <div className="absolute inset-0 flex justify-center items-center text-sm text-gray-600">
          {`${width} × ${height}`}
>>>>>>> origin/master
        </div>
      )}
    </div>
  );
};

export default SkeletonImage;
