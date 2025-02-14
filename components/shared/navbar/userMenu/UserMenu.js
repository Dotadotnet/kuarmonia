

import React from "react";
import Search from "../searchTrio/Search";
import Cart from "../cart/Cart";
import Favorites from "../favorites/Favorites";
import LargeDevice from "./LargeDevice";
const UserMenu = () => {
  return (
    <div className="flex flex-row lg:col-span-2 items-center gap-x-3 z-[9999] ">
      <Search forToolbar={false} />
      <Favorites forToolbar={false} />
      <Cart  forToolbar={false} />
      <LargeDevice />
    </div>
  );
};

export default UserMenu;
