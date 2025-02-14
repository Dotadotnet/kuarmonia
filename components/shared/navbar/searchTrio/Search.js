

import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import Tooltip from "../../tooltip/Tooltip";
import Modal from "../../modal/Modal";
import SearchFilter from "./SearchFilter";
import HighlightText from "../../highlightText/HighlightText";

const Search = ({forToolbar}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>

      {
        forToolbar ?
          <div onClick={openModal} className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
            <BiSearch className="text-xl font-bold" />
          </div>
          :
          <Tooltip text="جستجو" txtColor="text-white">
            <button
              className="p-1.5 border  rounded  border-primary/20 dark:border-gray-800"
              onClick={openModal}
            >
              <BiSearch className="text-lg" />
            </button>
          </Tooltip>
      }
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        className="lg:w-50 md:w-50 w-screen z-50 "
      >
        <div className="flex flex-col gap-y-4 h-full">
          <p className="text-2xl drop-shadow">
            جستجوی <HighlightText>مطلب مورد نظر</HighlightText>
          </p>
          <SearchFilter setIsModalOpen={setIsModalOpen} />
        </div>
      </Modal>
    </>
  );
};

export default Search;
