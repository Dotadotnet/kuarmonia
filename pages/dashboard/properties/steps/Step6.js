import React, { useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import useGetCountries from "@/hooks/useGetCountries";
import useGetStates from "@/hooks/useGetStates"; // هوک برای دریافت استان‌ها
import dynamic from "next/dynamic";

const Step6 = ({ register, setValue,selectedLocation,setSelectedLocation }) => {
  const [country, setCountry] = useState("Bangladesh");
  const [state, setState] = useState("");

  const countries = useGetCountries();
  const states = useGetStates(country); // دریافت استان‌ها بر اساس کشور انتخابی

  const GeoLocation = useMemo(
    () =>
      dynamic(() => import("@/components/detail/GeoLocation"), {
        loading: () => <p className="font-sans">نقشه در حال آماده سازی...</p>,
        ssr: false,
      }),
    []
  );

  // ذخیره مختصات در فرم
  React.useEffect(() => {
    if (selectedLocation) {
      setValue("latitude", selectedLocation.lat);
      setValue("longitude", selectedLocation.lng);
    }
  }, [selectedLocation, setValue]);

  return (
    <div className="flex flex-col gap-y-4">
      {/* انتخاب کشور */}
      <label htmlFor="country" className="flex flex-col gap-y-2">
        کشور مورد نظر*
        <select
          name="country"
          id="country"
          className="rounded"
          {...register("country", {
            required: true,
            onChange: (e) => {
              setCountry(e.target.value);
              setState(""); // هنگام تغییر کشور، استان را ریست کن
            },
          })}
        >
          <option selected disabled>
            {country}
          </option>
          {countries?.map((country, index) => (
            <option key={index} value={country?.name}>
              {country?.name}
            </option>
          ))}
        </select>
      </label>

      {/* انتخاب استان (فقط اگر استان‌ها موجود باشند) */}
      {states.length > 0 && (
        <label htmlFor="state" className="flex flex-col gap-y-2">
          استان مورد نظر*
          <select
            name="state"
            id="state"
            className="rounded"
            {...register("state", { required: true })}
            onChange={(e) => setState(e.target.value)}
          >
            <option selected disabled>
              استان را انتخاب کنید
            </option>
            {states?.map((state, index) => (
              <option key={index} value={state?.name}>
                {state?.name}
              </option>
            ))}
          </select>
        </label>
      )}

      {/* نقشه با امکان جستجو و انتخاب مکان */}
      <GeoLocation
        location={state || country} // اگر استان انتخاب شد، روی آن فوکوس کند
        zoom={10}
        height="200px"
        setSelectedLocation={setSelectedLocation}
      />

      {/* مختصات مخفی برای ارسال در فرم */}
      <input type="hidden" {...register("latitude")} />
      <input type="hidden" {...register("longitude")} />
    </div>
  );
};

export default Step6;
