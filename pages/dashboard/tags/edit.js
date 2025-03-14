import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import MultiSelectDropdown from "@/components/shared/multiSelectDropdown/MultiSelectDropdown";
import { useGetTagQuery, useUpdateTagMutation } from "@/services/tag/tagApi";
import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import { LiaRobotSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { Plus, Minus } from "@/utils/SaveIcon";
import { FiEdit3 } from "react-icons/fi";

const EditTag = ({ id }) => {
  const { register, handleSubmit, reset } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const admin = useSelector((state) => state?.auth);
  const { isLoading, data, error } = useGetTagQuery(id, { skip: !isOpen });
  const tag = useMemo(() => data?.data || {}, [data]);

  const [keynotes, setKeynotes] = useState([]);

  useEffect(() => {
    if (tag?.keywords) {
      setKeynotes(tag.keywords);
    }
  }, [tag?.keywords]);
  const [
    updateTag,
    { isLoading: isUpdating, data: updateData, error: updateError }
  ] = useUpdateTagMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت  ...", { id: "tag-loading" });
    } else {
      toast.dismiss("tag-loading");
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "tag-loading" });
    }

    if (isUpdating) {
      toast.loading("در حال پردازش...", { id: "tag-update" });
    }

    if (updateData?.success) {
      toast.success(updateData?.message, { id: "tag-update" });
      reset();
      setIsOpen(false);
    }

    if (updateData && !updateData?.success) {
      toast.error(updateData?.message, { id: "tag-update" });
    }

    if (updateError?.data) {
      toast.error(updateError?.message, { id: "tag-update" });
    }
  }, [data, error, isLoading, updateData, updateError, isUpdating, reset]);

  const handleUpdateTag = (formData) => {
    formData = {
      ...formData,
      robots: selectedOptions.map((option) => ({
        value: option
      })),
      keynotes: JSON.stringify(keynotes),
      creator: admin?._id
    };

    updateTag(formData).unwrap();
  };

  const robotOptions = [
    {
      _id: 1,
      value: "index",
      label: "Index",
      tooltip: "اجازه می‌دهد موتورهای جستجو صفحه را ایندکس کنند"
    },
    {
      _id: 2,
      value: "noindex",
      label: "Noindex",
      tooltip: "از ایندکس کردن صفحه توسط موتورهای جستجو جلوگیری می‌کند"
    },
    {
      _id: 3,
      value: "follow",
      label: "Follow",
      tooltip:
        "اجازه می‌دهد موتورهای جستجو لینک‌های موجود در صفحه را دنبال کنند"
    },
    {
      _id: 4,
      value: "nofollow",
      label: "Nofollow",
      tooltip:
        "از دنبال کردن لینک‌های موجود در صفحه توسط موتورهای جستجو جلوگیری می‌کند"
    }
  ];

  const handleOptionsChange = (newSelectedOptions) => {
    setSelectedOptions(newSelectedOptions);
  };

  const handleAddKeynote = () => {
    setKeynotes([...keynotes, ""]);
  };

  const handleKeynoteChange = (index, value) => {
    const updatedKeynotes = [...keynotes];
    updatedKeynotes[index] = value;
    setKeynotes(updatedKeynotes);
  };

  const handleRemoveKeynote = (index) => {
    const updatedKeynotes = [...keynotes];
    updatedKeynotes.splice(index, 1);
    setKeynotes(updatedKeynotes);
  };

  return (
    <>
      <span
        className="line-clamp-1 cursor-pointer rounded-full border border-green-500/5 bg-green-500/5 p-2 text-green-500 transition-colors hover:border-green-500/10 hover:bg-green-500/10 hover:!opacity-100 group-hover:opacity-70"
        onClick={() => setIsOpen(true)}
      >
        <FiEdit3 className="w-5 h-5" />
      </span>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-1/2 w-full z-50"
        >
          <form
            className="text-sm w-full h-full flex flex-col gap-y-4 mb-3"
            onSubmit={handleSubmit(handleUpdateTag)}
          >
            <div className="flex gap-4 flex-col">
              <label htmlFor="title" className="flex flex-col gap-y-2">
                عنوان*
                <input
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={tag.title}
                  maxLength={70}
                  placeholder="عنوان تگ را تایپ کنید..."
                  className="rounded"
                  autoFocus
                  {...register("title", { required: true })}
                />
              </label>
              <label htmlFor="description" className="flex flex-col gap-y-2">
                توضیحات*
                <textarea
                  name="description"
                  id="description"
                  defaultValue={tag.description}
                  maxLength={160}
                  placeholder="توضیحات تگ را تایپ کنید..."
                  className="rounded h-32"
                  {...register("description")}
                />
              </label>
              {/* keynotes */}
              <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
                <label
                  htmlFor="keynotes"
                  className="w-full flex flex-col gap-y-4"
                >
                  <p className="text-sm flex flex-row justify-between items-center">
                    کلمات کلیدی
                    <button
                      type="button"
                      className="p-0.5 border-2 dark:border-gray-500 rounded-secondary bg-green-500 text-white"
                      onClick={handleAddKeynote}
                    >
                      <Plus />
                    </button>
                  </p>

                  {keynotes.map((keynote, index) => (
                    <p
                      key={index}
                      className="flex flex-row gap-x-2 items-center"
                    >
                      <input
                        type="text"
                        placeholder="کلید واژه تگ خود را وارد کنید"
                        className="flex-1"
                        value={keynote}
                        onChange={(event) =>
                          handleKeynoteChange(index, event.target.value)
                        }
                      />
                      {index !== 0 && (
                        <button
                          type="button"
                          className="p-0.5 border rounded-secondary bg-red-500 text-white"
                          onClick={() => handleRemoveKeynote(index)}
                        >
                          <Minus />
                        </button>
                      )}
                    </p>
                  ))}
                </label>
              </div>
              {/* robots */}
              ربات‌ها*
              <MultiSelectDropdown
                items={robotOptions}
                selectedItems={tag?.robots}
                handleSelect={handleOptionsChange}
                className="w-full"
                name="tags"
                icon={<LiaRobotSolid size={24} />}
                returnType="title"

              />
              <Button type="submit" className="py-2 mt-4 mb-4">
                بروزرسانی
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default EditTag;
