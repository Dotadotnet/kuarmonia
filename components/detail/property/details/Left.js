import React, { useState, useEffect } from "react";
import Image from "next/image";

const Left = ({ gallery, isLoading }) => {
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (gallery?.length > 0) {
      setMainImage(gallery[0]?.url);
    }
  }, [gallery]); // تغییرات در gallery باعث بروزرسانی تصویر اصلی می‌شود

  return (
    <section className="col-span-1 flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-4">
        {isLoading || !gallery ? (
          <div className="w-full h-[400px] bg-gray-300 dark:bg-gray-600 animate-pulse rounded" />
        ) : (
          <Image
            src={mainImage || "/placeholder.png"}
            alt="Main product"
            width={480}
            height={200}
            className="rounded w-full h-full object-cover"
          />
        )}

        <div className="grid grid-cols-6 gap-3">
          {isLoading || !gallery?.length
            ? Array(6)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="md:w-20 md:h-20 h-14 w-14 bg-gray-300 dark:bg-gray-600 animate-pulse rounded"
                  />
                ))
            : gallery.map((thumbnail, index) => (
                <Image
                  src={thumbnail.url}
                  key={index}
                  alt={thumbnail.public_id}
                  className="rounded object-cover max-w-full w-full h-full cursor-pointer"
                  width={480}
                  height={200}
                  onClick={() => setMainImage(thumbnail.url)} 
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default Left;
