import React, { useState, useMemo } from "react";
import { useGetAllPropertysQuery } from "@/services/property/propertyApi";
import Pagination from "@/components/shared/pagination/Pagination";
import SkeletonCard from "@/components/shared/card/SkeletonCard";
import { useRouter } from "next/router";
import Image from "next/image";

const PropertyCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const { isLoading, data, error } = useGetAllPropertysQuery({ page: 1, limit: 8 });
  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;
  const propertys = useMemo(() => data?.data || [], [data]);
  const superAdmin = useMemo(() => data?.superAdmin || [], [data]);
  const router = useRouter();

  return (
    <>
      <section className="grid lg:grid-cols-4  md:grid-cols-2 grid-cols-1 gap-4">
        {propertys?.length === 0 || isLoading
          ? Array.from({ length: 8 }, (_, index) => (
              <SkeletonCard key={index} />
            ))
          : propertys.map((property, index) => (
              <div
                key={index}
                className="group flex flex-col gap-y-4 border rounded h-fit break-inside-avoid bg-white transition-color ease-linear delay-100 hover:border-primary relative"

                onClick={() => router.push(`/property/${property.id}`)}
              >
                <Image
                  src={property.featuredImage?.url}
                  alt={property.title}
                  height={427}
                  width={350}
                  className="rounded-t w-full object-cover"
                />

                <article className="flex flex-col gap-y-2.5 px-4 pb-4 relative">
                  {property.isFeatured && (
                    <span
                      className="absolute px-2 py-0.5 text-xs top-0 left-0  "
                      title="ویژه"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="-mt-0.5 h-5 w-5 text-yellow-700"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  )}
                  <h2 className="text-lg line-clamp-1">{property.title}</h2>
                  <div className="mt-auto flex flex-col gap-y-2.5">
                    <p className="text-sm line-clamp-4 text-justify">
                      {property.description || "توضیح یافت نشد"}
                    </p>
                    <div className="text-xs border border-secondary transition-colors ease-linear delay-100 group-hover:border-primary dark:group-hover:border-blue-500 px-1  py-0.5 rounded-primary text-slate-500 flex items-center justify-between relative">
                      <span>
                        {new Date(property.publishDate).toLocaleDateString(
                          "fa-IR",
                          {
                            weekday: "long"
                          }
                        )}{" "}
                        -{" "}
                        {new Date(property.publishDate).toLocaleDateString("fa-IR")}
                      </span>
                      <div className="flex items-center space-x-3">
                        <Image
                          alt={property?.authorId?.name || "Default alt text"}
                          title={property?.authorId?.name}
                          src={property?.authorId?.avatar?.url}
                          width={36} 
                          height={36}
                          className="relative inline-block rounded-full border-2 border-white object-cover object-center hover:z-10"
                        />
                        {property?.authorId?.name !== superAdmin?.name && (
                          <Image
                            alt={property?.authorId?.name || "Default alt text"}
                            title={property?.authorId?.name}
                            src={property?.authorId?.avatar?.url}
                            width={36}
                            height={36} // ارتفاع تصویر
                            className="relative inline-block rounded-full border-2 border-white object-cover object-center hover:z-10"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
      </section>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default PropertyCard;
