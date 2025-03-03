import Dropdown from "@/components/shared/dropdownmenu/Dropdown";
import React from "react";
import { Controller } from "react-hook-form";
import {
  useGetSaleTypesQuery,
  useGetTradeTypesQuery,
  useGetPropertyTypesQuery
} from "@/services/property/propertyApi";

const Step1 = ({ register, errors, control }) => {
  const {
    data: propertyTypesData,
    isLoading: isLoadingPropertyTypes,
    error: errorPropertyTypes
  } = useGetPropertyTypesQuery();
  const {
    data: tradeTypesData,
    isLoading: isLoadingTradeTypes,
    error: errorTradeTypes
  } = useGetTradeTypesQuery();
  const {
    data: saleTypesData,
    isLoading: isLoadingSaleTypes,
    error: errorSaleTypes
  } = useGetSaleTypesQuery();

  const tradeTypes = tradeTypesData?.data || [];
  const saleTypes = saleTypesData?.data || [];
  const propertyType = propertyTypesData?.data || [];
  const currencies = [
    { label: "لیر ترکیه (TRY)", value: "TRY" },
    { label: "دلار آمریکا (USD)", value: "USD" },
    { label: "یورو (EUR)", value: "EUR" },
    { label: "ریال ایران (IRR)", value: "IRR" }
  ];

  return (
    <>
      <label htmlFor="tradeType" className="flex flex-col gap-y-1 w-full">
        نوع معامله و بهره‌برداری
        <Controller
          control={control}
          name="tradeType"
          render={({ field: { onChange, value } }) => (
            <Dropdown
              options={tradeTypes}
              placeholder="نوع معامله و بهره‌برداری"
              value={value?.value}
              onChange={(selectedOption) => {
                onChange(selectedOption);
              }}
              className="w-full"
              height="py-3"
              error={errors.tradeType}
            />
          )}
        />
        {errors.tradeType && (
          <span className="text-red-500 text-sm">
            {errors.tradeType.message}
          </span>
        )}
      </label>
      {/* Dynamic price field based on tradeType */}
      <Controller
        control={control}
        name="tradeType"
        render={({ field: { value: tradeType } }) => {
          const selectedTrade = tradeTypes.find(
            (t) => t.value === tradeType?.value
          ); // تغییر این خط

          if (!selectedTrade) return null;

          return (
            <>
              {selectedTrade.priceFields.includes("deposit") && (
                <label
                  htmlFor="deposit"
                  className="flex flex-col gap-y-1 w-full"
                >
                  <span className="text-sm">مبلغ ودیعه (رهن)</span>
                  <input
                    type="number"
                    name="deposit"
                    id="deposit"
                    {...register("deposit", {
                      required: "مبلغ ودیعه الزامی است"
                    })}
                    placeholder="مبلغ ودیعه (رهن)"
                    className="p-2 rounded border w-full"
                  />
                  {errors.deposit && (
                    <span className="text-red-500 text-sm">
                      {errors.deposit.message}
                    </span>
                  )}
                </label>
              )}

              {selectedTrade.priceFields.includes("monthlyRent") && (
                <label
                  htmlFor="monthlyRent"
                  className="flex flex-col gap-y-1 w-full"
                >
                  <span className="text-sm">مبلغ اجاره ماهانه</span>
                  <input
                    type="number"
                    name="monthlyRent"
                    id="monthlyRent"
                    {...register("monthlyRent", {
                      required: "مبلغ اجاره ماهانه الزامی است"
                    })}
                    placeholder="مبلغ اجاره ماهانه"
                    className="p-2 rounded border w-full"
                  />
                  {errors.monthlyRent && (
                    <span className="text-red-500 text-sm">
                      {errors.monthlyRent.message}
                    </span>
                  )}
                </label>
              )}

              {selectedTrade.priceFields.includes("totalPrice") && (
                <label
                  htmlFor="totalPrice"
                  className="flex flex-col gap-y-1 w-full"
                >
                  <span className="text-sm">ارزش کل</span>
                  <input
                    type="number"
                    name="totalPrice"
                    id="totalPrice"
                    {...register("totalPrice", {
                      required: "ارزش کل الزامی است"
                    })}
                    placeholder="ارزش کل"
                    className="p-2 rounded border w-full"
                  />
                  {errors.totalPrice && (
                    <span className="text-red-500 text-sm">
                      {errors.totalPrice.message}
                    </span>
                  )}
                </label>
              )}

              {selectedTrade.priceFields.includes("installmentAmount") && (
                <label
                  htmlFor="installmentAmount"
                  className="flex flex-col gap-y-1 w-full"
                >
                  <span className="text-sm">مبلغ قسط</span>
                  <input
                    type="number"
                    name="installmentAmount"
                    id="installmentAmount"
                    {...register("installmentAmount", {
                      required: "مبلغ قسط الزامی است"
                    })}
                    placeholder=" مبلغ هر قسط"
                    className="p-2 rounded border w-full"
                  />
                  {errors.installmentAmount && (
                    <span className="text-red-500 text-sm">
                      {errors.installmentAmount.message}
                    </span>
                  )}
                </label>
              )}
            </>
          );
        }}
      />

      <Controller
        control={control}
        name="currency"
        render={({ field: { onChange, value } }) => (
          <Dropdown
            options={currencies}
            placeholder="انتخاب ارز"
            value={value?.value}
            onChange={(selectedOption) => {
              onChange(selectedOption);
            }}
            className="w-full mt-2"
            height="py-3"
            error={errors.currency}
          />
        )}
      />
      {errors.currency && (
        <span className="text-red-500 text-sm">{errors.currency.message}</span>
      )}
      <label htmlFor="propertyType" className="flex flex-col gap-y-2 w-full">
        نوع ملک
        <Controller
          control={control}
          name="propertyType"
          render={({ field: { onChange, value } }) => (
            <Dropdown
              options={propertyType}
              placeholder="نوع ملک"
              value={value?.value}
              onChange={(selectedOption) => {
                onChange(selectedOption);
              }}
              className="w-full"
              height="py-3"
              error={errors.propertyType}
            />
          )}
        />
        {errors.propertyType && (
          <span className="text-red-500 text-sm">
            {errors.propertyType.message}
          </span>
        )}
      </label>

      <label htmlFor="saleType" className="flex flex-col gap-y-2 w-full">
        نوع فروش
        <Controller
          control={control}
          name="saleType"
          render={({ field: { onChange, value } }) => (
            <Dropdown
              options={saleTypes}
              placeholder="نوع فروش ملک"
              value={value?.value}
              onChange={(selectedOption) => {
                onChange(selectedOption);
              }}
              className="w-full"
              height="py-3"
              error={errors.saleType}
            />
          )}
        />
        {errors.saleType && (
          <span className="text-red-500 text-sm">
            {errors.saleType.message}
          </span>
        )}
      </label>
    </>
  );
};

export default Step1;
