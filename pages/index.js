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
import VideoGallery from "@/pages/video-gallery";
import Properties from "@/components/home/properties/Properties";
import FAQ from "@/components/detail/FAQ";

export default function Home({ initialData }) {
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
        
        <VideoGallery initialData={initialData} />
        
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

export async function getServerSideProps() {
  const page = 1;
  const limit = 8;

  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${apiUrl}/api/media/media?page=${page}&limit=${limit}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const data = await res.json();

    return {
      props: {
        initialData: data || { data: [], total: 0 },
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        initialData: { data: [], total: 0 },
      },
    };
  }
}
