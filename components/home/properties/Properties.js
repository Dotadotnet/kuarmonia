import React, { useMemo } from "react";
import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import PropCard from "@/components/shared/card/PropCard";
import Image from "next/image";
import { useGetAllPropertiesQuery } from "@/services/property/propertyApi";
import SkeletonPropCard from "@/components/shared/card/SkeletonPropCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

const Properties = () => {
  const { isLoading, data, error } = useGetAllPropertiesQuery();
  const Properties = useMemo(() => data?.data || [], [data]);
console.log(Properties)
  return (
    <section
      id="Propertys"
      className="bg-clip-border h-full py-12 dark:bg-gray-900 "
      style={{
        backgroundImage:
          "url(/assets/home-page/Propertys-and-travel-guide/bg.svg)",
        backgroundPosition: "125% 80%"
      }}
    >
      <Container>
        <section className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-12">
            <article className="flex flex-col gap-y-4">
              <h1 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText>فرصت های سرمایه گذاری</HighlightText>
                <Image
                  src="/assets/home-page/destination/underline.svg"
                  alt="arrow"
                  height={7}
                  width={275}
                  className="mt-1.5 filter dark:invert  dark:brightness-0 dark:sepia dark:hue-rotate-180"
                />
              </h1>
              <p className="text-base">
                بهترین گزینه‌ها برای خرید، فروش، رهن و اجاره در یک نگاه
              </p>
            </article>
          </div>
          <div className="h-[600px] ">
            <Swiper
              slidesPerView={1.2}
              breakpoints={{
                1024: { slidesPerView: 3.5 }
              }}
              spaceBetween={10}
              modules={[Pagination, FreeMode]}
              freeMode={true}
              className="w-full h-full z-50 "
            >
              {isLoading || Properties?.length === 0
                ? Array.from({ length: 12 }, (_, index) => (
                    <SwiperSlide key={index}>
                      <SkeletonPropCard />
                    </SwiperSlide>
                  ))
                : Properties.map((Property, index) => (
                    <SwiperSlide key={index}>
                      <PropCard
                        id={Property._id}
                        title={Property?.title}
                        slug={Property?.slug}
                        summary={Property?.summary}
                        thumbnail={Property?.thumbnail}
                        createDate={Property?.createDate}
                        saleType={Property?.saleType?.label}
                        tradeType={Property?.tradeType?.label}
                        type={Property?.type?.label}
                        isLoading={isLoading}
                        square={Property?.square}
                        currency={Property?.currency}
                        bedroom={Property?.bedrooms}
                        variants={Property?.variants}
                        bathroom={Property?.bathrooms}
                      />
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>
        </section>
      </Container>
    </section>
  );
};

export default Properties;
