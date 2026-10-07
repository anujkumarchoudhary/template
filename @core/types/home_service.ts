import { StaticImageData } from "next/image";

export type ServiceItem = {
  icon: any;
  image: string | StaticImageData;
  label: string;
  title: string;
  description: string;
  link: string;
};

export type Service = {
  list: ServiceItem[];
};