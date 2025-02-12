// components/signup/steps/PhoneStep.jsx
import React, { useEffect } from "react";
import NavigationButton from "@/components/shared/button/NavigationButton";
import axios from "axios";
import Timer from "./timer";

const VerifyStep = ({ register, errors , getValues }) => {
  const phone = getValues('phone');
  useEffect(() => {
    axios.post('/api/auth/timer', {
        phone: phone,
      })
        .then(function (response) {
          if (response.data.success) {

            var timeLimitInSeconds = parseInt(response.data.message);
            var timerElement = document.getElementById('timerrrrrrrrrrrrrrrrrrrrrrr');
            var currentText = document.getElementById('currentTextTimer');
            function startTimer() {
                timeLimitInSeconds--;
                var minutes = Math.floor(timeLimitInSeconds / 60);
                var seconds = timeLimitInSeconds % 60;
        
                if (timeLimitInSeconds < 0) {
                    timerElement.textContent = '00:00';
                    clearInterval(timerInterval);
                    return;
                }
        
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                    if(timeLimitInSeconds){
                        timerElement.textContent = minutes + ':' + seconds;
                    }else{
                        currentText.textContent = 'کد شما منقضی شده است لطفا دوباره کد درخواست کنید';
                    }
            }
            var timerInterval = setInterval(startTimer, 1000);
          } 
        })
        .catch(function (error) {
        });

   
},[phone])
  return (
    <>
     <label htmlFor="verify" className="flex mt-4 flex-col gap-y-1">
        <span className="text-sm">پیامکی هاوی کد تایید برای شماره <b className="mt-1">{getValues('phone')}</b> ارسال شد</span>
        <div className="relative py-2 w-full">
          <input
            type="number"
            name="verify"
            id="verify"
            {...register("verify", {
              required: "لطفا کد ارسالی را وارد کنید",
            })}
            placeholder="کد را وارد نمایید"
            className="sm:p-3 mt-2 sm:px-4 text-center px-3 p-2 tracking-widest w-full hide-arrow sm:text-xl text-lg   rounded  border "
          />
        </div>

        {errors.verify && (
          <span className="mr-5 text-red-500 text-sm">
            {errors.verify.message}
          </span>
        )}
      </label>
      <div className="mt-1 mr-5" >
     <Timer />
      </div>

    </>
  );
};

export default VerifyStep;
