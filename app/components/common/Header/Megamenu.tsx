"use client";

import React, { useState } from "react";
import menuData from "./menuData.json";
import AppImage from "../../AppImage";
import { motion, AnimatePresence } from "framer-motion";
import GetEnquiryModal from "../../popup/GetEnquiryModal";
import Link from "next/link";
import { GoArrowRight, GoArrowUpRight } from "react-icons/go";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { setLoading } from "@/app/redux/slice/loader.slice";

interface IMeganenu {
  handleClose: () => void;
  isDark?: boolean;
  isOpen: boolean;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut" as const,
    },
  },
};

const socials = [
  { name: "twitter" as const, url: process.env.NEXT_PUBLIC_TWITTER_URL },
  { name: "linkedin" as const, url: process.env.NEXT_PUBLIC_LINKEDIN_URL },
  { name: "insta" as const, url: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
  { name: "facebook" as const, url: process.env.NEXT_PUBLIC_FACEBOOK_URL },
];

const Megamenu = ({ isDark, handleClose, isOpen }: IMeganenu) => {

  const [menuHovered, setMenuHovered] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [open, setOpen] = useState(false);

  const [hoverMenuItem, setHoverMenuItem] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <motion.div
      initial={false}
      animate={{
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{
        height: {
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        },
        opacity: {
          duration: 0.25,
        },
      }}
      className={`w-full overflow-hidden ${!isOpen ? "pointer-events-none" : ""
        }`}
    >
      <div className="pt-15 pb-10 gap-10">
        <motion.div
          key={menuHovered}
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className={`w-full relative`}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-5 menu_card_gap"
          >
            {menuData?.menu?.[menuHovered]?.subMenu?.map(
              (subItem: any, subIndex: number) => {
                return (
                  <motion.div
                    variants={itemVariants}
                    key={subIndex}
                    className="relative flex w-full justify-between menu_card_gap"
                  >
                    <div className="w-full">
                      <div className="group px-3.75 hover:bg-white/10 bgg-white/10 py-1.5 flex justify-between mb-4 rounded-[10px] from-white/10 to-white/0 backdrop-blur-md cursor-pointer">
                        <Link
                          href={subItem.link}
                          onClick={handleClose}
                          className={`font-medium text-[clamp(1.125rem,1.3vw,1.375rem)] cursor-pointer transition-all duration-300 group-hover:text-gradient-primary-lr leading-snug ${isDark ? "text-white" : "text-black"
                            }`}
                        >
                          {subItem.name}
                        </Link>

                        <div className="flex items-center justify-center ">
                          <GoArrowUpRight
                            size={25}
                            className="text-white transition-all duration-300 group-hover:text-[#00FFC5]"
                          />
                        </div>
                      </div>

                      {/* MENU ITEMS */}
                      <div className="">
                        {subItem?.menuItem?.map(
                          (menuItem: any, menuIndex: number) => (
                            <motion.div
                              variants={itemVariants}
                              key={menuIndex}
                            >
                              <Link
                                className={`group w-full flex justify-between px-3.75 py-2  ${hoverMenuItem ===
                                  `${subIndex}-${menuIndex}` &&
                                  "bg-white/10 rounded-[10px] from-white/10 to-white/0 backdrop-blur-md cursor-pointer"
                                  } ${menuItem.name === "View All" && "bg-white/10 rounded-[10px] from-white/10 to-white/0 backdrop-blur-md cursor-pointer"}`}
                                href={menuItem.link}
                                onClick={() => handleClose()}
                                onMouseEnter={() =>
                                  setHoverMenuItem(`${subIndex}-${menuIndex}`)
                                }
                                onMouseLeave={() => setHoverMenuItem(null)}
                              >
                                <p
                                  className={`heading-service-link text-[18px] cursor-pointer transition-all duration-300 group-hover:text-gradient-primary-lr leading-snug ${isDark ? "text-white/90" : "text-gray-700"
                                    } ${menuItem.name === "View All" && "text-gradient-primary-lr"}`}
                                >
                                  {menuItem.name}
                                </p>
                                {(menuItem.name === "View All" ||
                                  hoverMenuItem === `${subIndex}-${menuIndex}`) && (
                                    <motion.div
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className="group-hover:bg-dark_gradient-primary-lr w-7.5 h-6.25 flex justify-center my-auto p-1 rounded-md"
                                    >
                                      <GoArrowRight
                                        size={16}
                                        className="text-white"
                                      />
                                    </motion.div>
                                  )}

                              </Link>
                            </motion.div>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Divider */}
                    {subIndex <
                      (menuData?.menu?.[menuHovered]?.subMenu?.length ?? 0) - 1 && (
                        <div
                          className="
        absolute
        top-0
        right-[-0px]
        w-px
        h-full
        bg-gradient-to-b
        from-transparent
        via-white/60
        to-transparent
      "
                        />
                      )}
                  </motion.div>
                );
              },
            )}
          </motion.div>
        </motion.div>
        <div className="w-full h-px bg-linear-to-l from-transparent via-white/60 to-transparent mt-15 mb-5"></div>
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.4,
            duration: 0.5,
          }}
          className=" w-full flex justify-between rounded-fullpy-2"
        >
          <div className="flex gap-20 my-auto">
            <Link
              href={"/about-us"}
              onClick={handleClose}
              className="group flex gap-18 cursor-pointer"
            >
              <p className="text-white size-5 transition-all duration-300 group-hover:text-[#00FFC5] ">
                Company
              </p>
              <div className="flex items-center justify-center ">
                <GoArrowUpRight
                  size={25}
                  className="text-white transition-all duration-300 group-hover:text-[#00FFC5]"
                />
              </div>
            </Link>
            <div className="group flex gap-15 cursor-pointer">
              <p className="text-white size-5 transition-all duration-300 group-hover:text-[#00FFC5] ">
                Portfolio
              </p>
              <div className="flex items-center justify-center ">
                <GoArrowUpRight
                  size={25}
                  className="text-white transition-all duration-300 group-hover:text-[#00FFC5]"
                />
              </div>
            </div>
            <Link
              href={`/blog`}
              onClick={handleClose}
              className="group flex gap-8 cursor-pointer"
            >
              <p className="text-white size-5 transition-all duration-300 group-hover:text-[#00FFC5] ">
                Blog
              </p>
              <div className="flex items-center justify-center ">
                <GoArrowUpRight
                  size={25}
                  className="text-white transition-all duration-300 group-hover:text-[#00FFC5]"
                />
              </div>
            </Link>
          </div>
          <div className="flex gap-3">
            {socials.map((social) => (
              // <Link
              //   key={social.name}
              //   href={social.url || "/"}
              //   target="_blank"
              //   className="relative group flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/30 border-t-white/50 border-l-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.6),0_6px_10px_rgba(0,0,0,0.5)] transition-all duration-300 bg-[#050505] hover:scale-105 hover:-translate-y-1.5"
              // >
              <Link
                key={social.name}
                href={social.url || "/"}
                target="_blank"
                className="
    relative
    group
    flex
    h-12
    w-12
    items-center
    justify-center
    overflow-hidden
    rounded-full
    bg-[#050505]
    border
    border-white/30
    border-t-white/50
    border-l-white/40
    shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.6),0_6px_10px_rgba(0,0,0,0.5)]
    transition-all
    duration-300
    hover:scale-105
    hover:-translate-y-1.5
    [clip-path:circle(50%)]
  "
              >
                {/* 1. Animated Spinning Glow */}
                <span className="absolute inset-[-150%] group-hover:animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,#000000_0%,#2dd4bf_20%,#06b6d4_40%,#3b82f6_60%,#8b5cf6_80%,#000000_100%)] blur-xl opacity-60 group-hover:opacity-100" />

                {/* 2. Dark Radial Center Overlay */}
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,#050505_31%,transparent_111%)]" />

                {/* 3. The Icon */}
                <div className="relative z-10 flex h-full w-full items-center justify-center">
                  <AppImage
                    name={social.name}
                    alt={social.name}
                    className="h-5 w-5 object-contain"
                  />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
        <GetEnquiryModal isOpen={open} onClose={() => setOpen(false)} />
      </div>
    </motion.div >
  );
};

export default Megamenu;
