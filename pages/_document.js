import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from 'react';  // وارد کردن useEffect از React

export default function Document() {
  useEffect(() => {


    
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.hasAttribute('alt') || img.alt.trim() === "") {  // بررسی می‌کند که alt وجود ندارد یا خالی است
        console.warn(`تصویر در ایندکس ${index} فاقد ویژگی "alt" است:`, img);
      }
    });
 

    
  }, []);




   
  return (
    <Html lang="fa">
      <Head>
        {/* Primary Meta Tags */}
        <meta name="google-site-verification" content="SOxkFOM1l2F4dTtdCrBXiUSxRSaOV_faLA-6YsW0F4U" />
        <meta
          name="title"
          content="مهاجرت و ازدواج در ترکیه و کانادا - راهنمای جامع برای تصمیم‌گیری بهتر"
        />
        <meta
          name="description"
          content="با اطلاعات کامل در مورد مهاجرت، ازدواج، و زندگی در ترکیه و کانادا. نکات کلیدی، شرایط قانونی، و خدمات مشاوره برای زوج‌ها و خانواده‌ها."
        />
        <meta
          name="keywords"
          content="مهاجرت, ازدواج, ترکیه, کانادا, خدمات مشاوره, زندگی, نکات قانونی, زوج‌ها, خانواده‌ها"
        />

        <meta name="robots" content="index, follow" />
        <meta content="text/html; charset=utf-8" />
        <meta name="language" content="persian" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="marjan" />

        {/* Open Graph / Facebook Meta Tags */}
        <meta
          property="og:title"
          content="مهاجرت و ازدواج در ترکیه و کانادا"
        />
        <meta
          property="og:site_name"
          content="مهاجرت و ازدواج در ترکیه و کانادا"
        />
        <meta
          property="og:url"
          content="https://your-website-url.com" // 
        />
        <meta
          property="og:description"
          content="راهنمای جامع برای مهاجرت و ازدواج در ترکیه و کانادا با نکات کلیدی و خدمات مشاوره."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/your-image-url.png"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://your-website-url.com" // 
        />
        <meta
          name="twitter:title"
          content="مهاجرت و ازدواج در ترکیه و کانادا"
        />
        <meta
          name="twitter:description"
          content="راهنمای جامع برای مهاجرت و ازدواج در ترکیه و کانادا با نکات کلیدی و خدمات مشاوره."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/your-image-url.png" // URL تصویر مربوط به محتوا
        />

        <meta name="pinterest-rich-pin" content="true" />
        <meta
          name="pinterest:title"
          content="مهاجرت و ازدواج در ترکیه و کانادا"
        />
        <meta
          name="pinterest:description"
          content="راهنمای جامع برای مهاجرت و ازدواج در ترکیه و کانادا با نکات کلیدی و خدمات مشاوره."
        />
        <meta
          name="pinterest:image"
          content="https://res.cloudinary.com/your-image-url.png" // URL تصویر مربوط به محتوا
        />
      </Head>
      <body dir="rtl">
        <Main />
        <NextScript />
     
          
      </body>
    </Html>
  );
}
