// "use client";

// import { ReactNode, useState } from "react";
// // import { useInViewOnce } from "@/@core/hooks/useInViewOnce";
// // import MaxWidthWrapper from "./MaxWidthWrapper";
// // import GetEnquiryModal from "./popup/GetEnquiryModal";
// import BannerButton from "./BannerButton";
// import Heading from "./common/Heading";
// // import AppImage from "./AppImage";
// import Image from "next/image";
// import tool_1 from '../../public/assets/images/top_ai_tools/certificate.webp'
// import tool_2 from '../../public/assets/images/top_ai_tools/certificate_1.png'
// import tool_3 from '../../public/assets/images/top_ai_tools/certificate_2.png'
// import tool_4 from '../../public/assets/images/top_ai_tools/certificate_3.png'
// import tool_5 from '../../public/assets/images/top_ai_tools/certificate_4.png'
// import tool_6 from '../../public/assets/images/top_ai_tools/certificate_5.png'
// import tool_7 from '../../public/assets/images/top_ai_tools/certificate_6.png'

// interface BannerClientProps {
//   children: ReactNode;
// }

// const certificates = [
//   {
//     logo: tool_1,
//   },
//   {
//     logo: tool_2,
//   },
//   {
//     logo: tool_3,
//   },
//   {
//     logo: tool_4,
//   },
//   {
//     logo: tool_5,
//   },
//   {
//     logo: tool_6,
//   },
//   {
//     logo: tool_7,
//   },
// ];

// const sliderItems = [...certificates, ...certificates];

// const BannerClient = ({ children }: BannerClientProps) => {
//   const [open, setOpen] = useState(false);
//   const { ref, isVisible } = useInViewOnce<HTMLDivElement>(0.2);
//   const handleClick2 = () => {
//     const section = document.getElementById("case-study");

//     if (section) {
//       section.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   };

//   return (
//     <div
//       ref={ref}
//       className="relative mx-auto w-full overflow-hidden bg-black pt-12"
//     >
//       {/* BACKGROUND VIDEO */}
//       {/* <video
//         preload="metadata"
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute inset-0 h-full w-full object-cover pointer-events-none opacity-50"
//       >
//         <source
//           src="/assets/common/bg_video.mp4"
//           type="video/mp4"
//         />
//       </video> */}
//       <video
//         preload="metadata"
//         autoPlay
//         loop
//         muted
//         playsInline
//         poster="/assets/common/bg_video.webp"
//         aria-hidden="true"
//         className="
//     hidden
//     md:block
//     absolute inset-0
//     h-full w-full
//     object-cover
//     pointer-events-none
//     opacity-50
//   "
//       >
//         <source
//           src="/assets/common/bg_video.mp4"
//           type="video/mp4"
//         />
//       </video>

//       <MaxWidthWrapper
//         customPaddingRight={1}
//         className="relative z-10 lg:h-screen"
//       >
//         <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen">
//           {/* LEFT */}
//           <div className="w-full my-auto space-y-5 transition-all duration-1000">
//             <div className="flex items-center justify-center lg:justify-start md:justify-center lg:gap-4 gap-2 lg:pt-0 md:pt-35 pt-28">
//               <AppImage
//                 name="GooglePartnerImg"
//                 alt="google partner"
//                 width={166}
//                 height={74}
//                 loading="eager"
//                 className="w-25 md:w-35 lg:w-41.5 h-auto cursor-pointer"
//                 handleClick={() =>
//                   window.open(
//                     "https://www.google.com/partners/agency?id=7775339798",
//                     "_blank",
//                     "noopener,noreferrer",
//                   )
//                 }
//               />

//               <div className="h-15 md:h-20 lg:h-23 w-[1.5px] bg-linear-to-b from-[#000000] via-[#FFFFFF]/80 to-[#000000]" />

//               <AppImage
//                 name="UpWork"
//                 alt="upwork"
//                 width={130}
//                 height={39}
//                 loading="eager"
//                 className="w-21.25 md:w-28.75 lg:w-32.5 h-auto cursor-pointer"
//                 handleClick={() =>
//                   window.open(
//                     "https://www.upwork.com/agencies/1064740584575918080/",
//                     "_blank",
//                     "noopener,noreferrer",
//                   )
//                 }
//               />
//             </div>

//             {/* HEADING */}
//             <div className="w-[90%] mb-16">
//               <Heading
//                 textColor="#ffffff"
//                 textSize="text-[20px]"
//                 lineHeight="leading-[35px]"
//                 isH1={true}
//                 isGradient={true}
//                 headingParts={[
//                   {
//                     text: "AI-Powered Digital Marketing Agency Built for",
//                     color: "#ffffff",
//                     weight: 400,
//                   },
//                   {
//                     text: "Results, Not Clicks.",
//                     gradient: "var(--gradient-primary-lr)",
//                     weight: 900,
//                   },
//                 ]}
//                 description="Grow Your Business with an AI marketing agency that offers workflows and strategies designed for the AI-powered world."
//               />
//             </div>

//             {/* BUTTON */}
//             <BannerButton name="Book My Free Consultation" name2="View Our Work" handleClick={() => setOpen(true)} handleClick2={handleClick2} />
//           </div>

//           {/* RIGHT HERO IMAGE FROM SERVER COMPONENT */}
//           {children}

//           {/* CERTIFICATES */}
//           <div
//             className={`absolute bottom-8 w-[83%] left-1/2 -translate-x-1/2 overflow-hidden transition-all delay-200 duration-1000 ${isVisible
//               ? "translate-y-0 opacity-100"
//               : "translate-y-16 opacity-0"
//               }`}
//           >
//             <div className="flex w-max animate-marquee md:bg-transparent md:py-0">
//               {sliderItems.map((cert, idx) => (
//                 <div
//                   key={idx}
//                   className="relative my-auto shrink-0 py-4 px-4 lg:px-16"
//                 >
//                   <Image
//                     src={cert?.logo}
//                     alt={`Certificate ${idx + 1}`}
//                     width={130}
//                     height={40}
//                     loading="lazy"
//                     sizes="150px"
//                     className="h-5 w-24.5 object-contain transition duration-300 hover:scale-110 lg:h-10 lg:w-32.5"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </MaxWidthWrapper>

//       <GetEnquiryModal isOpen={open} onClose={() => setOpen(false)} />
//     </div>
//   );
// };

// export default BannerClient;
