import React from 'react'

function ToolBar() {
  return (
    <div className="sticky md:hidden z-[100] bottom-4 p-1 px-2 m-6 bg-white dark:bg-gray-900 shadow-3xl text-gray-500 rounded-2xl cursor-pointer">

        <div className=" p-2 rounded-2xl flex items-center justify-between">
	
			<div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
					stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
						d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
				</svg>
			</div>
			<div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
					stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
						d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
				</svg>
			</div>

			
			<div className="flex flex-col items-center  hover:text-blue-400 ">
				<div
					className="absolute bottom-5 shadow-2xl text-center flex items-center justify-center rounded-full border-4 text-3xl border-gray-50 hover:border-[#fc4b6c] bg-[#fc4b6c] w-[70px] h-[70px] p-2 text-white transition ease-in duration-200 ">
					<i className="fas fa-phone-alt"></i>
					<span
                            className="animate-ping  border-[#fc4b6c] absolute inline-flex h-full w-full rounded-full border-4 opacity-50"></span>
				</div>
			</div>
			<div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
					stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
						d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
				</svg>
			</div>
			<div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
					stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
						d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
				</svg>
			</div>
    
      </div>

		</div>
  )
}

export default ToolBar