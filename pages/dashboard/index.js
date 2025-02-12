import Panel from "@/layouts/Panel";
import React from "react";
import DashboardCard01  from "./partials/DashboardCard01";

const Dashboard = () => {
  const sampleData = [
    {
      label: "بازدیدها",
      value: "12.3k",
      chartData: [
        {
          label: "این هفته",
          data: [12, 19, 3, 5, 2, 3],
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
        },
        {
          label: "هفته قبل",
          data: [11, 18, 4, 6, 3, 4],
          borderColor: "rgba(255,99,132,1)",
          backgroundColor: "rgba(255,99,132,0.2)",
        },
      ],
      chartLabels: ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه"],
    },
    {
      label: "فروش",
      value: "7.8k",
      chartData: [
        {
          label: "این هفته",
          data: [10, 15, 9, 8, 5, 6],
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
        },
        {
          label: "هفته قبل",
          data: [8, 14, 10, 9, 7, 5],
          borderColor: "rgba(255,99,132,1)",
          backgroundColor: "rgba(255,99,132,0.2)",
        },
      ],
      chartLabels: ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه"],
    },
    {
      label: "پست‌ها",
      value: "320",
      chartData: [
        {
          label: "این هفته",
          data: [5, 7, 6, 8, 6, 5],
          borderColor: "rgba(255,159,64,1)",
          backgroundColor: "rgba(255,159,64,0.2)",
        },
        {
          label: "هفته قبل",
          data: [4, 6, 5, 7, 5, 6],
          borderColor: "rgba(255,159,64,1)",
          backgroundColor: "rgba(255,159,64,0.2)",
        },
      ],
      chartLabels: ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه"],
    },
    {
      label: "کامنت‌ها",
      value: "150",
      chartData: [
        {
          label: "این هفته",
          data: [3, 5, 4, 7, 6, 5],
          borderColor: "rgba(153,102,255,1)",
          backgroundColor: "rgba(153,102,255,0.2)",
        },
        {
          label: "هفته قبل",
          data: [2, 4, 3, 6, 5, 4],
          borderColor: "rgba(153,102,255,1)",
          backgroundColor: "rgba(153,102,255,0.2)",
        },
      ],
      chartLabels: ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه"],
    },
    {
      label: "اخبار",
      value: "5",
      chartData: [
        {
          label: "این هفته",
          data: [2, 3, 3, 4, 4, 5],
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
        },
        {
          label: "هفته قبل",
          data: [1, 2, 2, 3, 3, 4],
          borderColor: "rgba(255,99,132,1)",
          backgroundColor: "rgba(255,99,132,0.2)",
        },
      ],
      chartLabels: ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه"],
    },
  ];

  return (
    <Panel>
      <div className="w-full h-full flex justify-center items-start  !rounded">
      <main className="grow">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <div className="grid grid-cols-12 gap-6">
      <DashboardCard01 />

      </div>
      </div>
      </main>
      </div>
    </Panel>
  );
};

export default Dashboard;