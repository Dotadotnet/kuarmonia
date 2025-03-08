import React from "react";
import Panel from "@/layouts/Panel";

const Info = ({ id }) => {
  return (
    <>
      <Panel>
        <div className="flex flex-col gap-y-4">
          <div>
            <div className="flex items-center justify-between ">
              <div>
                <a
                  href="/projects/YXGnM42Ghe/servers"
                  className="flex items-center text-slate-300 transition-all hover:text-slate-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="mr-2">بازگشت</span>
                </a>
              </div>
              <div className="ltr flex items-center space-x-3 flex-row-reverse md:space-x-5">
                <div>
                  <button
                    className="bg-teal-500 relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    id="headlessui-switch-15"
                    role="switch"
                    type="button"
                    tabIndex="0"
                    aria-checked="true"
                  >
                    <span className="sr-only">Power</span>
                    <span
                      aria-hidden="true"
                      className="translate-x-0 pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                    ></span>
                  </button>
                </div>

                <div>
                  <button className="rounded-lg border border-white/10 bg-slate-800 p-1.5 transition-all hover:bg-slate-900 v-popper--has-tooltip">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5 text-sky-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 dark:border-slate-700 dark:bg-slate-800 bg-white shadow-sm rounded-xl md:border-x mt-4 md:mx-0">
              <div className="flex max-w-full flex-wrap items-center justify-between p-5 md:p-8">
                <div className="flex flex-1 flex-col md:flex-row items-start">
                  <div className="border-b md:border-b-0 md:border-l border-slate-700 pl-4 text-3xl uppercase dark:text-slate-300 text-slate-700">
                    <div className="flex items-center text-2xl">
                      <span className="relative ml-3 mr-0.5 flex h-3 w-3">
                        <span className="animate-ping bg-teal-400 absolute inline-flex h-full w-full rounded-full opacity-75"></span>
                        <span className="bg-teal-400 relative inline-flex h-3 w-3 rounded-full"></span>
                      </span>
                      <div className="overflow-hidden text-ellipsis whitespace-nowrap text">
                        Title
                      </div>
                      <button className="appearance-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="mr-3 h-5 w-5 cursor-pointer text-slate-600 transition-all hover:text-green-500 dark:hover:text-sky-500"
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="max-w-full px-4 dark:text-slate-300 text-slate-700 mt-2 md:mt-0">
                    <div className="flex items-center text-2xl">
                      <div className="overflow-hidden text-ellipsis whitespace-nowrap text">
                        Description
                      </div>
                      <button className="appearance-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="mr-3 h-5 w-5 cursor-pointer text-slate-600 transition-all hover:text-green-500 dark:hover:text-sky-500"
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-y border-slate-700 bg-slate-800 shadow-sm md:rounded-xl md:border-x">
            <div className="p-5 md:p-8">
              <div>
                <div className="grid grid-cols-1 gap-5 font-sans md:grid-cols-5">
                  <div className="flex text-slate-400">
                    <div className="h-7 w-7 text-sky-500"></div>
                    <div className="ml-2 text-left">
                      <div className="font-sans text-xl text-slate-100">2</div>
                      <div className="font-light">اسلاگ</div>
                    </div>
                  </div>
                  <div className="flex text-slate-400">
                    <div className="h-7 w-7 text-sky-500">آیکون</div>
                    <div className="ml-1 text-left">
                      <div className="font-light">کلمات کلیدی</div>
                    </div>
                  </div>
                  <div className="flex text-slate-400">
                    <div className="h-7 w-7 text-sky-500">آیکون</div>
                    <div className="ml-1 text-left">
                      <div className="font-light">ربات</div>
                    </div>
                  </div>
                  <div className="flex text-slate-400">
                    <div className="h-7 w-7 text-sky-500">آیکون</div>
                    <div className="ml-2 text-left">
                      <div className="font-sans text-xl text-slate-100">
                        3.36 TB
                      </div>
                      <div className="font-light">TRAFFIC</div>
                    </div>
                  </div>
                  <div className="flex text-slate-400">
                    <div className="h-7 w-7 text-sky-500">آیکون</div>
                    <div className="ml-2 text-left">
                      <div className="font-sans text-xl text-slate-100">
                        850,000 <span className="font-serif">t</span>
                      </div>
                      <div className="font-light">PRICE / mo</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </>
  );
};

export default Info;
