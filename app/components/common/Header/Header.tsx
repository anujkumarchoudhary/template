"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// import { useInViewOnce } from "@/@core/hooks/useInViewOnce";

import { useSelector } from "react-redux";

import AppIcon from "../../AppIcon";
import { IoClose } from "react-icons/io5";
import {
  MdKeyboardDoubleArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";

import Link from "next/link";

import Megamenu from "./Megamenu";
// import MaxWidthWrapper from "../../MaxWidthWrapper";
// import GetQuoteModal from "../../../components/popup/GetEnquiryModal";
import GridiantButton from "../GridiantButton";
import logo from '../../../../public/vercel.svg'

import Image from "next/image";

import dropdownBars from "../../../../public/assets/header/dropdownBars.png";
import dropdownBarsDark from "../../../../public/assets/header/dropdownBarsDark.svg";

import menuData from "./menuData.json";

const Header = ({ scrolled }: any) => {
  const path = usePathname();
  const [openMobilemenu, setOpenMobileMenu] = useState(false);
  // const { ref, isVisible } = useInViewOnce<HTMLDivElement>(0.2);
  const [open, setOpen] = useState(false);
  const [openEnquiry, setOpenEnquiry] = useState(false);
  const isDark = useSelector((state: any) => state.ui.isDark);
  const [level, setLevel] = useState<0 | 1>(0);
  const [activeMenu, setActiveMenu] = useState<any>(null);
  const [activeGroup, setActiveGroup] = useState<any>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // if (open && ref.current && !ref.current.contains(event.target as Node)) {
      //   setOpen(false);
      // }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    // const shouldLock = open || openMobilemenu || openEnquiry;
    const shouldLock = openMobilemenu || openEnquiry;

    if (shouldLock) {
      document.body.style.overflow = "hidden";
      // document.body.style.height = "100vh";

      document.documentElement.style.overflow = "hidden";
      // document.documentElement.style.height = "100vh";

      const main = document.getElementById("main");

      if (main) {
        main.style.overflow = "hidden";
        main.style.height = "100vh";
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";

      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";

      const main = document.getElementById("main");

      if (main) {
        main.style.overflow = "";
        main.style.height = "";
      }
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";

      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";

      const main = document.getElementById("main");

      if (main) {
        main.style.overflow = "";
        main.style.height = "";
      }
    };
  }, [open, openMobilemenu, openEnquiry]);

  return (
    <div
      // ref={"ref"}
      className={`bg-[#000000] py-3`}
    >
      <div>
        <div className="hidden lg:flex px-[8%] w-full items-center justify-center">
          <div className="relative flex items-center w-full justify-between p-1">
            {/* LOGO */}
            <Link
              href={"/"}
              className="cursor-pointer"
            >
              <Image
                src={logo}
                alt="brand logo"
                width={147}
                height={23}
                className="aspect-147/23 w-[clamp(80px,9vw,160px)] h-auto"
              />
            </Link>

            {/* BUTTON & DROPDOWN */}
            <div className="flex items-center gap-4">
              <GridiantButton
                name="helloWhite"
                href={"/schedule-appointment"}
              />
              <div
                className="relative flex items-center justify-center"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                {open ? (
                  <div className="w-22 h-fit border border-white/20 rounded-full p-2 from-white/10 to-white/0 backdrop-blur-md cursor-pointer">
                    <AppIcon
                      name="close"
                      size={30}
                      className={`aspect-30/19 w-[clamp(20px,2vw,30px)] mx-auto ${isDark ? "text-white" : "text-black"
                        }`}
                    />
                  </div>
                ) : (
                  <div className="w-22 h-fit cursor-pointer">
                    <Image
                      src={isDark ? dropdownBars : dropdownBarsDark}
                      alt="dropdown bars"
                      width={34}
                      height={19}
                      className="mx-auto aspect-34/19 w-[clamp(20px,2vw,42px)] h-auto"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>


        <div className="flex px-[4%] lg:hidden items-center justify-between">
          <Link href="/" className="cursor-pointer">
            <Image
              src={logo}
              alt="brand logo"
              width={120}
              height={40}
              className="w-[120px] h-[40px] object-contain"
              priority
            />
          </Link>

          <Image
            onClick={() => {
              setOpenMobileMenu(!openMobilemenu);
            }}
            src={dropdownBars}
            alt="dropdown bars"
            width={30}
            height={15}
            className="w-[30px] h-[15px] object-contain cursor-pointer"
            priority
          />
        </div>
        <Megamenu
          handleClose={() => setOpen(false)}
          isDark={isDark}
          isOpen={open}
        />

        {openMobilemenu && (
          <div className="fixed inset-0 z-40 lg:hidden">
            {/* OVERLAY */}
            <div
              className="absolute inset-0 h-160 w-160 bg-black/60"
              onClick={() => {
                setLevel(0);
                setActiveMenu(null);
                setActiveGroup(null);
              }}
            />

            {/* DRAWER */}
            <div
              className={`absolute right-0 top-0 h-full w-full transform bg-white transition-transform duration-300 ease-in-out md:w-[80%] `}
            >
              {/* HEADER */}
              <div className="mb-6 flex items-center bg-black p-5 justify-between">
                {level > 0 ? (
                  <button
                    aria-label={`Go back to ${level === 1 ? "main menu" : activeMenu.name} menu`}
                    onClick={() => {
                      setLevel(0);
                      setActiveMenu(null);
                      setActiveGroup(null);
                    }}
                    className="flex items-center gap-1 text-lg font-semibold cursor-pointer text-white"
                  >
                    <MdOutlineKeyboardDoubleArrowLeft />
                    Back
                  </button>
                ) : (
                  <h3 className="text-lg text-white font-semibold ">Menu</h3>
                )}

                <button
                  aria-label="Close mobile menu"
                  onClick={() => {
                    setLevel(0);
                    setActiveMenu(null);
                    setActiveGroup(null);
                    setOpenMobileMenu(false);
                  }}
                >
                  <IoClose size={22} className="text-white cursor-pointer" />
                </button>
              </div>

              {/* LEVEL CONTAINER */}
              <div className="relative h-full w-[90%] mx-auto overflow-hidden">
                {/* ================= LEVEL 0 – MAIN MENU ================= */}
                <div
                  className={`absolute inset-0 transition-transform duration-300 ease-in-out ${level === 0 ? "translate-x-0" : "-translate-x-full"} `}
                >
                  <nav className="space-y-4">
                    {menuData?.menu.map((menu: any, idx: number) => (
                      <div key={idx}>
                        {menu.subMenu ? (
                          <div className="flex w-full justify-between">
                            <p
                              onClick={() => {
                                setActiveMenu(menu);
                                setLevel(1);
                              }}
                              className="flex cursor-pointer w-fit items-center justify-between text-sm font-medium text-black"
                            >
                              {menu.name}
                            </p>
                            <MdKeyboardDoubleArrowLeft
                              onClick={() => {
                                setActiveMenu(menu);
                                setLevel(1);
                              }}
                              className="rotate-180 cursor-pointer"
                            />
                          </div>
                        ) : (
                          <Link
                            href={menu.link}
                            onClick={() => setOpenMobileMenu(false)}
                            className="block text-sm font-medium text-black"
                          >
                            {menu.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </nav>
                </div>

                {/* ================= LEVEL 1 – SERVICES / RESOURCES & LEVEL 2 – FINAL LINKS ================= */}
                <div
                  className={`absolute inset-0 transition-transform duration-300 ease-in-out ${level === 1 ? "translate-x-0" : "translate-x-full"} `}
                >
                  <nav className="space-y-4">
                    {activeMenu?.subMenu?.map((group: any, i: number) => {
                      const isOpen = activeGroup?.name === group.name;

                      return (
                        <div key={i} className="border-b border-gray-200 pb-3">
                          {group.menuItem ? (
                            <>
                              {/* Parent Button */}
                              <button

                                aria-label={`View ${group.name} options`}

                                className="flex w-full  items-center justify-between text-sm font-medium text-black cursor-pointer"
                              >
                                <Link href={group?.link} onClick={() => setOpenMobileMenu(false)} >{group.name}</Link>
                                <MdKeyboardDoubleArrowLeft
                                  onClick={() =>
                                    setActiveGroup(isOpen ? null : group)
                                  }
                                  className={`rotate-180 transition-transform duration-300 ${isOpen ? "-rotate-90" : ""
                                    }`}
                                />
                              </button>

                              {/* Expanded Links */}
                              <div
                                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-125 mt-3" : "max-h-0"
                                  }`}
                              >
                                <div className="space-y-2 pl-3">
                                  {group.menuItem?.map(
                                    (item: any, idx: number) => (
                                      <Link
                                        key={idx}
                                        href={item.link}
                                        onClick={() => setOpenMobileMenu(false)}
                                        className="flex items-center gap-2 text-xs text-black"
                                      >
                                        <MdOutlineKeyboardArrowRight />
                                        {item.name}
                                      </Link>
                                    ),
                                  )}
                                </div>
                              </div>
                            </>
                          ) : (
                            <Link
                              href={group.link}
                              onClick={() => setOpenMobileMenu(false)}
                              className="block text-sm font-medium text-black cursor-pointer"
                            >
                              {group.name}
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}


      </div>
{/* 
      <GetQuoteModal
        isOpen={openEnquiry}
        onClose={() => setOpenEnquiry(false)}
      /> */}
    </div>
  );
};

export default Header;