import React from "react";
import { useRouter } from "next/router";
import { toPersianNumbers } from "@/utils/convertNumbers";
import Image from "next/image";
import Link from "next/link";

const PropCard = ({
  id,
  slug,
  title,
  summary,
  saleType,
  tradeType,
  type,
  createDate,
  finalPrice,
  finalPriceLabel,
  currency,
  square,
  bedroom,
  bathroom,
  thumbnail,
  variants // variants را دریافت می‌کنیم
}) => {
  const router = useRouter();

  let updatedFinalPrice = finalPrice;
  let updatedFinalPriceLabel = finalPriceLabel;

  if (tradeType) {
    const deposit = variants?.find((variant) => variant.type === "deposit")?.value;
    const monthlyRent = variants?.find((variant) => variant.type === "monthlyRent")?.value;
    const totalPrice = variants?.find((variant) => variant.type === "totalPrice")?.value;
    const installmentAmount = variants.find((variant) => variant.type === "installmentAmount")?.value;

    if (deposit) {
      updatedFinalPriceLabel = " ودیعه";
      updatedFinalPrice = deposit;
    } else if (monthlyRent) {
      updatedFinalPriceLabel = "ماهانه";
      updatedFinalPrice = monthlyRent;
    } else if (totalPrice) {
      updatedFinalPriceLabel = "ارزش کل";
      updatedFinalPrice = totalPrice;
    } else if (installmentAmount) {
      updatedFinalPriceLabel = "";
      updatedFinalPrice = installmentAmount;
    }
  }

  return (
    <Link href={`/property/${slug}/${id}`} className="max-w-sm w-full lg:w-full z-50">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
        <div className="bg-cover w-full relative bg-center h-56">
          <Image
            src={thumbnail?.url || "/placeholder.png"}
            height={600}
            width={600}
            className="w-full h-full"
          />

          <div className="flex justify-end"></div>
        </div>
        <div className="flex w-full gap-1 pt-2 px-2 justify-between h-fit">
          {type && (
            <Badge className="text-green-800 dark:text-green-100 bg-green-100 dark:bg-green-600 flex flex-row items-center gap-x-1">
              {type}
            </Badge>
          )}
          <div className="flex gap-2">
            {saleType && (
              <Badge className="text-rose-800 dark:text-rose-100 bg-rose-100 dark:bg-rose-600 flex flex-row items-center gap-x-1">
                {saleType}
              </Badge>
            )}
            {tradeType && (
              <Badge className="text-cyan-800 dark:text-cyan-100 bg-cyan-100 dark:bg-cyan-600 flex flex-row items-center gap-x-1">
                {tradeType}
              </Badge>
            )}
          </div>
        </div>
        <div className="p-4 text-right">
          <div className="flex justify-between">
            <h3 className="uppercase tracking-wide text-4xl font-nozha text-gray-900 dark:text-gray-100">
              {toPersianNumbers(title)}
            </h3>
            {createDate && (
              <h3 className="uppercase text-center flex items-center tracking-wide text-lg text-gray-600 dark:text-gray-300">
                {toPersianNumbers(createDate) + "ساله"}
              </h3>
            )}
          </div>
          <h4 className="text-gray-700 dark:text-gray-300 mt-4">{summary}</h4>
          {updatedFinalPrice && currency && (
            <>
              <span className="text-3xl font-extrabold font-nozha text-blue-800 dark:text-blue-300">
                {" "}
                {toPersianNumbers(Number(updatedFinalPrice).toLocaleString("fa-IR"))}
                </span>
              <span className="text-gray-500 dark:text-gray-300">{currency}</span>
              <strong className="text-blue-600 dark:text-blue-400 text-sm">
                {updatedFinalPriceLabel}
              </strong>
            </>
          )}

          <p className="text-gray-700 dark:text-gray-300">{square} متر مساحت </p>
        </div>

        <div className="flex p-4 border-t border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
          {bedroom>0 && (
            <div className="flex-1 inline-flex items-center">
              <svg
                className="h-6 w-6 text-gray-600 dark:text-gray-300 fill-current ml-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M0 16L3 5V1a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v4l3 11v5a1 1 0 0 1-1 1v2h-1v-2H2v2H1v-2a1 1 0 0 1-1-1v-5zM19 5h1V1H4v4h1V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h2V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1zm0 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V6h-2v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6H3.76L1.04 16h21.92L20.24 6H19zM1 17v4h22v-4H1zM6 4v4h4V4H6zm8 0v4h4V4h-4z"></path>
              </svg>
              <p>
                <span className="text-gray-900 dark:text-gray-100 ml-2">{bedroom}</span>
                
              </p>
            </div>
          )}
          {bathroom >0 && (
            <div className="flex-1 inline-flex items-center">
              <svg
                className="h-6 w-6 text-gray-600 dark:text-gray-300 fill-current ml-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M17.03 21H7.97a4 4 0 0 1-1.3-.22l-1.22 2.44-.9-.44 1.22-2.44a4 4 0 0 1-1.38-1.55L.5 11h7.56a4 4 0 0 1 1.78.42l2.32 1.16a4 4 0 0 0 1.78.42h9.56l-2.9 5.79a4 4 0 0 1-1.37 1.55l1.22 2.44-.9.44-1.22-2.44a4 4 0 0 1-1.3.22zM21 11h2.5a.5.5 0 1 1 0 1h-9.06a4.5 4.5 0 0 1-2-.48l-2.32-1.15A3.5 3.5 0 0 0 8.56 10H.5a.5.5 0 0 1 0-1h8.06c.7 0 1.38.16 2 .48l2.32 1.15a3.5 3.5 0 0 0 1.56.37H20V2a1 1 0 0 0-1.74-.67c.64.97.53 2.29-.32 3.14l-.35.36-3.54-3.54.35-.35a2.5 2.5 0 0 1 3.15-.32A2 2 0 0 1 21 2v9zm-5.48-9.65l2 2a1.5 1.5 0 0 0-2-2zm-10.23 17A3 3 0 0 0 7.97 20h9.06a3 3 0 0 0 2.68-1.66L21.88 14h-7.94a5 5 0 0 1-2.23-.53L9.4 12.32A3 3 0 0 0 8.06 12H2.12l3.17 6.34z"
                ></path>
              </svg>
              <p>
                <span className="text-gray-900 dark:text-gray-100">{bathroom}</span>{" "}
                
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

function Badge({ props, children, className }) {
  return (
    <span
      className={
        "text-xs text-gray-500 dark:text-gray-300 py-1 px-3 rounded-full " + className
      }
      {...props}
    >
      {children}
    </span>
  );
}

export default PropCard;
