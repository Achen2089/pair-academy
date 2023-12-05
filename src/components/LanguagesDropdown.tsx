import React from "react";
import Select from "react-select";
import { languageOptions } from "../constants/languageOptions";

type LanguagesDropdownProps = {
    onSelectChange: (selectedOption: ValueType<{ label: string; value: string }, true>) => void;
};

const LanguagesDropdown = ({ onSelectChange }: LanguagesDropdownProps) => {
  return (
    <Select
      className="bg-white border-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      placeholder={`Filter By Category`}
      options={languageOptions}
      defaultValue={languageOptions[0]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
};

export default LanguagesDropdown;