// "use client";

// import { useSelector } from "react-redux";
// import { RootState } from "../redux/store";

// const GlobalLoader = () => {
//     const isLoading = useSelector(
//         (state: RootState) => state.loader.isLoading
//     );

//     if (!isLoading) return null;

//     return (
//         <div className="fixed top-[85px] left-0 w-full h-[3px] z-[9999] overflow-hidden">
//             <div className="h-full animate-blog-loader rounded-full bg-gradient-to-r from-[#4F23E7] via-[#0069FF] to-[#00FFC5]" />
//         </div>
//     );
// };

// export default GlobalLoader;