import React, { useState, useRef, useEffect } from "react";

const MultiSelectDropdown = ({
  items = [],
  selectedItems = [],
  handleSelect,
  placeholder = "میتوانید چند مورد را انتخاب کنید",
  className,
  icon
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const filteredItems = items.filter((item) =>
    item.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemSelect = (item) => {
    const isAlreadySelected = selectedItems.some(
      (selected) => selected.id === item.id
    );
    const updatedSelection = isAlreadySelected
      ? selectedItems.filter((selected) => selected.id !== item.id)
      : [...selectedItems, item];

    handleSelect(updatedSelection);
  };

  const handleRemoveSelectedItem = (item) => {
    const updatedSelection = selectedItems.filter(
      (selected) => selected.id !== item.id
    );
    handleSelect(updatedSelection);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (e, description) => {
    const rect = e.target.getBoundingClientRect();
    setTooltipContent(description);
    setTooltipPosition({
      top: rect.top + window.scrollY,
      left: rect.right + 10,
    });
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`inline-flex justify-between items-center px-2 py-2 text-center text-sm font-medium text-gray-700 bg-white dark:!bg-[#0a2d4d] border border-gray-300 dark:border-blue-500  rounded-md shadow-sm focus:outline-none ${className}`}
      >
<div className="flex gap-1 overflow-x-hidden overflow-y-hidden scrollbar-hidden  whitespace-nowrap">
{selectedItems.length > 0 ? (
            selectedItems.map((item) => (
              <div
                key={item.id}
                className="bg-blue-100  text-blue-700 px-2 py-1 rounded-md flex items-center gap-1 "
              >
                {icon && <span className="mr-1">{icon}</span>}
                {item.value}
                <span
                  className="text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveSelectedItem(item);
                  }}
                >
                  &times;
                </span>
              </div>
            ))
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 ml-2"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-10 p-2">
          <input
            type="text"
            placeholder="جستجو کن"
            className="w-full px-4 py-2 border-b dark:border-gray-700 focus:outline-none dark:bg-gray-800"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="max-h-40 overflow-y-auto mt-2 flex flex-col gap-1">
            {filteredItems.map((item) => (
              <li
                key={item.id}
                onClick={() => handleItemSelect(item)}
                onMouseEnter={(e) => handleMouseEnter(e, item.description)}
                onMouseLeave={handleMouseLeave}
                className={`px-4 py-2 rounded-md cursor-pointer ${
                  selectedItems.some((selected) => selected.id === item.id)
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-900"
                }`}
              >
                {item.value}
              </li>
            ))}
            {filteredItems.length === 0 && (
              <li className="text-gray-500 text-center py-2">
                هیچ گزینه‌ای موجود نیست
              </li>
            )}
          </ul>
        </div>
      )}
      {tooltipContent && (
        <div
          className="fixed bg-black/50 text-white text-sm text-wrap max-w-[150px] py-1 px-2 rounded-md shadow-lg backdrop-blur-md"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            zIndex: 50,
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
