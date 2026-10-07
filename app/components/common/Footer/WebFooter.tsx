"use client";

import { useState } from "react";
import MaxWidthWrapper from "../../MaxWidthWrapper";
import AppImage from "../../AppImage";
import servicesData from "./data.json";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "../../UI/Input";
import { motion } from "framer-motion";

const WebFooter = () => {
  const router = useRouter();
  const [hoverMenuItem, setHoverMenuItem] = useState<string | null>(null);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const socials = [
    { name: "twitter" as const, url: process.env.NEXT_PUBLIC_TWITTER_URL },
    { name: "linkedin" as const, url: process.env.NEXT_PUBLIC_LINKEDIN_URL },
    { name: "insta" as const, url: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
    { name: "facebook" as const, url: process.env.NEXT_PUBLIC_FACEBOOK_URL },
  ];

  return (
    <div className="relative py-12 lg:pt-16 lg:pb-12 overflow-hidden bg-black">
      {/* VIDEO BACKGROUND */}
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-50"
      >
        <source
          src="/assest/common/bg_video.mp4"
          type="video/mp4"
        />
      </video> */}
      <video
        preload="metadata"
        autoPlay
        loop
        muted
        playsInline
        poster="/assets/common/bg_video.webp"
        aria-hidden="true"
        className="
    hidden
    md:block
    absolute inset-0
    h-full w-full
    object-cover
    pointer-events-none
    opacity-50
  "
      >
        <source
          src="/assets/common/bg_video.mp4"
          type="video/mp4"
        />
      </video>

      {/* DARK OVERLAY (IMPORTANT) */}
      {/* <div className="absolute inset-0 bg-black/50" /> */}

      {/* CONTENT */}
      <MaxWidthWrapper className="relative space-y-12 z-10">
        <div className="flex border-b border-dashed pb-12 flex-col lg:flex-row justify-between gap-10 text-white">
          {/* LEFT */}
          <div className="max-w-xl space-y-4">
            <AppImage
              name="AdAired_Dark_logo"
              alt="AdAired_Dark_logo"
              width={225}
              height={36}
              handleClick={() => router.push("/")}
              className="cursor-pointer"
            />

            <p className="text-white py-3 ">
              From SEO and paid media to web and app development, we build the
              digital foundation that helps your brand grow and compete.
            </p>

            <div className="flex gap-3">
              {socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.url || "/"}
                  target="_blank"
                  className="relative group flex h-13 w-13 items-center justify-center overflow-hidden rounded-lg border border-white/30 border-t-white/50 border-l-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.6),0_6px_10px_rgba(0,0,0,0.5)] transition-all duration-300 bg-[#050505] hover:scale-105 hover:-translate-y-1.5"
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
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="max-w-sm space-y-8">
            <h3 className="text-[clamp(1.5rem,2.5vw,2.1875rem)] font-semibold text-white">
              Stay in the Loop
            </h3>
            <p className="text-white pb-">
              Subscribe for market insights, latest trends, and valuable
              strategies.
            </p>
            <div className="mt-auto">
              <Input />
            </div>
          </div>
        </div>

        <div className="lg:flex md:flex justify-between gap-4">
          {servicesData.services.map((service, i) => (
            <div key={i + 1}>
              <h3 className="font-semibold text-[clamp(1.25rem,1.8vw,1.675rem)] text-white mt-6 lg:mt-0">
                {service.title}
              </h3>

              <div className="mt-4 space-y-2">
                {service.subServices.map((sub, j) => (
                  <Link
                    key={j}
                    onMouseEnter={() => setHoverMenuItem(`${i}-${j}`)}
                    onMouseLeave={() => setHoverMenuItem(null)}
                    // onClick={() => router.push(sub?.slug)}
                    // onClick={() => handleNavigation(sub?.slug)}
                    href={sub?.slug}
                    className="group flex items-center gap-2 w-fit cursor-pointer"
                  >
                    <p
                      className={`transition-all duration-300 ${hoverMenuItem === `${i}-${j}`
                        ? "text-gradient-primary-lr"
                        : "text-white"
                        }`}
                    >
                      {sub.name}
                    </p>

                    <motion.div
                      className="w-[18px] h-[18px] flex-shrink-0 mt-2"
                      initial={false}
                      animate={{
                        opacity: hoverMenuItem === `${i}-${j}` ? 1 : 0,
                        x: hoverMenuItem === `${i}-${j}` ? 0 : -10,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <AppImage
                        name="menuArrow"
                        alt="menuArrow"
                        width={18}
                        height={18}
                      />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:flex justify-between gap-4">
          <div className="lg:w-[65%] bg-[#FFFFFF]/10 border border-[#FFFFFF]/20 block lg:flex gap-4 rounded-[25px] px-7 py-6.75">
            <div className="lg:w-[50%] w-full border-b border-b-white/80 lg:border-b-0 md:border-r lg:border-r-white/80 lg:pr-2 lg:pb-0 pb-2">
              <div className="flex gap-2">
                <AppImage
                  width={30}
                  height={20}
                  name="india_flag"
                  alt="india_flag"
                  className="my-auto"
                />
                <p className="text-white">India</p>
              </div>
              <div>
                <Link
                  href={"https://maps.app.goo.gl/CEMtUbQd1246YQ3c7"}
                  target="_blank"
                >
                  <p className="text-white text-[16px] pt-4">
                    B-509, 5th Floor, Bestech Business Towers, Sector 66, SAS
                    Nagar, Punjab 160066
                  </p>
                </Link>
                <div className="flex gap-2 pt-3">
                  <p className="text-gradient-primary-lr">Phone Number:</p>
                  <Link href={"tel:+918907300008"} className="my-auto">
                    <p className="text-white my-auto"> +91-8907300008</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:w-[50%] w-full lg:pl-8 pt-3 lg:pt-0">
              <div className="flex gap-2">
                <AppImage
                  width={30}
                  height={20}
                  name="us_flag"
                  alt="us_flag"
                  className="my-auto"
                />
                <p className="text-white">USA</p>
              </div>
              <p className="text-white text-[16px] pt-4">
                390 NE 191st St STE 8548 MIAMI, FL 33179
              </p>
              <div className="flex gap-2 pt-3">
                <p className="text-gradient-primary-lr">Phone Number:</p>{" "}
                <Link href={"tel:+17752958661"} className="my-auto">
                  <p className="text-white my-auto ">+1 775 295 8661</p>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-[#FFFFFF]/10 w-full mt-4 lg:mt-0 lg:w-[35%] border border-[#FFFFFF]/20 rounded-[25px] px-7 py-6.75">
            <div className="flex gap-2">
              <AppImage
                width={30}
                height={20}
                name="mail"
                alt="mail"
                className="my-auto"
              />
              <p className="text-white my-auto">Email Us</p>
            </div>
            <div className="pt-2">
              <div className="flex gap-2">
                <p className="text-gradient-primary-lr">General Inquiries:</p>
                <Link
                  href={"mailto:contact@adaired.com"}
                  target="_blank"
                  className="my-auto"
                >
                  <p className="text-white my-auto">contact@adaired.com</p>
                </Link>
              </div>
              <div className="flex gap-2 mt-2">
                <p className="text-gradient-primary-lr">HR Department:</p>
                <Link
                  href={"mailto:hr@adaired.com"}
                  target="_blank"
                  className="my-auto"
                >
                  <p className="text-white my-auto">hr@adaired.com</p>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="block lg:flex justify-between">
          <div className="block md:flex mt-auto md:gap-3 gap-1">
            <p className="text-white">
              Copyright @ {new Date().getFullYear()} - Adaired Digital Media
            </p>
            <p className="text-white hidden md:block">|</p>

            <Link
              href={"/terms-of-service"}
              className="text-white cursor-pointer transition-all duration-300 hover:text-gradient-primary-lr"
            >
              Terms of Service
            </Link>
            <p className="text-white hidden md:block">|</p>
            <Link
              href={"/privacy-policy"}
              className="text-white cursor-pointer transition-all duration-300 hover:text-gradient-primary-lr"
            >
              Privacy Policy{" "}
            </Link>
            <p className="text-white hidden md:block">|</p>
            <Link
              href={"/sitemap"}
              className="text-white transition-all cursor-pointer duration-300 hover:text-gradient-primary-lr"
            >
              {" "}
              Site Map
            </Link>
          </div>
          <div className="flex mt-3 lg:mt-0 md:gap-3 gap-1">
            <div>
              <h3 className="font relative text-left text-md font-semibold tracking-wide text-white after:absolute after:bottom-[-5px] after:left-0 after:h-0.5 after:w-16 after:bg-[#000000] after:content-[''] lg:text-md">
                Payments
              </h3>{" "}
              <div
                onClick={() =>
                  window.open("https://rzp.io/rzp/d1LYdsU", "_blank")
                }
                className="flex bg-[#F7F7F7] rounded-md cursor-pointer mt-2 w-fit gap-"
              >
                <div className="cursor-pointer mb-auto ">
                  <AppImage
                    name={"raserpay"}
                    width={50}
                    height={60}
                    alt="logo_razorpay"
                    className="my-auto rounded-tl-md rounded-bl-md"
                  />
                </div>
                <div className="my-auto px-3 bg-[#072654] pt-2.5 pb-1 rounded-tr-md rounded-br-md">
                  <h3 className="text-white text-[18px] leading-3 italic">
                    Pay Now
                  </h3>
                  <span className="text-12 text-white font-normal">
                    Secured by Razorpay
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default WebFooter;