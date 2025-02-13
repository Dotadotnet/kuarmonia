// components/signup/StepSignUpForm.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useSignupMutation } from "@/services/auth/authApi";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import AvatarStep from "./steps/AvatarStep";
import NameStep from "./steps/NameStep";
import EmailStep from "./steps/EmailStep";
import PasswordStep from "./steps/PasswordStep";

import VerifyStep from "./steps/VerifyStep";
import PhoneStep from "./steps/PhoneStep";
import StepIndicator from "./steps/StepIndicator";
import NavigationButton from "@/components/shared/button/NavigationButton";
import SendButton from "@/components/shared/button/SendButton"
import axios from "axios";
const StepSignUpForm = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { register, setError, getValues , clearErrors, setValue, reset, formState: { errors }, trigger, handleSubmit, watch } = useForm({
    mode: "onChange",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [signup, { isLoading, data, error }] = useSignupMutation();
  const router = useRouter();

  const [completedSteps, setCompletedSteps] = useState({});
  const [invalidSteps, setInvalidSteps] = useState({});

  const watchedFields = watch();

  useEffect(() => {
    // setError("name", { type: "custom", message: "custom message" })
    if (data?.success) {
      console.log(data)
      toast.success(data?.message, { id: "signup" });
      setAvatarPreview(null);
      window.open("/auth/signin", "_self");
      reset();
    }
    if (!data?.success && data?.message) {
      toast.error(data?.message, { id: "signup" });
    }
    if (isLoading) {
      toast.loading("در حال ثبت‌نام...", { id: "signup" });
    }
  }, [data, error, setError, isLoading, reset, router]);

  const handleImageSelect = (imageOrUrl) => {
    const imageUrl = typeof imageOrUrl === "string" ? imageOrUrl : URL.createObjectURL(imageOrUrl);
    setAvatarPreview(imageUrl);
    setValue("avatar", imageOrUrl, { shouldValidate: true });
  };
  const nextStep = async () => {
    let valid = false;
    switch (currentStep) {
      case 1:
        valid = await trigger("name");
        if (!valid) {
          toast.error("لطفاً نام خود را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = true;
        break;
      case 2:
        valid = await trigger("phone");
        console.log(errors);

        if (!valid) {
          toast.error("لطفاً شماره تلفن خود را به شکل صحیح وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        break;
      case 3:
        valid = await trigger("verify");
        if (!valid) {
          toast.error("لطفاً شماره تلفن خود را به شکل صحیح وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        break;
      default:
        break;
    }

    if (true) {
      setCompletedSteps((prev) => ({ ...prev, [currentStep]: true }));
      setInvalidSteps((prev) => ({ ...prev, [currentStep]: false }));
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  

  const onSubmit = async (data) => {
    if (Object.keys(data).length == 3 && currentStep == 3) {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("verify", data.verify);
      formData.append("phone", data.phone);
      axios.post('/api/auth/signup', {
        phone: data.phone,
        verify: data.verify,
        name: data.name,
      })
        .then(function (response) {
          if (!response.data.success) {
            toast.error(response.data.message);
            setError("verify", { type: "custom", message: response.data.message })
          } else {
            toast.success(response.data.message,{ duration: 5000 });
            clearErrors("verify")
            if (response.data.accessToken) {
              
              localStorage.setItem("accessToken", response.data.accessToken);
              window.open("/dashboard", "_self");
            }
          }
        })
        .catch(function (error) {
        });
    }
  };


  const getStepFromField = (field) => {
    const fieldToStep = {
      name: 1,
      phone: 2,
      verify: 3,
    };
    return fieldToStep[field];
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <NameStep
            register={register}
            errors={errors}
            nextStep={nextStep}
          />
        );
      case 2:

        return (
          <PhoneStep
            register={register}
            errors={errors}
            nextStep={nextStep}
            prevStep={prevStep}
            getValues={getValues}
            setError={setError}
            clearErrors={clearErrors}
            setValue={setValue}
          />
        );
      case 3:
        return (
          <VerifyStep
            register={register}
            errors={errors}
            prevStep={prevStep}
            getValues={getValues}
          />
        );
      default:
        return null;
    }
  };
  // setError("name", { type: "custom", message: "custom message" })
  const handleStepClick = async (step) => {
    // if (errors.length) {
    //   if (errors.name) {
    //     step = 1
    //   } else if (errors.phone) {
    //     step = 2
    //   } else if (errors.verify) {
    //     step = 3
    //   }
    //   setCurrentStep(step);
    // } else {
      
    // }

    // if (step < currentStep) {
    //   setCurrentStep(step);
    // } else if (step > currentStep) {
    //   let canProceed = true;
    //   for (let i = 1; i < step; i++) {
    //     if (!completedSteps[i]) {
    //       canProceed = false;
    //       toast.error(`لطفاً ابتدا مرحله ${i} را تکمیل کنید.`);
    //       setCurrentStep(i);
    //       break;
    //     }
    //   }
    //   if (canProceed) {
    //     setCurrentStep(step);
    //   }
    // }


    // setInvalidSteps((step) => ({ ...step, [currentStep]: true }));




  };

  useEffect(() => {
    const fieldToStep = {
      name: 1,
      phone: 2,
      verify: 3,
    };

    setInvalidSteps((prevInvalidSteps) => {
      const newInvalidSteps = { ...prevInvalidSteps };      
      Object.keys(errors).forEach((field) => {
        const step = fieldToStep[field];
        if (step) {
          newInvalidSteps[step] = true;
        }
      });
      return JSON.stringify(prevInvalidSteps) !== JSON.stringify(newInvalidSteps) ? newInvalidSteps : prevInvalidSteps;
    });

    setCompletedSteps((prevCompletedSteps) => {
      const newCompletedSteps = { ...prevCompletedSteps };
      Object.entries(watchedFields).forEach(([field, value]) => {
        if (field === "avatar") {
          newCompletedSteps[fieldToStep[field]] = !!value;
        } else {
          newCompletedSteps[fieldToStep[field]] = value && value.length > 0;
        }
      });
      return JSON.stringify(prevCompletedSteps) !== JSON.stringify(newCompletedSteps) ? newCompletedSteps : prevCompletedSteps;
    });
  }, [errors, watchedFields]);


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StepIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        onStepClick={handleStepClick}
        completedSteps={completedSteps}
        invalidSteps={invalidSteps}
      />

      {renderStepContent(currentStep)}

      {currentStep === totalSteps && (
        <div className="flex sm:scale-100 scale-90 justify-between mt-4 sm:mt-6">

          <SendButton />
          <NavigationButton direction="prev" onClick={prevStep} />
        </div>
      )}
    </form>
  );
};

export default StepSignUpForm;