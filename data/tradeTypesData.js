const tradeTypes = [
    {
      id: "1",
      value: "joint-venture",
      label: "مشارکت در ساخت",
      description: "مالک و سازنده ملک را ساخته و تقسیم می‌کنند.",
      priceFields: [], // نیازی به مقدار مالی ندارد
    },
    {
      id: "2",
      value: "mortgage",
      label: "رهن کامل",
      description: "پرداخت ودیعه بدون اجاره ماهانه.",
      priceFields: ["deposit"], // فقط مبلغ ودیعه (رهن)
    },
    {
      id: "3",
      value: "leasing",
      label: "لیزینگ",
      description: "اجاره بلندمدت با امکان خرید پس از پایان قرارداد.",
      priceFields: ["monthlyRent"], // فقط مبلغ اجاره ماهانه
    },
    {
      id: "4",
      value: "property-exchange",
      label: "معاوضه ملک",
      description: "تعویض دو ملک با یکدیگر.",
      priceFields: ["propertyValue"], // ارزش ملک مورد معاوضه
    },
    {
      id: "5",
      value: "usufruct",
      label: "حق بهره‌برداری",
      description: "اجازه استفاده از ملک بدون انتقال مالکیت.",
      priceFields: ["monthlyRent"], // مبلغ اجاره ماهانه
    },
    {
      id: "6",
      value: "rent-to-own",
      label: "اجاره به شرط تملیک",
      description: "اجاره اولیه که بخشی از قیمت خرید محسوب می‌شود.",
      priceFields: ["monthlyRent", "totalPrice"], // مبلغ اجاره ماهانه + قیمت کل
    },
    {
      id: "7",
      value: "government-property",
      label: "خانه‌های سازمانی / دولتی",
      description: "مختص کارمندان دولتی یا شرکت‌های خاص.",
      priceFields: [], // بدون نیاز به مقدار مالی
    },
    {
      id: "8",
      value: "installment-sale",
      label: "فروش اقساطی",
      description: "پرداخت قیمت ملک در اقساط مشخص شده.",
      priceFields: ["installmentAmount", "totalPrice"], // مبلغ قسط و قیمت کل
    },
    {
      id: "9",
      value: "investment-property",
      label: "ملک سرمایه‌گذاری",
      description: "خرید ملک با هدف افزایش ارزش یا دریافت درآمد.",
      priceFields: ["totalPrice"], // فقط قیمت کل
    },
    {
      id: "10",
      value: "commercial-rental",
      label: "اجاره تجاری",
      description: "اجاره ملک برای کسب‌وکار و فعالیت‌های تجاری.",
      priceFields: ["monthlyRent"], // مبلغ اجاره ماهانه
    },
  ];
  export default tradeTypes;
