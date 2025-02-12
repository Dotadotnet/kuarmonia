import React, { useState } from "react";
import Slider from "react-slick";
import Slide from "./Slide";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";
import Container from "@/components/shared/container/Container";
import KeyServices  from "@/components/home/steps/KeyServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetClientSlidesQuery } from "@/services/slide/slideApi";
import MoonLoaderLoading from "@/components/shared/loading/MoonLoaderLoading";

const CustomNextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-4 md:right-3 lg:right-8 shadow-lg rounded-full bg-white/80 p-3 drop-shadow-lg text-[0.8rem] text-gray-600 md:text-[1.8rem] transform -translate-y-1/2 cursor-pointer z-10"
    onClick={onClick}
  >
    <HiOutlineChevronRight />
  </div>
);

const CustomPrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-4 md:left-3 lg:left-8 shadow-lg rounded-full bg-white/80 p-3 drop-shadow-lg text-[0.8rem] text-gray-600 md:text-[1.8rem] transform -translate-y-1/2 cursor-pointer z-10"
    onClick={onClick}
  >
    <HiOutlineChevronLeft />
  </div>
);

const Hero = () => {
  const { data, isLoading, error } = useGetClientSlidesQuery();
  const slides = Array.isArray(data?.data) ? data.data : [];
  const sortedSlides = [...slides].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return 0;
  });
  const [activeSlide, setActiveSlide] = useState(1); // ذخیره ایندکس اسلاید فعال

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 41000,
    cssEase: "linear",
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  if (isLoading) {
    return <MoonLoaderLoading color="green" size={60} />;
  }

  if (error) {
    return <MoonLoaderLoading />;
  }

  return (
    <section className="bg-no-repeat h-auto  bg-white dark:bg-gray-900 pt-24 md:pt-36">
      <Container className="h-full !max-w-full px-1 lg:px-primary">
        <div className="relative h-full border dark:border-gray-600 rounded-lg p-3 lg:p-6 max-w-screen overflow-hidden text-white">
          {sortedSlides.length === 0 ? (
            <div className="flex h-full justify-center items-center text-center text-lg text-gray-600">
              <MoonLoaderLoading color="green" size={60} />
            </div>
          ) : (
            <Slider {...settings}>
              {sortedSlides.map((slideContent, index) => (
                <Slide
                  key={slideContent.slideId}
                  {...slideContent}
                  url={slideContent.url || "/"}
                  media={slideContent.bgImg.url}
                   // ارسال وضعیت اسلاید فعال
                />
              ))}
            </Slider>
          )}
        </div>
        <KeyServices />
      </Container>
    </section>
  );
};

export default Hero;
