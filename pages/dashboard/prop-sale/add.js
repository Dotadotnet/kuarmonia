// AddSaleType.jsx
import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import { useAddSaleTypeMutation, useUpdateSaleTypeMutation } from "@/services/saleType/saleTypeApi";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import { useSelector } from "react-redux";

const AddSaleType = ({ isOpen, onClose, onSuccess, saleTypeToEdit = null }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [addSaleType, { isLoading: isAdding, data: addData, error: addError }] = useAddSaleTypeMutation();
  const [updateSaleType, { isLoading: isUpdating, data: updateData, error: updateError }] = useUpdateSaleTypeMutation();
  const admin = useSelector((state) => state?.auth);

  useEffect(() => {
    if (saleTypeToEdit) {
      setValue("title", saleTypeToEdit.title);
      setValue("description", saleTypeToEdit.description);
    } else {
      reset();
    }
  }, [saleTypeToEdit, setValue, reset]);

  useEffect(() => {
    if (isAdding || isUpdating) {
      toast.loading("در حال پردازش...", { id: "saleType" });
    }

    if ((addData?.success || updateData?.success) && !addError && !updateError) {
      toast.success((addData || updateData).message, { id: "saleType" });
      reset();
      if (onSuccess) {
        onSuccess(); 
        onClose(); 

      }
      if (onClose) {
        onClose(); 
      }
    }


    if (addError?.data || updateError?.data) {
      toast.error((addError?.data || updateError?.data)?.message, { id: "saleType" });
    }
  }, [addData, updateData, addError, updateError, isAdding, isUpdating, reset, onClose, onSuccess]);

  const handleAddOrUpdateSaleType = async (formData) => {
    try {
      formData.authorId=admin?._id;
      if (saleTypeToEdit) {
        await updateSaleType({ id: saleTypeToEdit._id, ...formData }).unwrap();
      } else {
        await addSaleType(formData).unwrap();
      }
    } catch (err) {
      console.error("خطا در هنگام پردازش ن: ", err);
      toast.error("خطا در هنگام پردازش");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="lg:w-1/3 md:w-1/2 w-full z-50"
    >
      <form className="text-sm w-full h-full flex flex-col gap-y-4" onSubmit={handleSubmit(handleAddOrUpdateSaleType)}>
        <div className="flex gap-4 flex-col">
          <label htmlFor="title" className="flex flex-col gap-y-2">
            عنوان
            <input
              type="text"
              name="title"
              id="title"
              maxLength={50}
              placeholder="عنوان نوع فروش را تایپ کنید..."
              className="rounded"
              autoFocus
              {...register("title", { required: true })}
            />
          </label>
          <label htmlFor="description" className="flex flex-col gap-y-2">
            توضیحات
            <textarea
              name="description"
              id="description"
              maxLength={200}
              placeholder="توضیحات نوع فروش را تایپ کنید..."
              className="rounded h-32"
              {...register("description")}
            />
          </label>

          <Button type="submit" className="py-2 mt-4">
            {saleTypeToEdit ? "ویرایش کردن" : "ایجاد کردن"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddSaleType;
