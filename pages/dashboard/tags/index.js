import Panel from "@/layouts/Panel";
import React, { useState, useEffect } from "react";
import { useGetTagsQuery, useUpdateTagMutation } from "@/services/tag/tagApi";
import AddTag from "./add";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { toast } from "react-hot-toast";
import { FiEdit3, FiTrash } from "react-icons/fi";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import Pagination from "@/components/shared/pagination/Pagination";
import AddButton from "@/components/shared/button/AddButton";
import { LiaRobotSolid } from "react-icons/lia";
import { MdOutlineTag } from "react-icons/md";
import Image from "next/image";

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
  const [updateTag] = useUpdateTagMutation();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = (tag) => {
    setSelectedTag(tag);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedTag(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (tag) => {
    setSelectedTag(tag);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedTag(null);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await updateTag({
        id: selectedTag._id,
        isDeleted: true
      }).unwrap();
      closeDeleteModal();
      if (response.success) {
        toast.success(response.message);
        refetch();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("خطا در حذف تگ");
      console.error("Error deleting tag", error);
    }
  };

  const toggleStatus = async (tagId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      const response = await updateTag({
        id: tagId,
        status: newStatus
      }).unwrap();
      if (response.success) {
        toast.success(response.message);
        refetch();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("خطا در تغییر وضعیت");
      console.error("Error toggling status", error);
    }
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت تگ‌ها...", { id: "tag-loading" });
    }
    if (data && !isLoading) {
      toast.dismiss("tag-loading");
    }
    if (error?.data) {
      toast.error(error?.data?.message, { id: "tag-loading" });
    }
  }, [data, error, isLoading]);

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
        <div className="mt-6 md:flex md:flex-row md:items-center md:justify-between ">
          <AddButton onClick={openAddModal} />
        </div>

        <div className="mt-6 md:flex md:flex-row-reverse md:items-center md:justify-between ">
        <div className="inline-flex overflow-hidden bg-white border rounded-lg   dark:!bg-[#0a2d4d]    dark:border-blue-500 rtl:flex-row">
            <button
              className="px-5 py-2 bg-gray-100 dark:bg-[#0a2d4d] text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm  dark:text-gray-300 hover:bg-gray-100 border-l dark:border-blue-500 dark:hover:bg-gray-700 focus:bg-gray-300 dark:focus:bg-gray-700"
              onClick={() => onStatusFilterChange("all")}
            >
              همه
            </button>
            <button
              className="px-5 py-2 bg-gray-100 dark:bg-[#0a2d4d] text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm  dark:text-gray-300 hover:bg-gray-100 border-l dark:border-blue-500 dark:focus:bg-gray-700 dark:hover:bg-gray-700 focus:bg-gray-300"
              onClick={() => onStatusFilterChange("active")}
            >
              فعال
            </button>
            <button
              className="px-5 py-2 bg-gray-100 dark:bg-[#0a2d4d] text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm  dark:text-gray-300 hover:bg-gray-100  dark:focus:bg-gray-700 dark:hover:bg-gray-700 focus:bg-gray-300"
              onClick={() => onStatusFilterChange("inactive")}
            >
              غیر فعال
            </button>
          </div>

          <div className="relative flex items-center mt-4 md:mt-0">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="جستجو"
              className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        {/* نمایش داده‌های تگ‌ها */}
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
                  <span
                    className="line-clamp-1 cursor-pointer rounded-full border border-green-500/5 bg-green-500/5 p-2 text-green-500 transition-colors hover:border-green-500/10 hover:bg-green-500/10 hover:!opacity-100 group-hover:opacity-70"
                    onClick={() => openEditModal(tag)}
                  >
                    <FiEdit3 className="w-5 h-5" />
                  </span>
                  <span
                    className="line-clamp-1 cursor-pointer rounded-full border border-red-500/5 bg-red-500/5 p-2 text-red-500 transition-colors hover:border-red-500/10 hover:bg-red-500/10 hover:!opacity-100 group-hover:opacity-70"
                    onClick={() => openDeleteModal(tag)}
                  >
                    <FiTrash className="w-5 h-5" />
                  </span>
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
        {isDeleteModalOpen && (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onDelete={handleDelete}
            onClose={closeDeleteModal}
            message={`آیا مطمئن هستید که می‌خواهید تگ "${selectedTag?.title}" را حذف کنید؟`} // نمایش پیام به‌روز شده
          />
        )}

        {/* مودال افزودن/ویرایش */}
        {(isAddModalOpen || isEditModalOpen) && (
          <AddTag
            isOpen={isAddModalOpen || isEditModalOpen}
            onClose={isAddModalOpen ? closeAddModal : closeEditModal}
            onSuccess={refetch}
            tagToEdit={selectedTag}
          />
        )}
      </Panel>
    </>
  );
};

export default ListTag;
