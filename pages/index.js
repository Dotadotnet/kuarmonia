import Hero from "@/components/home/hero/Hero";
import Destination from "@/components/home/destination/Destination";
import Post from "@/components/home/posts/Post";
import Main from "@/layouts/Main";
import BestSelling from "@/components/home/bestSelling/BestSelling";
import Advantage from "@/components/home/advantage/Advantage";
import PopularDestination from "@/components/home/popular-destination/PopularDestination";
import Head from "next/head";
import Steps from "@/components/home/steps/Steps";
import Blogs from "@/components/home/blogs/Blogs";
import Reviews from "@/components/shared/review/Reviews";
import Gallery from "@/components/home/gallery/Gallery";
import NewsLetter from "@/components/home/news-letter/NewsLetter";
import VideoGallery from "@/components/home/VideoGallery/VideoGallery";
import { useEffect } from "react";
import Properties from "@/components/home/properties/Properties";
import FAQ from "@/components/detail/FAQ";

export default function Home() {

  return (
    <main>
      <Head>
        <title>
          مهاجرت و سرمایه گذاری با کارمونیا - پلتفرم جامع برای تجربه‌های  آسان در مهاجرت و  سرمایه گذاری
        </title>
      </Head>
      <Main>
        <Hero />
        <Properties />

        <VideoGallery />
        <Advantage />
        <Post />
        <Blogs />
        <Gallery />
        <BestSelling />
        <Reviews />
        <Steps />
        <PopularDestination />
        <NewsLetter />
        <FAQ />
      </Main>
    
    
    </main>
  );
}

