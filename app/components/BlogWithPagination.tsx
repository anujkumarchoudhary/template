// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Blog } from "@/@core/types/blog.types";
// import { transformDate } from "@/@core/hooks/transformDate";
// import Loading from "./Loading";
// import { socket } from "@/@core/lib/socket";
// import { BaseURL, blogImageBaseUrl } from "../baseUrl";
// import Image from "next/image";
// import { IoChevronBack, IoChevronForward } from "react-icons/io5";
// import AppIcon from "./AppIcon";

// import { useDispatch } from "react-redux";
// import { setLoading } from "../redux/slice/loader.slice";
// import { AppDispatch } from "../redux/store";
// import Link from "next/link";
// import Pagination from "./Pagination";

// const categoryMap: Record<string, Set<string>> = {
//   "Digital Marketing": new Set([
//     "seo",
//     "ppc",
//     "aiseo",
//     "local seo",
//     "digital marketing",
//     "smm",
//     "cms",
//   ]),
//   "Web Development": new Set([
//     "web development",
//     "e-commerce",
//   ]),
//   "App Development": new Set([
//     "app development",
//   ]),
//   "UI/UX Design": new Set([
//     "ui/ux design",
//   ]),
// };

// const BlogWithPagination = ({
//   activeCategory,
// }: {
//   activeCategory?: string;
// }) => {
//   const router = useRouter();
//   const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
//   const [loader, setLoader] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [refresh, setRefresh] = useState(false);
//   const dispatch = useDispatch<AppDispatch>();

//   const ITEMS_PER_PAGE = 9;

//   const getBlogs = async () => {
//     try {
//       setLoader(true);

//       const res = await fetch(`${BaseURL}blog`);

//       if (!res.ok) {
//         throw new Error("Failed to fetch blogs");
//       }

//       const response = await res.json();

//       const blogsArray = Array.isArray(response?.data)
//         ? response.data
//         : Array.isArray(response)
//           ? response
//           : [];

//       setAllBlogs(blogsArray);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoader(false);
//     }
//   };

//   useEffect(() => {
//     getBlogs();
//   }, [refresh]);

//   useEffect(() => {
//     socket.on("new_blog", () => {
//       setRefresh((prev) => !prev);
//     });

//     return () => {
//       socket.off("new_blog");
//     };
//   }, []);

//   // Reset page when category changes (IMPORTANT FIX)
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [activeCategory]);

//   const handleBlogClick = (slug: string) => {
//     dispatch(setLoading(true));
//     router.push(`/blog/${slug}`);
//   };

//   // const filteredBlogs = activeCategory
//   //   ? activeCategory === "View All"
//   //     ? allBlogs
//   //     : allBlogs.filter(
//   //       (blog) =>
//   //         blog.category?.name?.toLowerCase() === activeCategory.toLowerCase(),
//   //     )
//   //   : allBlogs;

//   const filteredBlogs = (() => {
//     if (!activeCategory || activeCategory === "View All") {
//       return allBlogs;
//     }

//     const categories = categoryMap[activeCategory];

//     if (!categories) {
//       return [];
//     }

//     return allBlogs.filter((blog) => {
//       const category = blog.category?.name?.trim().toLowerCase() || "";
//       return categories.has(category);
//     });
//   })();

//   const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);

//   const paginatedBlogs = filteredBlogs.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE,
//   );

//   useEffect(() => {
//     if (currentPage > totalPages && totalPages > 0) {
//       setCurrentPage(1);
//     }
//   }, [totalPages, currentPage]);

//   const changePage = (page: number) => {
//     if (page < 1 || page > totalPages) return;

//     setCurrentPage(page);

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="relative">
//       {loader ? (
//         <Loading />
//       ) : (
//         <>
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2rem]">
//             {paginatedBlogs?.map((blog, idx) => {

//               return (
//                 <div
//                   key={idx}
//                   className="relative bg-[#F8F9FA] h-full border-2 border-[#0000001A] rounded-xl overflow-hidden"
//                 >
//                   <div className="relative h-55 md:h-100 blog-card-on-1440-img blog-card-on-1710-img">
//                     <Image
//                       onClick={() => handleBlogClick(blog.slug)}
//                       src={`${blogImageBaseUrl}${blog.featuredImage}`}
//                       fill
//                       alt={blog.slug}
//                       className="cursor-pointer object-fill transition-transform duration-500 ease-in-out hover:scale-110"
//                     />
//                   </div>

//                   <div className="relative p-5 h-48 flex flex-col">
//                     <div className="flex gap-1 items-center text-black my-2">
//                       <p className="text-size-category-on-blog-card">
//                         {blog.category?.name || "CATEGORY"}
//                       </p>
//                       <span className="w-px h-3 bg-black rounded-full mx-1"></span>
//                       <p className="text-size-category-on-blog-card">
//                         {transformDate(blog.createdAt)}
//                       </p>
//                       <span className="w-px h-3 bg-black rounded-full mx-1"></span>
//                       <p className="text-size-category-on-blog-card">
//                         Author: Dheeraj Swami
//                       </p>
//                     </div>

//                     <h3
//                       onClick={() => handleBlogClick(blog.slug)}
//                       className="line-clamp-2 cursor-pointer text-[20px]"
//                     >
//                       {blog?.postTitle}
//                     </h3>

//                     <div className="absolute bottom-5">
//                       <Link
//                         href={`/blog/${blog.slug}`}
//                         className="gap-2 group bg-linear-to-r from-[#4F23E7] via-[#0069FF] to-[#00FFC5] bg-clip-text text-transparent transform transition-transform duration-200 hover:translate-x-1"
//                       >
//                         <div className="flex text-gradient-secondary-lr cursor-pointer items-center gap-1 font-semibold">
//                           Read More
//                           <span className="relative w-3.5 h-3.5 overflow-hidden">
//                             <span className="absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-500 ease-out group-hover:translate-x-5.5 group-hover:text-[#4F23E7]">
//                               <AppIcon
//                                 name="ArrowFillRight"
//                                 size={11}
//                                 className="text-[#4F23E7]"
//                               />
//                             </span>

//                             <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5.5 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:text-[#4F23E7]">
//                               <AppIcon
//                                 name="ArrowFillRight"
//                                 size={11}
//                                 className="text-[#4F23E7]"
//                               />
//                             </span>
//                           </span>
//                         </div>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {filteredBlogs.length > 0 && totalPages > 1 && (
//             <div className="absolute bottom-[-65] w-full">
//               <Pagination
//                 totalPages={totalPages}
//                 onPageChange={changePage}
//                 storageKey="blog-pagination"
//               />
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default BlogWithPagination;

