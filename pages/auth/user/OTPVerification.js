import { useVerifyPhoneMutation } from "@/services/auth/userAuthApi";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function OTPVerification({ phone, onSuccess, resendCode }) {
  const [verify, { isLoading, error, data }] = useVerifyPhoneMutation();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (/^[0-9]{4}$/.test(text)) {
      setOtp(text.split(""));
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== 4) {
      toast.error("لطفاً کد ۴ رقمی را وارد کنید");
      return;
    }

    verify({ phone, code });
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال بررسی کد...", { id: "verify" });
    }

    if (data) {
      toast.success(data?.description, { id: "verify" });
      setOtp(["", "", "", ""]);
      localStorage.setItem("accessToken", data?.accessToken);
      setTimeout(() => {
        window.open("/", "_self");
      }, 1000);
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "verify" });
    }
  }, [isLoading, data, error]);

  return (
    <form onSubmit={handleVerify} className="w-full max-w-6xl mx-auto md:px-6">
      <div className="flex justify-center">
        <div className="max-w-md mx-auto text-center sm:px-8">
          <header className="mb-8">
            <h1 className="text-2xl dark:text-gray-100 mb-1">
              تأیید شماره موبایل
            </h1>
            <p className="text-[15px] text-slate-500">
              کد تأیید ۴ رقمی ارسال شده به شماره {phone} را وارد کنید.
            </p>
          </header>

          <div className="flex flex-row-reverse items-center justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                className="w-14 h-14 text-center text-2xl font-extrabold text-gray-700 bg-primary dark:text-gray-100 dark:bg-slate-800 border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700  dark:focus:text-gray-100 focus:bg-white focus:border-orange-600 focus:outline-none"
                maxLength="1"
                value={digit}
                autoFocus={index === 0}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
              />
            ))}
          </div>

          <div className="max-w-[260px] mx-auto mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer flex items-center justify-center px-7 py-3 bg-gradient-to-br from-orange-400 to-orange-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-orange-600 hover:shadow-lg focus:bg-orange-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out w-full mt-3"
            >
              تأیید حساب
            </button>
          </div>

          <div className="text-sm text-slate-500 mt-4">
            کد را دریافت نکردید؟
            <button
              type="button"
              className="font-medium text-indigo-500 hover:text-indigo-600 ml-1"
              onClick={resendCode}
              disabled={isLoading}
            >
              ارسال مجدد
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
