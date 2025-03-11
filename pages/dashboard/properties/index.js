import Panel from "@/layouts/Panel";
import React, { useState, useEffect, useMemo } from "react";
import AddButton from "@/components/shared/button/AddButton";
import {
  useGetPropertiesQuery,
} from "@/services/property/propertyApi";
import { toast } from "react-hot-toast";
import Metrics from "@/components/shared/tools/Metrics";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import { useRouter } from "next/router";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import Pagination from "@/components/shared/pagination/Pagination";
import { useSelector } from "react-redux";
import Image from "next/image";

const Listproperty = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [statusFilter, setStatusFilter] = useState("all");
  const admin = useSelector((state) => state?.auth);
  const { data, isLoading, error, refetch } = useGetPropertiesQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    adminId: admin?._id,
  });

  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;

  const router = useRouter();

  const handlePageChange = (newPage) => {
    console.log("Current Page:", newPage);
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت بلاگ...", { id: "fetch-property" });
    }

    if (data) {
      toast.success(data?.message, { id: "fetch-property" });
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "fetch-property" });
    }
  }, [data, error, isLoading]);
  const handleAddItem = () => {
    router.push("/dashboard/properties/add");
  };

  const onStatusFilterChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1); // بازنشانی صفحه به صفحه اول بعد از تغییر فیلتر
    refetch();
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  return (
    <>
      <Panel>
        {/* نمایش داده‌های بلاگ‌ها */}
        <AddButton onClick={handleAddItem} />

       

        {!data?.data || data?.data.length === 0 || isLoading ? (
          <>
            {[1].map((i) => (
              <SkeletonItem key={i} repeat={5} />
            ))}
          </>
        ) : (
          data?.data?.length > 0 &&
          data?.data?.map((property) => (
            <div
              key={property.id}
              className="mt-4 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2  transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-slate-700 dark:text-white"
              onClick={() => router.push(`/dashboard/propertys/info/${property.id}`)}
            >
              <div className=" col-span-11 lg:col-span-3 text-center flex items-center">
                <StatusIndicator isActive={property.status === "active"} />
                <div className=" py-2 flex flex-row gap-x-2 hover:text-white transition-colors rounded-full cursor-pointer  items-center">
                  {property?.thumbnail ? (
                   <Image
                   src={property?.thumbnail?.url || "/placeholder.png"}
                   height={100}
                   width={100}
                   className="h-[60px] w-[60px] rounded-full object-cover"
                 />
                  ) : (
                    <div className="h-[60px] w-[60px] rounded-full bg-gray-300 animate-pulse"></div> // Skeleton Loader

                  )}

                  <article className="flex-col flex gap-y-2  ">
                    <span className="line-clamp-1 text-base ">
                      <span className="hidden lg:flex">
                        {property?.title}
                      </span>
                      <span className="flex lg:hidden text-right text-sm">
                        {property.title}
                      </span>
                    </span>
                    <span className="text-xs hidden lg:flex">
                      {new Date(property.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                    <span className="text-xs flex lg:hidden">
                      <Metrics
                        gap={3}
                        likeCount={30}
                        dislikeCount={20}
                        views={50}
                        rating={4.5}
                        iconSize={15}
                      />{" "}
                    </span>
                  </article>
                </div>
              </div>

              <div className=" hidden lg:col-span-6 lg:flex text-center lg:first-letter:flex items-center">
                <p className="text-gray-500 dark:text-gray-300">{property.title}</p>
              </div>

              <div className="hidden lg:col-span-2 gap-2 text-center lg:flex justify-center  items-center ">
                <Metrics
                  likeCount={property.likeCount}
                  dislikeCount={property.dislikeCount}
                  views={property.views}
                  rating={property.rating}
                  iconSize={18}
                />
              </div>
            </div>
          ))
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Panel>
    </>
  );
};

export default Listproperty;
