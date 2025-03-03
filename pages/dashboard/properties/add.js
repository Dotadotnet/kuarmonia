import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import CustomProgressBar from "./steps/CustomProgressBar";
import NavigationButton from "@/components/shared/button/NavigationButton";
import PropertyCard from "@/components/shared/card/PropCard";
import PropertyContent from "@/components/shared/content/PropertyContent";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import Step6 from "./steps/Step6";

import SendButton from "@/components/shared/button/SendButton";
import { useAddPropertyMutation } from "@/services/property/propertyApi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { PrevIcon } from "@/utils/SaveIcon";
import ThemeToggle from "@/components/shared/navbar/ThemeToggle/ThemeToggle";
import { RxExitFullScreen } from "react-icons/rx";
import { BiFullscreen } from "react-icons/bi";
import Modal from "@/components/shared/modal/Modal";
import OutsideClick from "@/components/shared/outsideClick/OutsideClick";

const Add = () => {
  const router = useRouter();
  const closeModal = () => {
    setIsFullscreen(false); // Close the modal
  };
  const handleBackList = () => {
    router.push("/dashboard/properties");
  };
  const methods = useForm({
    mode: "all",
    defaultValues: {
      title: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      description: "",
      tags: [],
      category: "",
      gallery: "",
      readTime: "",
      visibility: "public",
      isFeatured: false,
      socialLinks: []
    }
  });
  const user = useSelector((state) => state?.auth);
  const [currentStep, setCurrentStep] = useState(1);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedTradeType, setSelectedTradeType] = useState(null);
  const [features, setFeatures] = useState([{ title: "", content: [""] }]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const totalSteps = 6;
  const {
    watch,
    trigger,
    formState: { errors },
    register,
    control,
    clearErrors,
    setValue,
    getValues,
    reset,
    onSuccess,
    handleSubmit
  } = methods;

  const [addProperty, { isLoading: isAdding, data: addData, error: addError }] =
    useAddPropertyMutation();

  const defaultValues = useMemo(() => {
    return {
      name: user?.name,
      avatar: user?.avatar,
      id: user?._id
    };
  }, [user]);
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("summary", data.summary);
    formData.append("description", data.description);
    formData.append("createDate", data.createDate);
    formData.append("square", data.square);
    formData.append("bathroom", data.bathroom);
    formData.append("bedroom", data.bedroom);
    formData.append("category", data.category);
    formData.append("currency", data.currency?.value);
    formData.append("tradeType", data.tradeType?._id);
    formData.append("propertyType", data.propertyType?._id);
    formData.append("saleType", data.saleType?._id);
    formData.append("isFeatured", data.isFeatured);
    formData.append("authorId", user?._id);
    formData.append("features", JSON.stringify(features));
    formData.append("selectedLocation",JSON.stringify( selectedLocation));

    const variants = [
      {
        type: "deposit",
        value: data.deposit
      },
      {
        type: "monthlyRent",
        value: data.monthlyRent
      },
      {
        type: "totalPrice",
        value: data.totalPrice
      },
      {
        type: "installmentAmount",
        value: data.installmentAmount
      }
    ];
    const filteredVariants = variants.filter((variant) => variant.value);
    formData.append("variants", JSON.stringify(filteredVariants));
    data.tags.forEach((tag) => {
      formData.append("tags[]", tag.id);
    });
    formData.append("thumbnail", thumbnail);
    for (let i = 0; i < gallery.length; i++) {
      formData.append("gallery", gallery[i]);
    }
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    addProperty(formData);
  };

  useEffect(() => {
    const isLoading = isAdding;
    const data = addData;
    const error = addError;

    if (isLoading) {
      toast.loading("در حال پردازش...", { id: "property" });
    }

    if (data?.success) {
      toast.success(data?.message, { id: "property" });
      reset();
      setCurrentStep(1);
      setGalleryPreview(null);
    }
    if (error?.data) {
      toast.error(error?.data?.message, { id: "property" });
    }
  }, [addData, addError, isAdding, reset, onSuccess]);

  const handleNext = async () => {
    let stepValid = false;
    switch (currentStep) {
      case 1:
        stepValid = await trigger(["title", "description"]);
        break;
      case 2:
        stepValid = await trigger(["Thumbnail", "content"]);
        break;
      case 3:
        stepValid = await trigger([]);
        break;
      case 4:
        stepValid = await trigger(["tags", "category"]);
        break;
      case 5:
        stepValid = await trigger(["metaTitle", "metaDescription"]);
        break;
      case 6:
        stepValid = await trigger([]);
        break;
      default:
        stepValid = false;
    }

    if (!stepValid) {
      toast.dismiss();
      toast("لطفا ابتدا مرحله مورد نظر را تکمیل کنید.!", {
        icon: "⚠️"
      });
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };
  const tradeType = watch("tradeType")?.value;
  const currency = watch("currency")?.value;
  const deposit = watch("deposit");
  const monthlyRent = watch("monthlyRent");
  const totalPrice = watch("totalPrice");
  const installmentAmount = watch("installmentAmount");
  let finalPriceLabel = "";
  let finalPrice = "";

  if (tradeType) {
    if (deposit) {
      finalPriceLabel = " ودیعه";
      finalPrice = deposit;
    } else if (monthlyRent) {
      finalPriceLabel = "ماهانه";
      finalPrice = monthlyRent;
    } else if (totalPrice) {
      finalPriceLabel = "ارزش کل";
      finalPrice = totalPrice;
    } else if (installmentAmount) {
      finalPriceLabel = "";
      finalPrice = installmentAmount;
    }
  }

  return (
    <section
      className={`relative bg-[#dce9f5] dark:bg-[#1a202c] h-screen w-screen overflow-x-hidden lg:overflow-hidden text-black dark:text-gray-300 py-4`}
    >
      <a
        onClick={handleBackList}
        className="fixed bottom-4 right-4 group items-center reject-button rounded-full  !bg-red-800/20 shadow-lg !p-4 text-slate-300 transition-all hover:text-slate-100 z-50"
        title="بازگشت"
      >
        <PrevIcon className="h-6 w-6 transition-transform duration-300 transform group-hover:-translate-x-1 group-focus:translate-x-1" />
      </a>
      <div className="wave"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>

      <div className="flex  items-center">
        <CustomProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      <div className="grid grid-cols-3 gap-x-1 px-2">
        <div className="col-span-1">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden text-black dark:text-gray-300 flex flex-col p-8 gap-y-4 shadow-lg relative h-[660px] items-center"
          >
            {currentStep === 1 && (
              <Step1
                control={control}
                register={register}
                errors={errors}
                setSelectedTradeType={setSelectedTradeType}
              />
            )}
            {currentStep === 2 && <Step2 register={register} errors={errors} />}
            {currentStep === 3 && (
              <Step3
                setGallery={setGallery}
                galleryPreview={galleryPreview}
                setGalleryPreview={setGalleryPreview}
                register={register}
                useState={useState}
                control={control}
                setThumbnail={setThumbnail}
                setThumbnailPreview={setThumbnailPreview}
                errors={errors}
              />
            )}
            {currentStep === 4 && (
              <Step4
                setFeatures={setFeatures}
                features={features}
                register={register}
                errors={errors}
                clearErrors={clearErrors}
                control={control}
                setValue={setValue}
              />
            )}
            {currentStep === 5 && (
              <Step5
                register={register}
                errors={errors}
                control={control}
                getValues={getValues}
              />
            )}
            {currentStep === 6 && (
              <Step6
                register={register}
                errors={errors}
                control={control}
                setValue={setValue}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
              />
            )}

            <div className="flex p-6 justify-between mt-4 w-full absolute bottom-0 md:order-2">
              {currentStep < totalSteps && (
                <NavigationButton direction="next" onClick={handleNext} />
              )}
              {currentStep === totalSteps && <SendButton />}
              <div className="flex-1 flex justify-end">
                {currentStep > 1 && (
                  <NavigationButton direction="prev" onClick={handleBack} />
                )}
              </div>
            </div>
            <div className="absolute bottom-5">
              <ThemeToggle />
            </div>
          </form>
        </div>
        <div className="col-span-1 flex justify-center ">
          <PropertyCard
            title={watch("title")}
            tradeType={watch("tradeType")?.label}
            saleType={watch("saleType")?.label}
            type={watch("propertyType")?.label}
            summary={watch("summary")}
            thumbnail={thumbnailPreview}
            square={watch("square")}
            bathroom={watch("bathroom")}
            bedroom={watch("bedroom")}
            finalPrice={finalPrice}
            currency={currency}
            finalPriceLabel={finalPriceLabel}
            createDate={watch("createDate")}
            isLoading={false}
            author={defaultValues?.name}
            avatar={defaultValues?.avatar?.url}
          />
        </div>
        <div className="col-span-1 relative">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`p-3 rounded-full shadow-lg cursor-pointer bg-white absolute top-4 left-1/2 transform -translate-x-1/2 z-20`}
          >
            {isFullscreen ? <RxExitFullScreen /> : <BiFullscreen />}
          </button>
          {isFullscreen ? (
            <Modal
              isOpen={isFullscreen}
              onClose={closeModal}
              className="!w-full h-full"
            >
              <OutsideClick onOutsideClick={closeModal}>
                <PropertyContent
                  title={watch("title")}
                  content={watch("content")}
                  galleryPreview={galleryPreview}
                  isMobile={false}
                  selectedTags={watch("tags")}
                  author={defaultValues?.name}
                  avatar={defaultValues?.avatar?.url}
                />
              </OutsideClick>
            </Modal>
          ) : (
            <div>
              <PropertyContent
                title={watch("title")}
                content={watch("content")}
                galleryPreview={galleryPreview}
                isMobile={true}
                selectedTags={watch("tags")}
                author={defaultValues?.name}
                avatar={defaultValues?.avatar?.url}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Add;
