"use client";

import React, { useEffect, useState } from "react";
import { useMemo } from "react";

import { useDefaultCountry } from "@/@core/hooks/useDefaultCountry";

import CountryList, { Country } from "country-list-with-dial-code-and-flag";
import Flag from "../Flag";

import { MdArrowDropDown } from "react-icons/md";
import { CgAsterisk } from "react-icons/cg";

interface InputFieldProps {
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  error?: string;
  label?: string;
  required?: boolean;
  setCountryCode?: (code: string) => void;
}

const labelClass = "flex text-black font-semibold mb-2 uppercase";

const PhoneInputField = ({
  name,
  value,
  handleChange,
  placeholder,
  className,
  maxLength,
  error,
  label,
  required,
  setCountryCode,
}: InputFieldProps) => {
  const countries = useMemo(() => CountryList.getAll(), []);
  const [open, setOpen] = useState(false);
  const detected = useDefaultCountry(countries);
  const [selected, setSelected] = useState<Country | null>(null);

  useEffect(() => {
    if (detected) {
      setSelected(detected);
      setCountryCode?.(detected.dial_code);
    }
  }, [detected]);

  return (
    <div className="relative">
      {label && (
        <span id={`${name}-label`} className={labelClass}>
          {label} {required && <CgAsterisk color="red" />}
        </span>
      )}

      {/* Flag dropdown */}
      <div className="absolute left-0 top-6.5">
        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="flex cursor-pointer items-center gap-1 px-2 py-3"
          >
            {selected && (
              <>
                <Flag emoji={selected.flag} />
                <span className="text-sm">{selected.dial_code}</span> {/* ✅ ADD THIS */}
                <MdArrowDropDown
                  aria-label="arrow dropdown"
                  className={`transition ${open ? "rotate-180" : ""}`}
                />
              </>
            )}
          </div>

          {open && (
            <div className="absolute z-20 mt-2 max-h-60 w-[18rem] overflow-auto rounded-md bg-[#FFFFFF] shadow">
              {countries.map((c, idx: number) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelected(c);
                    setOpen(false);
                    setCountryCode?.(c.dial_code);
                  }}
                  className="flex cursor-pointer items-center gap-3 px-3 py-2 hover:bg-blue-700 hover:text-white"
                >
                  <Flag emoji={c.flag} />
                  <span id={`${name}-${c.code}`} className="flex-1 text-xs">
                    {c.name}
                  </span>
                  <span id={`${name}-${c.code}-dial-code`} className="text-xs">
                    {c.dial_code}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Phone input (digits only) */}
      <input
        type="text"
        name={name}
        id="phone"
        aria-labelledby="phone-label"
        value={value}
        onChange={(e) => {
          const phoneOnly = e.target.value;

          if (!/^\d*$/.test(phoneOnly)) return;

          handleChange({
            ...e,
            target: {
              ...e.target,
              name,
              value: phoneOnly,
            },
          });
        }}
        maxLength={15}
        className={`${className} w-full text-[15px] rounded-lg bg-[#F8F8F8] px-4 py-3 pl-20  font-normal text-[#000000] outline-none placeholder:text-[#323232B2] focus:border-[#000000]`}
      />

      {error && (
        <span
          id={`${name}-error`}
          className="absolute left-0 top-[4.4rem] lg:top-[4.7rem] z-20 w-fit text-[11px] lg:text-[12px] text-red-500"
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default PhoneInputField;