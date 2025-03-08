import Panel from "@/layouts/Panel";
import React, { useState, useEffect } from "react";
import { useGetTagsQuery, useDeleteTagMutation } from "@/services/tag/tagApi";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { toast } from "react-hot-toast";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import Pagination from "@/components/shared/pagination/Pagination";
import { LiaRobotSolid } from "react-icons/lia";
import { MdOutlineTag } from "react-icons/md";
import Image from "next/image";
import Search from "@/components/shared/search";
import Add from "./add";
import Edit from "./edit";
const ListTag = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error, refetch } = useGetTagsQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm
  });
  const [
    removeTag,
    { isLoading: isRemoving, data: deleteTag, error: removeError }
  ] = useDeleteTagMutation();

  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت تگ‌ها...", { id: "tag-loading" });
    }
    if (data?.success) {
      toast.success(data.message, "tag-loading");
      toast.dismiss("tag-loading");
    }

    if (data && !data?.success) {
      toast.error(data?.message, { id: "tag-loading" });
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "tag-loading" });
    }


  }, [data, error, isLoading, isRemoving, removeError]);

  return (
    <>
      <Panel>
        <Search searchTerm={searchTerm} />
        {/* نمایش داده‌های تگ‌ها */}
        <Add />
        <div className="mt-8 w-full grid grid-cols-12 text-slate-400 px-4 ">
          <div className="col-span-11 lg:col-span-3  text-sm">
            <span className="hidden lg:flex">نویسنده</span>
            <span className="flex lg:hidden">نویسنده و عنوان</span>
          </div>
          <div className="col-span-8 lg:col-span-2 hidden lg:flex  text-sm">
            عنوان
          </div>
          <div className="lg:col-span-2 lg:flex hidden text-sm md:block">
            توضیحات
          </div>
          <div className="lg:col-span-2 hidden lg:flex col-span-3 text-sm text-right">
            ربات
          </div>
          <div className="lg:col-span-2 lg:flex col-span-3 justify-right text-right items-center gap-x-1 gap-y-1 flex-wrap hidden text-sm">
            <span className="hidden lg:flex">کلمات کلیدی</span>
          </div>
          <div className="col-span-1 md:block text-sm">عملیات</div>
        </div>

        {isLoading || data?.data.length == 0 ? (
          <SkeletonItem repeat={5} />
        ) : (
          data.data.map((tag) => (
            <div
              key={tag._id}
              className="mt-4 p-2 grid grid-cols-12 rounded-xl min-h-25 border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-gray-800 dark:text-slate-100 "
            >
              <div className="col-span-10 lg:col-span-3 text-center flex items-center">
                <StatusIndicator isActive={tag.status === "active"} />
                <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                  <Image
                    src={tag?.authorId?.avatar?.url || "/placeholder.png"} // تصویر پیش‌فرض در صورت نبودن URL
                    alt="Description of the image"
                    height={100}
                    width={100}
                    className="h-[60px] w-[60px] rounded-full object-cover"
                  />
                  <article className="flex-col flex gap-y-2  ">
                    <span className="line-clamp-1 text-base ">
                      <span className="hidden lg:flex ">
                        {tag?.authorId?.name}
                      </span>
                      <span className=" lg:hidden ">{tag?.title}</span>
                    </span>
                    <span className="text-xs hidden lg:flex">
                      {new Date(tag.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                    <span className=" lg:hidden text-xs line-clamp-1 ">
                      {tag?.description
                        ? tag?.description
                        : new Date(tag.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                  </article>
                </div>
              </div>
              <div className="lg:col-span-1 lg:flex  hidden  text-center  items-center">
                <span className="break-words text-sm lg:text-sm text-right">
                  {tag.title}
                </span>
              </div>
              <div className="lg:col-span-3 lg:flex hidden col-span-3 text-right  items-center">
                <span className="text-sm lg:text-base overflow-hidden text-ellipsis block line-clamp-1 max-h-[1.2em]">
                  {tag.description ? tag.description : "ندارد"}
                </span>
              </div>
              <div className="lg:col-span-2 hidden lg:flex col-span-2 justify-right text-center items-center gap-x-2 text-sm">
                {tag.robots && tag.robots.length > 0
                  ? tag.robots.map((robot, index) => (
                      <span
                        key={index}
                        className="line-clamp-1 flex gap-x-1 cursor-pointer rounded-lg border border-green-700/5 dark:border-blue-500/5 bg-green-800/5 dark:bg-blue-500/5 px-2 py-1 text-green-500 dark:text-blue-500  transition-colors hover:border-green-700/10 dark:hover:border-blue-500/10 hover:bg-green-700/10 dark:hover:bg-blue-500/10 hover:!opacity-100  group-hover:opacity-70   "
                      >
                        <LiaRobotSolid size={22} />
                        {robot.value}
                        {index < tag.robots.length - 1 ? " " : ""}
                      </span>
                    ))
                  : "ندارد"}
              </div>
              <div className="lg:col-span-2 lg:flex hidden justify-right max-h-16   overflow-y-hidden text-right items-center gap-x-1 gap-y-1 flex-wrap  lg:text-sm">
                {tag.keywords?.some((keyword) => keyword.trim())
                  ? tag.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="cursor-pointer rounded-lg border border-green-700/5 dark:border-blue-500/5 bg-green-800/5 dark:bg-blue-500/5 px-2 py-0 text-green-500 dark:text-blue-500 transition-colors hover:border-green-700/10 dark:hover:border-blue-500/10 hover:bg-green-700/10 dark:hover:bg-blue-500/10 flex items-center gap-x-1 hover:!opacity-100 group-hover:opacity-70 text-sm line-clamp-1 max-h-[1.2em]"
                      >
                        <MdOutlineTag />
                        {keyword}
                      </span>
                    ))
                  : "ندارد"}
              </div>

              <div className="col-span-2 md:col-span-1 gap-2  text-center flex justify-center md:items-center items-left">
                <article className="lg:flex-row flex flex-col gap-x-2 justify-left gap-y-2">
                  <Edit id={tag?._id} />
                  <DeleteModal
                    message="آیا از حذف این سوال اطمینان دارید؟"
                    isLoading={isRemoving}
                    onDelete={() => removeTag(tag?._id)}
                  />
                </article>
              </div>
            </div>
          ))
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Panel>
    </>
  );
};

export default ListTag;
