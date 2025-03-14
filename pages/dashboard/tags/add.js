import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import MultiSelectDropdown from "@/components/shared/multiSelectDropdown/MultiSelectDropdown";
import { useAddTagMutation, useUpdateTagMutation } from "@/services/tag/tagApi";
import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import { LiaRobotSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { Plus, Minus } from "@/utils/SaveIcon";
import AddButton from "@/components/shared/button/AddButton";
const AddTag = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const admin = useSelector((state) => state?.auth);
  const [keynotes, setKeynotes] = useState([""]);

  const [addTag, { isLoading: isAdding, data: addData, error: addError }] =
    useAddTagMutation();

  useEffect(() => {
    if (isAdding) {
      toast.loading("در حال پردازش...", { id: "tag" });
    }
    if (addData?.success) {
      toast.success(addData?.message, { id: "tag" });
      reset();
      setIsOpen(false);
    }

    if (addData && !addData?.success) {
      toast.error(addData?.message, { id: "tag" });
    }
    if (addError?.data) {
      toast.error(addError?.message, { id: "tag" });
    }
  }, [addData, addError, isAdding, reset]);

  const handleAddOrUpdateTag = (formData) => {
    formData = {
      ...formData,
      robots: selectedOptions.map((option) => ({
        value: option
      })),
      keynotes: JSON.stringify(keynotes),
      creator: admin?._id
    };
    addTag(formData).unwrap();
  };

  const robotOptions = [
    {
      id: 1,
      value: "index",
      title: "Index",
      tooltip: "اجازه می‌دهد موتورهای جستجو صفحه را ایندکس کنند"
    },
    {
      id: 2,
      value: "noindex",
      title: "Noindex",
      tooltip: "از ایندکس کردن صفحه توسط موتورهای جستجو جلوگیری می‌کند"
    },
    {
      id: 3,
      value: "follow",
      title: "Follow",
      tooltip:
        "اجازه می‌دهد موتورهای جستجو لینک‌های موجود در صفحه را دنبال کنند"
    },
    {
      id: 4,
      value: "nofollow",
      title: "Nofollow",
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
      <AddButton onClick={() => setIsOpen(true)} />

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-1/2 w-full z-50"
        >
          <form
            className="text-sm w-full h-full flex flex-col gap-y-4 mb-3"
            onSubmit={handleSubmit(handleAddOrUpdateTag)}
          >
            <div className="flex gap-4 flex-col">
              <label htmlFor="title" className="flex flex-col gap-y-2">
                عنوان*
                <input
                  type="text"
                  name="title"
                  id="title"
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
                        name="کلید واژه"
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
                selectedItems={selectedOptions}
                handleSelect={handleOptionsChange}
                className="w-full"
                name="tags"
                icon={<LiaRobotSolid size={24} />}
                returnType="title"
              />
              <Button type="submit" className="py-2 mt-4 mb-4">
                ایجاد کردن
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddTag;
