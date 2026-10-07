"use client";

import { useState } from "react";
import AppIcon from "../AppIcon";
// import { ENQUIRY_MESSAGES, COMMON_MESSAGES } from "@core/constants/messages";
// import { BaseURL } from "@/app/baseUrl";
import toast from "react-hot-toast";
import CommonButton from "../common/CommonButton";

const Input = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      return "Please enter your email";
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? ""
      : "ENQUIRY_MESSAGES.EMAIL_INVALID";
  };

  const handleSubscribe = async () => {
    const validationError = validateEmail(email);

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${"BaseURL"}subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Subscription failed");
      }

      toast.success(data.message || "Subscribed successfully");

      setEmail("");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-13">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="
      w-full
      h-full
      rounded-full
      bg-white
      text-black
      pl-6
      pr-44
      outline-none
    "
      />

      <button
        className="
      group
      absolute
      right-1
      top-1
      bottom-1
      w-35
      rounded-full
      bg-gradient-primary-lr
      hover:bg-dark_gradient-primary-lr
      flex
      items-center
      justify-center
      gap-3
      transition-all
      duration-500
      cursor-pointer
    "
        onClick={handleSubscribe}
      >
        <p className="font-semibold">Subscribe</p>

        <span className="relative w-3.5 h-3.5 overflow-hidden">
          <span
            className="
          absolute left-0 top-1/2 -translate-y-1/2
          transition-all duration-500
          group-hover:translate-x-5.5
        "
          >
            <AppIcon name="ArrowFillRight" size={11} />
          </span>

          <span
            className="
          absolute left-0 top-1/2 -translate-y-1/2
          -translate-x-5.5
          transition-all duration-500
          group-hover:translate-x-0
        "
          >
            <AppIcon name="ArrowFillRight" size={11} />
          </span>
        </span>
      </button>
      {error && (
        <span className="text-red-500 text-sm mt-2 block">{error}</span>
      )}
    </div>
  );
};

export default Input;

// "use client";

// import { useState } from "react";
// import AppIcon from "../AppIcon";
// import {
//   COMMON_MESSAGES,
//   ENQUIRY_MESSAGES,
// } from "@core/constants/messages";

// const Input = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");

//   const validateEmail = (value: string) => {
//     if (!value) {
//       return "Please enter your email";
//     }

//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
//       ? ""
//       : ENQUIRY_MESSAGES.EMAIL_INVALID;
//   };

//   //   return (
//   //     <div className="relative w-full max-w-md">
//   //       {/* INPUT */}
//   //       <input
//   //         type="email"
//   //         placeholder="Your email"
//   //         className="
//   //           w-full bg-transparent text-white placeholder-white/60
//   //           outline-none pr-10 pb-3
//   //           border-gradient-primary
//   //         "
//   //       />

//   //       {/* ARROW */}
//   //       <button
//   //         className="
//   //           absolute right-0 bottom-3
//   //           text-white/80 hover:text-white
//   //           transition hover:translate-x-1
//   //         "
//   //       >
//   //         <AppIcon name="IoMdArrowDropright" size={25} className={"text-white cursor-pointer"} />
//   //       </button>
//   //     </div>
//   //   );

//   return (
//     <div className="w-full max-w-md">
//       <div className="relative w-full">
//         <input
//           type="email"
//           placeholder="Your email"
//           value={email}
//           onChange={(e) => {
//             const value = e.target.value;

//             setEmail(value);

//             if (value) {
//               setError(
//                 /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
//                   ? ""
//                   : ENQUIRY_MESSAGES.EMAIL_INVALID
//               );
//             } else {
//               setError("");
//             }
//           }}
//           className={`
//             w-full bg-transparent text-white placeholder-white/60
//             outline-none pr-10 pb-3 border-b transition-all duration-300
//           `}
//         />

//         <button
//           onClick={() => {
//             setError(validateEmail(email));
//           }}
//           className="
//              absolute right-0 bottom-3
//              text-white/80 hover:text-white
//              transition hover:translate-x-1
//            "
//         >
//           <AppIcon
//             name="IoMdArrowDropright"
//             size={25}
//             className="text-white cursor-pointer"
//           />
//         </button>
//       </div>

//       {error && (
//         <span className="text-red-500 text-sm mt-2 block">
//           {error}
//         </span>
//       )}
//     </div>
//   );
// };

// export default Input;
