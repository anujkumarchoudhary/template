"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { BaseURL } from "@/app/baseUrl";

import axios from "axios";

import Loading from "@/app/components/Loading";
import DynamicTable from "@/app/components/table/DynamicTable";
import { Column, IEnquiryColumn } from "@/@core/types/table.type";

const Page = () => {
  const router = useRouter();
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
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.get(`${BaseURL}/enquiry`, config);
      console.log("🚀 ~ file: page.tsx:50 ~ getBlogs ~ res:", res);
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
      const res = await axios.delete(`${BaseURL}/blog/delete/${id}`, config);

      if (res?.status === 200) {
        setData((prev: any) => prev.filter((blog: any) => blog._id !== id));
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const columns: Column<any>[] = [
    { key: "name", label: "Name", width: "3fr" },
    { key: "email", label: "Email", width: "2fr" },
    { key: "phone", label: "Phone", width: "2fr" },
    {
      key: "website",
      label: "Website",
      width: "2fr",
    },
    {
      key: "services",
      label: "Service",
      width: "3fr",
      render: (item) =>
        item?.services?.length
          ? item.services.map((s: any) => s.name).join(", ")
          : "-",
    },
  ];
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <DynamicTable<IEnquiryColumn>
          columns={columns}
          data={data}
          loading={loading}
          emptyMessage="No orders found."
          pagination
          isAction
          isEdit
          isDelete
          onEdit={(row) => router.push(`/enquiry/edit/${row._id}`)}
          onDelete={(row) => deleteBlog(row._id)}
          itemsPerPage={10}
          headingText="Enquiries"
          searchPlaceholder="Search..."
        />
      )}
    </div>
  );
};

export default Page;