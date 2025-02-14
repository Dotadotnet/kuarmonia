import React from 'react'
import { CiUser } from 'react-icons/ci'
import { FaUserCog } from 'react-icons/fa'
import { FaRegUser } from "react-icons/fa";
import Favorites from '../favorites/Favorites';
import Cart from '../cart/Cart';
import Search from '../searchTrio/Search';

function ToolBar() {
	return (
		<div className='px-5 sm:px-25 z-[9999] fixed w-full bottom-4'>
			<div className=" md:hidden  p-1  w-full px-5 bg-white dark:bg-gray-900 shadow-3xl text-gray-500 rounded-2xl cursor-pointer">
				<div className=" p-2 rounded-2xl flex items-center justify-between">
					
				<Search forToolbar={true} />


					<Cart forToolbar={true}  />


					<div className="flex flex-col items-center  hover:text-blue-400 ">
						<div
							className="absolute bottom-3 shadow-2xl text-center flex items-center justify-center rounded-full border-4 text-3xl border-gray-50 hover:border-[rgb(34,197,94)] bg-[rgb(34,197,94)] w-[68px] h-[68px] p-2 text-white transition ease-in duration-200 ">
							<i className="fas fa-phone-alt"></i>
							<span
								className="animate-ping  border-[rgb(34,197,94)] absolute inline-flex h-full w-full rounded-full border-4 opacity-50"></span>
						</div>
					</div>
					<Favorites forToolbar={true}  />
					{localStorage.getItem("accessToken") && Object.keys(user).length > 0 ? (
						<div onClick={() => { window.location.href = '/dashboard' }} className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
							<FaUserCog className="text-xl font-bold" />
						</div>
					) : (
						<div onClick={() => { window.location.href = '/auth/signup' }} className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
							<FaRegUser className="text-xl font-bold" />
						</div>
					)}

				</div>

			</div>
		</div>

	)
}

export default ToolBar