"use client";

import { FC } from "react";

// Import icons from react-icons (or any lib you use)
import { FaUser, FaSearch, FaHome, FaFacebook } from "react-icons/fa";
import { MdArrowOutward, MdEmail, MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineKeyboardArrowRight, MdPhone, MdStar } from "react-icons/md";
import { IoMdClose, IoMdArrowDropright, IoMdArrowUp } from "react-icons/io";
import { BsArrowRight, BsArrowUpRight, BsFillPatchCheckFill } from "react-icons/bs";
import { BiSolidRightArrow, BiSolidLeftArrow, BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { FaXTwitter, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { IoCaretForwardSharp } from "react-icons/io5";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import { GoArrowUpRight, GoDownload } from "react-icons/go";
import { RxArrowTopRight } from "react-icons/rx";
import { TbPointFilled } from "react-icons/tb";

// 🔹 Define all icons in one place
const ICONS = {
  user: FaUser,
  search: FaSearch,
  home: FaHome,
  email: MdEmail,
  phone: MdPhone,
  close: IoMdClose,
  arrowRight: BsArrowRight,
  MdStar,
  BsFillPatchCheckFill,
  ArrowFillRight: BiSolidRightArrow,
  ArrowFillLeft: BiSolidLeftArrow,
  ArrowFillUp: BiSolidUpArrow,
  ArrowFillDown: BiSolidDownArrow,
  FaXTwitter,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  IoMdArrowDropright,
  IoCaretForwardSharp,
  GoArrowUpRight,
  IoMdArrowUp,
  HiOutlineArrowSmLeft,
  HiOutlineArrowSmRight,
  MdOutlineKeyboardArrowRight,
  MdKeyboardArrowUp, 
  MdKeyboardArrowDown,
  RxArrowTopRight,
  TbPointFilled,
  GoDownload

};

// 🔹 Types for safety
export type IconName = keyof typeof ICONS;

interface AppIconProps {
  name: IconName;
  size?: number;
  className?: string;
  onClick?: () => void;
}

// 🔹 Component
const AppIcon: FC<AppIconProps> = ({ name, size = 20, className, onClick }) => {
  const IconComponent = ICONS[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent size={size} className={className} onClick={onClick} />;
};

export default AppIcon;