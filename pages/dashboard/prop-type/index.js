import React, { useState, useEffect, useMemo } from "react";
import Panel from "@/layouts/Panel";
import {
  useGetTypesQuery,
  useUpdateTypeMutation
} from "@/services/type/typeApi";
import AddType from "./add";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { toast } from "react-hot-toast";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import AddButton from "@/components/shared/button/AddButton";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import { FiEdit3, FiTrash } from "react-icons/fi";
import Pagination from "@/components/shared/pagination/Pagination";
import Image from 'next/image'

const ListType = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error, refetch } = useGetTypesQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm
  });
  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;
  const [updateType] = useUpdateTypeMutation();
  const categories = useMemo(
    () => (Array.isArray(data?.data) ? data.data : []),
    [data]
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = (type) => {
    setSelectedType(type);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedType(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (type) => {
    setSelectedType(type);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedType(null);
    setIsDeleteModalOpen(false);
  };

  const openInfoModal = (type) => {
    setSelectedType(type);
    setIsInfoModalOpen(true);
  };
  const closeInfoModal = () => {
    setSelectedType(null);
    setIsInfoModalOpen(false);
  };

  const handleDelete = async () => {
    const typeToDelete = selectedType;
    try {
      const response = await updateType({
        id: typeToDelete._id,
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
      toast.error(error.message || "خطا در حذف دسته‌بندی");
      console.error("Error deleting type", error);
    }
  };


  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت دسته بندی...", { id: "type-loading" });
    }

    if (data && !isLoading) {
      toast.dismiss("type-loading");
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "type-loading" });
    }
  }, [data, error, isLoading]);
  const onStatusFilterChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1); 
    refetch();
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  return (
    <>
      <Panel>
        {/* دکمه افزودن دسته‌بندی */}
        <AddButton onClick={openAddModal} />
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
              placeholder="Search"
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
          <div className="lg:col-span-4 lg:flex hidden text-sm md:block">
            توضیحات
          </div>
          <div className="lg:col-span-2 lg:flex hidden text-sm md:block">
            اسلاگ
          </div>

          <div className="col-span-1 md:block text-sm">عملیات</div>
        </div>

        {/* نمایش داده‌های دسته‌بندی‌ها */}
        {isLoading || (categories && categories.length == 0) ? (
          <SkeletonItem repeat={5} />
        ) : (
          categories.map((type) => (
            <div
              key={type._id}
              className="mt-4 p-1 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-gray-800 dark:text-slate-100"
            >
              <div className="col-span-10 lg:col-span-3 text-center flex items-center">
                <StatusIndicator isActive={type.status === "active"} />
                <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                  <Image
                    src={type?.authorId?.avatar.url}
                    alt={``}
                    height={100}
                    width={100}
                    className="h-[60px] w-[60px] rounded-full object-cover"
                  />
                  <article className="flex-col flex gap-y-2  ">
                    <span className="line-clamp-1 text-base ">
                      <span className="hidden lg:flex ">
                        {type?.authorId?.name}
                      </span>
                      <span className=" lg:hidden ">{type?.title}</span>
                    </span>
                    <span className="text-xs hidden lg:flex">
                      {new Date(type.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                    <span className=" lg:hidden text-xs  line-clamp-1">
                      {type?.description
                        ? type?.description
                        : new Date(type.createdAt).toLocaleDateString(
                            "fa-IR"
                          )}
                    </span>
                  </article>
                </div>
              </div>
              <div className="lg:col-span-2 hidden gap-2 lg:flex justify-left items-center text-right">
                <article className="flex-col flex gap-y-2">
                  <span className="text-sm lg:text-base overflow-hidden text-ellipsis line-clamp-1">
                    <span className="flex">{type.title}</span>
                  </span>
                </article>
              </div>

              <div className="lg:col-span-4 hidden gap-2 lg:flex justify-left items-center text-right">
                <article className="flex-col flex gap-y-2">
                  <span className="text-sm lg:text-base overflow-hidden text-ellipsis block line-clamp-1 max-h-[1.2em]">
                    {type.description}
                  </span>
                </article>
              </div>

              <div className="hidden lg:col-span-2 col-span-5 gap-2 text-right lg:flex justify-left items-center">
                <article className="flex-col flex gap-y-2">
                  <span className="flex text-right">{type.slug}</span>
                </article>
              </div>

              <div className="col-span-2 md:col-span-1 gap-2 text-center flex justify-center items-center">
                <article className="lg:flex-row flex flex-col justify-center gap-x-2  gap-y-2">
                  <span
                    className="edit-button "
                    onClick={() => openEditModal(type)}
                  >
                    <FiEdit3 className="w-5 h-5" />
                  </span>
                  <span
                    className="delete-button"
                    onClick={() => openDeleteModal(type)}
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

        {/* مودال حذف */}
        {isDeleteModalOpen && (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onDelete={handleDelete}
            onClose={closeDeleteModal}
            message={`آیا مطمئن هستید که می‌خواهید دسته‌بندی "${selectedType?.title}" را حذف کنید؟`} // نمایش پیام به‌روز شده
          />
        )}

        {/* مودال ویرایش */}
        {isEditModalOpen && (
          <AddType
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            onSuccess={refetch}
            typeToEdit={selectedType}
          />
        )}

        {/* مودال جزئیات */}
        {isInfoModalOpen && (
          <Modal
            isOpen={isInfoModalOpen}
            onClose={closeInfoModal}
            className="lg:w-1/3 md:w-1/2 w-full z-50"
          >
            <Info type={selectedType} onClose={closeInfoModal} />
          </Modal>
        )}

        {/* مودال افزودن */}
        {isAddModalOpen && (
          <AddType
            isOpen={isAddModalOpen}
            onClose={closeAddModal}
            onSuccess={refetch}
          />
        )}
      </Panel>
    </>
  );
};

export default ListType;
