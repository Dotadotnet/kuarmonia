import React, { useState, useEffect } from "react";
import Button from "@/components/shared/button/Button";
import HighlightText from "@/components/shared/highlightText/HighlightText";


const HeroDescription = () => {
  const [firstTypingDone, setFirstTypingDone] = useState(false);

  return (
    <section className="lg:col-span-8 md:col-span-6">
      <article className="flex flex-col gap-y-12">
      <div className="flex flex-col gap-y-8 text-center md:text-right">
  <h1 className="lg:text-7xl md:text-5xl text-3xl">
    <HighlightText>کارمونیا </HighlightText>
    مهاجرتی امن و مطمئن به ترکیه و کانادا
  </h1>

  <p className="lg:text-2xl md:text-xl text-lg">
    مسیری امن و مطمئن برای آغاز زندگی جدیدتان در ترکیه و کانادا
    <br />
    از تحصیل تا ازدواج و اشتغال، همراه شما هستیم.
  </p>
</div>

        <div className="flex lg:justify-start justify-center sm:justify-center">
          <Button
            className="px-[18px] py-[13px] w-[300px] border border-gray-500"
            style={{ borderWidth: "4px", borderColor: "#ccc" }}
            onClick={() => window.open("/tours", "_self")}
          >
            کلیک کن
          </Button>
        </div>
      </article>
    </section>
  );
};

export default HeroDescription;
