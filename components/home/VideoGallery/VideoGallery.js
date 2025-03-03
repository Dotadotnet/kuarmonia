// import Image from "next/image";
import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import React from "react";
import Video from "./Video";
import Image from "next/image";

const VideoGallery = () => {
  return (
    <section
      className="bg-no-repeat bg-contain bg-center h-full  dark:bg-gray-900 "
      style={{
        backgroundImage:
          "url(/assets/home-page/offer/tree1.svg), url(/assets/home-page/offer/tree2.svg)",
        backgroundPosition: "0% 0%, 100% 100%",
        backgroundSize: "251px 300px, 251px 300px"
      }}
    >
      <Container>
        <div className="w-full h-full flex flex-col gap-y-12">
          <article className="flex flex-col gap-y-4">
            <p className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
              <HighlightText> نمایشگاه </HighlightText> رسانه
              <Image
                src="/assets/home-page/destination/underline.svg"
                alt="arrow"
                height={7}
                width={275}
                className="mt-1.5 filter dark:invert  dark:brightness-0 dark:sepia dark:hue-rotate-180"
              />
            </p>
            <p className="text-base">
              در این ویدئوها، با خدمات تخصصی شرکت ما در زمینه مهاجرت آشنا
              می‌شوید. ما شما را در انتخاب مسیر مناسب برای مهاجرت، آشنایی با
              قوانین جدید و ارائه مشاوره‌های تخصصی همراهی می‌کنیم. این ویدئوها
              می‌توانند به شما در فرآیند تصمیم‌گیری و مهاجرت کمک کنند.
            </p>
          </article>
          <div>
            <Video />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default VideoGallery;
