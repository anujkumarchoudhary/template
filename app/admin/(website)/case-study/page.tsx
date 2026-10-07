"use client";
import { BaseURL } from "@/app/baseUrl";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";
import { BsThreeDots } from "react-icons/bs";

import DynamicTable from "@/app/components/table/DynamicTable";
import { Column } from "@/@core/types/table.type";

const Page = () => {
  const router = useRouter();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const filteredData = data.filter((item: any) => {
    return (
      item.postTitle?.toLowerCase().includes(search.toLowerCase()) ||
      item.slug?.toLowerCase().includes(search.toLowerCase())
    );
  });

  // ✅ Fetch Data
  const getCaseStudies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BaseURL}/blog`);

      if (res?.status === 200) {
        const arr = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];

        setData(arr);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCaseStudies();
  }, []);


    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const deleteCaseStudy = async (id: string) => {
    try {
      setLoading(true);
      const res = await axios.delete(`${BaseURL}/blog/delete/${id}`);

      if (res?.status === 200) {
        setData((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const columns: Column<any>[] = [
    {
      key: "postTitle",
      label: "Title",
      span: "col-span-11",
    },
    {
      key: "actions",
      label: "Actions",
      span: "col-span-1",
      render: (item) => (
        <div className="relative">
          <button
            aria-label={`Open actions for ${item.postTitle}`}
            onClick={() =>
              setOpenIndex(openIndex === item._id ? null : item._id)
            }
          >
            <BsThreeDots />
          </button>

          {openIndex === item._id && (
            <div
              className="absolute right-0 bg-white border shadow-md rounded overflow-hidden z-50"
              ref={dropdownRef}
            >
              <button
                aria-label={`Edit ${item.postTitle}`}
                onClick={() => router.push(`/admin/blog/${item.slug}`)}
                className="w-full px-3 py-1 text-left hover:bg-[#EFF6FF] cursor-pointer"
              >
                Edit
              </button>
              <span className="block w-full h-[1px] bg-black"></span>
              <button
                aria-label={`Delete ${item.postTitle}`}
                onClick={() => deleteCaseStudy(item._id)}
                className="w-full px-3 py-1 text-left text-red-500 hover:bg-[#EFF6FF] cursor-pointer"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      {loading ? (
        <Loading />
      ) : filteredData.length === 0 ? (
        <div className="pt-36 text-center">
          {search
            ? "No blogs found matching your search."
            : 'No blogs found. Click "Create Blog" to add one.'}
        </div>
      ) : (
        <DynamicTable
          columns={columns}
          data={filteredData}
          loading={loading}
          emptyMessage="No case studies found."
          pagination
          itemsPerPage={10}
          headingText="Case Study"
          searchPlaceholder="Search By Title or Slug..."
          handleClick={() => router.push("/admin/blog/create")}
        />
      )}
    </div>
  );
};

export default Page;




// "use client"
// import { BaseURL } from '@/app/baseUrl';
// import Heading from '@/app/components/common/Heading';
// import { useEffect, useState } from 'react'
// import axios from "axios";
// import SaveAndCancel from '@/app/components/common/SaveAndCancel';
// import { useRouter } from 'next/navigation';
// import { MdEdit } from "react-icons/md";
// import { MdDelete } from "react-icons/md";
// import Loading from '@/app/components/Loading';

// import { IoIosArrowForward } from "react-icons/io";
// import { IoIosArrowBack } from "react-icons/io";

// const Page = () => {
//   const router = useRouter()
//   const [data, setData] = useState([])
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [blogsPerPage, setBlogsPerPage] = useState(10);

//   const indexOfLastBlog = currentPage * blogsPerPage;
//   const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

//   const filteredData = data.filter((blog: any) => {
//     return (
//       blog.postTitle?.toLowerCase().includes(search.toLowerCase()) ||
//       blog.slug?.toLowerCase().includes(search.toLowerCase())
//     );
//   });

//   const currentBlogs = filteredData?.slice(indexOfFirstBlog, indexOfLastBlog);
//   const totalPages = Math.ceil(filteredData.length / blogsPerPage);

//   useEffect(() => {
//     if (currentPage > totalPages) {
//       setCurrentPage(1);
//     }
//   }, [filteredData, totalPages]);

//   const getBlogs = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${BaseURL}blog`)

//       if (res?.status === 200) {
//         const blogsArray = Array.isArray(res.data)
//           ? res.data
//           : res.data?.data || [];

//         setData(blogsArray);
//         setLoading(false);
//       }
//     }
//     catch (err) {
//       setLoading(false);
//     }

//   }

//   useEffect(() => {
//     getBlogs()
//   }, [])

//   const deleteBlog = async (id: string) => {
//     try {
//       setLoading(true)
//       const res = await axios.delete(`${BaseURL}/blog/delete/${id}`)

//       if (res?.status === 200) {
//         setData((prev: any) => prev.filter((blog: any) => blog._id !== id))
//         setLoading(false)
//       }
//     } catch (err) {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="px-6 pb-6">
//       <Heading
//         headingParts={[{ text: 'Case Study', color: "#000000", weight: 700 }]}
//         subTitle={'Case Study'}
//       />

//       <div className="flex justify-between items-center mb-6">
//         <div className="rounded-full w-1/4 border flex items-center">
//           <input
//             type="text"
//             placeholder="Search By Title or Slug..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="w-full outline-none p-4 rounded-full text-sm"
//           />
//         </div>

//         <SaveAndCancel
//           name={"Create Case Study"}
//           isIcon={true}
//           handleClick={() => router.push("/admin/blog/create")}
//         />
//       </div>

//       {loading ? (
//         <Loading />
//       ) : filteredData.length === 0 ? (
//         <div className="pt-36 text-center">
//           {search
//             ? "No blogs found matching your search."
//             : 'No blogs found. Click "Create Blog" to add one.'}
//         </div>
//       ) : (
//         <div className="bg-white rounded-2xl shadow-md overflow-hidden">
//           <div className="grid grid-cols-12 bg-blue-900 p-4 font-semibold text-white text-sm uppercase">
//             <div className="col-span-11">Title</div>
//             <div className="col-span-1 text-center">Actions</div>
//           </div>

//           {currentBlogs.map((blog: any) => (
//             <div
//               key={blog._id}
//               className="grid grid-cols-12 items-center px-4 py-3 border-t hover:bg-blue-50 transition duration-200"
//             >
//               <div className="col-span-11 font-medium text-gray-800 truncate">
//                 {blog?.postTitle}
//               </div>

//               <div className="col-span-1 flex justify-center gap-3">

//                 <button
//                   onClick={() => router.push(`/admin/blog/${blog.slug}`)}
//                   className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full cursor-pointer transition active:scale-90"
//                 >
//                   <MdEdit size={20} />
//                 </button>

//                 <button
//                   onClick={() => deleteBlog(blog._id)}
//                   className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full cursor-pointer transition active:scale-90"
//                 >
//                   <MdDelete size={20} />
//                 </button>
//               </div>
//             </div>
//           ))}

//           {/* Pagination */}
//           {/* {filteredData.length > blogsPerPage && (
//             <div className="flex justify-between items-center px-6 py-4 border-t bg-blue-50">
//               <div className="flex items-center gap-4">
//                 <p className="">
//                   Showing {indexOfFirstBlog + 1} -{" "}
//                   {Math.min(indexOfLastBlog, filteredData.length)} of {filteredData.length} blogs
//                 </p>

//                 <select
//                   value={blogsPerPage}
//                   onChange={(e) => {
//                     setBlogsPerPage(Number(e.target.value));
//                     setCurrentPage(1);
//                   }}
//                   className="border border-gray-600 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-900"
//                 >
//                   <option value={10}>10</option>
//                   <option value={25}>25</option>
//                   <option value={50}>50</option>
//                 </select>
//               </div>

//               <div className="flex gap-4">
//                 <button
//                   onClick={() => setCurrentPage((prev) => prev - 1)}
//                   disabled={currentPage === 1}
//                   className={`p-3 rounded-lg text-xs font-semibold transition active:scale-90 ${currentPage === 1
//                     ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                     : "bg-blue-900 text-white hover:bg-[#FB9100] cursor-pointer"
//                     }`}
//                 >
//                   <IoIosArrowBack size={14} />
//                 </button>

//                 <button
//                   onClick={() => setCurrentPage((prev) => prev + 1)}
//                   disabled={currentPage === totalPages}
//                   className={`p-3 rounded-lg text-xs font-semibold transition active:scale-90 ${currentPage === totalPages
//                     ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                     : "bg-blue-900 text-white hover:bg-[#FB9100] cursor-pointer"
//                     }`}
//                 >
//                   <IoIosArrowForward size={14} />
//                 </button>
//               </div>
//             </div>
//           )
//           } */}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Page;
