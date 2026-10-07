"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
// import { transformDate } from "@/@core/hooks/transformDate";


import axios from "axios";

import Loading from "@/app/components/Loading";
import DynamicTable from "@/app/components/table/DynamicTable";
// import { Column, IBlogColumn } from "@/@core/types/table.type";

const Page = () => {
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(10);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

  const getBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${"BaseURL"}/blog`);

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
  }, [refresh]);


  const deleteBlog = async (id: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await axios.delete(`${"BaseURL"}/blog/delete/${id}`, config);

      if (res?.status === 200) {
        setData((prev: any) => prev.filter((blog: any) => blog._id !== id));
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const columns: any = [
    { key: "postTitle", label: "Title", width: "55%" },
    {
      key: "category",
      label: "Category",
      render: (item:any) => item?.category?.name || "-",
      width: "20%",
    },
    {
      key: "createdAt",
      label: "Date",
      // render: (item:any) => transformDate(item?.createdAt) || "-",
    },
  ];

  return (
    <div className="">
      {loading ? (
        <Loading />
      ) : (
        <DynamicTable<any>
          isAdd={true}
          columns={columns}
          data={filteredData}
          loading={loading}
          emptyMessage="No blogs found."
          pagination
          itemsPerPage={10}
          headingText="Blogs"
          searchPlaceholder="Search By Title or Slug..."
          handleClick={() => router.push("/admin/blog/create")}
          isAction
          isEdit
          isDelete
          onEdit={(item:any) => {
            router.push(`/admin/blog/${item.slug}`);
          }}
          onDelete={(item:any) => {
            deleteBlog(item._id);
          }}
        />
      )}
    </div>
  );
};

export default Page;
