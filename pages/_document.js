import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react"; // وارد کردن useEffect از React

export default function Document() {
  return (
    <Html lang="fa">
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>
          مهاجرت و ازدواج در ترکیه و کانادا - راهنمای جامع برای تصمیم‌گیری بهتر
        </title>

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
        <meta property="og:title" content="مهاجرت و ازدواج در ترکیه و کانادا" />
        <meta
          property="og:site_name"
          content="مهاجرت و ازدواج در ترکیه و کانادا"
        />
        <meta
          property="og:url"
          content="https://kuarmonia.com" //
        />
        <meta
          property="og:description"
          content="راهنمای جامع برای مهاجرت و ازدواج در ترکیه و کانادا با نکات کلیدی و خدمات مشاوره."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://s3-console.kuarmonia.com/main/e58b2333-8860-4f68-a9a2-522004e2cfe8.webp"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://x.com/kuarmonia?s=09" //
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
          content="https://s3-console.kuarmonia.com/main/84a10727-61b7-4199-91bf-12989c4e575a.webp"
        />

        <meta property="pint:url" content="https://pin.it/4MeWds31o" />
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
          content="https://s3-console.kuarmonia.com/main/84a10727-61b7-4199-91bf-12989c4e575a.webp"
        />

        <link rel="alternate" href="https://kuarmonia.com" hreflang="fa" />
        <link
          rel="preload"
          href="/fonts/vazir/Vazir.woff2"
          as="font"
          type="font/woff2"
          crossorigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/DigiNozha/DigiNozha2Bold.woff2"
          as="font"
          type="font/woff2"
          crossorigin="anonymous"
        />
        <link rel="canonical" href="https://kuarmonia.com" />
      </Head>
      <body dir="rtl">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
