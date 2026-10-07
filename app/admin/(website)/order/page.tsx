"use client";

import { useEffect, useState } from "react";

import { BaseURL } from "@/app/baseUrl";

import axios from "axios";

import Loading from "@/app/components/Loading";
import DynamicTable from "@/app/components/table/DynamicTable";
import { Column } from "@/@core/types/table.type";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(10);

  const filteredData = data.filter((blog: any) => {
    return (
      blog.postTitle?.toLowerCase().includes(search.toLowerCase()) ||
      blog.slug?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredData.length / blogsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredData, totalPages]);

  const getBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BaseURL}/blog?page=1&limit=5`);

      if (res?.status === 200) {
        const blogsArray = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];

        setData(blogsArray);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  // const deleteBlog = async (id: string) => {
  //   try {
  //     setLoading(true);
  //     const token = localStorage.getItem("token");
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     };
  //     const res = await axios.delete(`${BaseURL}/blog/delete/${id}`, config);

  //     if (res?.status === 200) {
  //       setData((prev: any) => prev.filter((blog: any) => blog._id !== id));
  //       setLoading(false);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     setLoading(false);
  //   }
  // };

  const columns: Column<any>[] = [
    { key: "postTitle", label: "Title", span: "col-span-11" },
    {
      key: "actions",
      label: "Actions",
      span: "col-span-1",
      render: (item: any) => (
        <>
          {/* <button
            onClick={() => router.push(`/admin/blog/${item.slug}`)}
            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full"
          >
            <MdEdit size={20} />
          </button>

          <button
            onClick={() => deleteBlog(item._id)}
            className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full"
          >
            <MdDelete size={20} />
          </button> */}

          {/* <div className="relative">
            <button
              onClick={() =>
                setOpenIndex(openIndex === item._id ? null : item._id)
              }
            >
              <BsThreeDots />
            </button>

            {openIndex === item._id && (
              <div className="absolute right-0 bg-white border shadow-md rounded overflow-hidden z-50">
                <button
                  onClick={() => router.push(`/admin/blog/${item.slug}`)}
                  className="w-full px-3 py-1 text-left hover:bg-[#EFF6FF] cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteBlog(item._id)}
                  className="w-full px-3 py-1 text-left text-red-500 hover:bg-[#EFF6FF] cursor-pointer"
                >
                  Delete
                </button>
              </div>
            )}
          </div> */}
        </>
      ),
    },
  ];

  return (
    <div >
      {loading ? (
        <Loading />
      ) : (
        <DynamicTable
          columns={columns}
          data={filteredData}
          loading={loading}
          emptyMessage="No orders found."
          pagination
          itemsPerPage={10}
          headingText="Orders"
          searchPlaceholder="Search..."
        />
      )}
    </div>
  );
};

export default Page;