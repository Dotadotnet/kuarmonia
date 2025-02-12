

import React from "react";
import Search from "../searchTrio/Search";
import Cart from "../cart/Cart";
import Favorites from "../favorites/Favorites";
const UserMenu = () => {
  return (
    <div className="flex flex-row lg:col-span-2 items-center gap-x-3 z-[9999] ">
      <Search />
      <Favorites />
      <Cart />
    </div>
  );
};

export default UserMenu;
