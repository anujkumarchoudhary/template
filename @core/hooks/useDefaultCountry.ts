"use client";

import { useEffect, useState } from "react";
import { Country } from "country-list-with-dial-code-and-flag";

export const useDefaultCountry = (countries: Country[]) => {
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch("http://ip-api.com/json/");
        // const res = await fetch("https://ipapi.co/json/");

        const data = await res.json();

        console.log("API data:", data?.country_calling_code);

        const detectedCode = data?.countryCode?.toUpperCase();

        console.log("Detected:", detectedCode);

        const match = countries.find(
          (c) => c.code.toUpperCase() === detectedCode,
        );

        console.log("Matched:", match);

        setCountry(match || countries[0]);
      } catch (err) {
        console.error("Country detect failed", err);
        setCountry(countries[240]);
      }
    };

    if (countries.length) {
      detectCountry();
    }
  }, [countries]);

  return country;
};
