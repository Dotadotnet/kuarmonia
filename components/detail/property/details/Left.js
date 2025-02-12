import React, { useState } from "react";
import Image from "next/image";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";

const Left = ({ thumbnail, gallery, isLoading }) => {
  // مدیریت تصویر اصلی
  const [mainImage, setMainImage] = useState(thumbnail?.url);

  return (
    <section className="lg:col-span-6 md:col-span-6 col-span-12 flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-4">
        {isLoading || !mainImage ? (
          <>
          <SkeletonImage width={411} height={400} className="rounded w-full h-full" />
          </>
        ) : (
          <Image
            src={mainImage}
            alt="Main product"
            width={480}
            height={200}
            className="rounded w-full h-full object-cover"
          />
        )}

        <div className="grid grid-cols-7 gap-4 ">
        {isLoading || !gallery?.length
            ? Array(7)
                .fill(0)
                .map((_, index) => (
                  <SkeletonImage
                    key={index}
                    width={70}
                    height={70}
                    className="rounded object-cover w-full h-full"
                  />
                ))
            : gallery?.map((thumbnail, index) => (
                <Image
                  src={thumbnail?.url}
                  key={index}
                  alt={thumbnail?.public_id}
                  className="rounded object-cover max-w-full w-full h-full cursor-pointer"
                  width={480}
                  height={200}
                  onClick={() => setMainImage(thumbnail?.url)}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default Left;
