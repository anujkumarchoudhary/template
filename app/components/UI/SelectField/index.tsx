import React from "react";
import { CgAsterisk } from "react-icons/cg";

export interface SelectFieldProps {
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  label?: string;
  className?: string;
  error?: string;
  required?: boolean;
}

const labelClass = "flex text-black font-semibold mb-2 uppercase";

const SelectField = ({
  name,
  value,
  handleChange,
  options,
  optionName,
  label,
  className,
  error,
  required,
}: any) => {
  return (
    <div className="relative">
      {label && (
        <span id={name} className={labelClass}>
          {label} {required && <CgAsterisk color="red" />}
        </span>
      )}
      <select
        id={name}
        aria-label='{label || "select field"}'
        name={name}
        value={value}
        onChange={handleChange}
        className={`${className} w-full text-[15px] rounded-lg bg-[#F8F8F8] px-4 py-3 font-normal text-black outline-none placeholder:text-[#A3A3A3] focus:border-[#000000] `}
      >
        <option value="" disabled hidden>
          Select {optionName}
        </option>

        {options?.map((opt: any, idx: number) => (
          <option key={idx} value={opt?.value || opt?._id}>
            {opt?.label || opt?.name}
          </option>
        ))}
      </select>
      {error && (
        <span className="absolute left-0 top-18 py-2 z-20 w-fit text-[12px] text-red-500">
          {error}
        </span>
      )}
    </div>
  );
};

export default SelectField;