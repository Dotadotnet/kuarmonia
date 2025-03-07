import { Controller, useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import {
  useAddTradeTypeMutation,
  useUpdateTradeTypeMutation
} from "@/services/tradeType/tradeTypeApi";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import { useSelector } from "react-redux";
import MultiSelectDropdown from "@/components/shared/multiSelectDropdown/MultiSelectDropdown";

const priceFieldsOptions = [
  { id: "1", value: "deposit", label: "ودیعه (رهن)" },
  { id: "2", value: "monthlyRent", label: "اجاره ماهانه" },
  { id: "3", value: "propertyValue", label: "ارزش ملک" },
  { id: "4", value: "installmentAmount", label: "مبلغ قسط" },
  { id: "5", value: "totalPrice", label: "قیمت کل" }
];

const AddTradeType = ({
  isOpen,
  onClose,
  onSuccess,
  tradeTypeToEdit = null
}) => {
  const { register, handleSubmit, reset, setValue, control } = useForm();
  const [
    addTradeType,
    { isLoading: isAdding, data: addData, error: addError }
  ] = useAddTradeTypeMutation();
  const [
    updateTradeType,
    { isLoading: isUpdating, data: updateData, error: updateError }
  ] = useUpdateTradeTypeMutation();
  const user = useSelector((state) => state?.auth);

  useEffect(() => {
    if (tradeTypeToEdit) {
      setValue("title", tradeTypeToEdit.title);
      setValue("description", tradeTypeToEdit.description);
      setValue("priceFields", tradeTypeToEdit.priceFields || []); // مقداردهی اولیه فیلد قیمت
    } else {
      reset();
    }
  }, [tradeTypeToEdit, setValue, reset]);

  useEffect(() => {
    if (isAdding || isUpdating) {
      toast.loading("در حال پردازش...", { id: "tradeType" });
    }

    if (
      (addData?.success || updateData?.success) &&
      !addError &&
      !updateError
    ) {
      toast.success((addData || updateData).message, { id: "tradeType" });
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
      toast.error((addError?.data || updateError?.data)?.message, {
        id: "tradeType"
      });
    }
  }, [
    addData,
    updateData,
    addError,
    updateError,
    isAdding,
    isUpdating,
    reset,
    onClose,
    onSuccess
  ]);

  const handleAddOrUpdateType = async (formData) => {
    formData.authorId = user?._id;
    if (tradeTypeToEdit) {
      await updateTradeType({ id: typeToEdit._id, ...formData }).unwrap();
    } else {
      await addTradeType(formData).unwrap();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="lg:w-1/3 md:w-1/2 w-full z-50"
    >
      <form
        className="text-sm w-full h-full flex flex-col gap-y-4"
        onSubmit={handleSubmit(handleAddOrUpdateType)}
      >
        <div className="flex gap-4 flex-col">
          <label htmlFor="title" className="flex flex-col gap-y-2">
            عنوان
            <input
              type="text"
              name="title"
              id="title"
              maxLength={50}
              placeholder="عنوان نوع معامله ملک را تایپ کنید..."
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
              placeholder="توضیحات نوع معامله ملک را تایپ کنید..."
              className="rounded h-32"
              {...register("description")}
            />
          </label>
          <div className="flex flex-col flex-1">
            <label htmlFor="priceFields" className="flex flex-col gap-y-2">
              نوع قیمت‌گذاری{" "}
              <Controller
                control={control}
                name="priceFields"
                render={({ field: { onChange, value } }) => (
                  <MultiSelectDropdown
                    items={priceFieldsOptions}
                    selectedItems={value || []}
                    handleSelect={onChange}
                    placeholder="می‌توانید چند مورد را انتخاب کنید"
                    className="w-full h-12"
                    returnType="value"
                  />
                )}
              />
            </label>
          </div>
          <Button type="submit" className="py-2 mt-4">
            {tradeTypeToEdit ? "ویرایش کردن" : "ایجاد کردن"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTradeType;
