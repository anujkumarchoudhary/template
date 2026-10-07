"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { setLoading } from "@/app/redux/slice/loader.slice";

const LoaderStop = ({ slug }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  if (slug) {
    dispatch(setLoading(false));
  }
  return null;
};

export default LoaderStop;