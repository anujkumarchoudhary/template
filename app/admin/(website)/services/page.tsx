"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";

import DynamicTable from "@/app/components/table/DynamicTable";
// import { Column } from "@/@core/types/table.type";
import { BsThreeDots } from "react-icons/bs";

const Page = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(10);
  const [openIndex, setOpenIndex] = useState(null);
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
      const res = await axios.get(`${"BaseURL"}/services`);

      if (res?.status === 200) {
        const servicesArray = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];

        setData(servicesArray);
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

  const deleteService = async (id: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // or wherever you store it
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await axios.delete(
        `${"BaseURL"}/services/delete/${id}`,
        config,
      );

      if (res?.status === 200) {
        setData((prev: any) =>
          prev.filter((service: any) => service._id !== id),
        );
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const columns: any = [
    {
      key: "postTitle",
      label: "Title",
      span: "col-span-11",
      render: (item:any) =>
        item?.banner?.headingParts?.map((part: any) => part.text).join(" ") ||
        "N/A",
    },
    // {
    //   key: "description",
    //   label: "Description",
    //   span: "col-span-11",
    //   render: (item) => item?.banner?.description || "N/A",
    // },
    {
      key: "actions",
      label: "Actions",
      span: "col-span-1",
      render: (item:any) => (
        <>
          <div className="relative">
            <button
            aria-label={`Actions for ${item?.postTitle || "service"}`}
              onClick={() =>
                setOpenIndex(openIndex === item._id ? null : item._id)
              }
            >
              <BsThreeDots />
            </button>

            {openIndex === item._id && (
              <div className="absolute right-0 bg-white border shadow-md rounded overflow-hidden z-50" ref={dropdownRef}>
                <button
                  aria-label={`Edit ${item?.postTitle || "service"}`}
                  onClick={() => router.push(`/admin/blog/${item.slug}`)}
                  className="w-full px-3 py-1 text-left hover:bg-[#EFF6FF] cursor-pointer"
                >
                  Edit
                </button>
                <span className="block w-full h-[1px] bg-black"></span>
                <button
                  aria-label={`Delete ${item?.postTitle || "service"}`}
                  onClick={() => deleteService(item._id)}
                  className="w-full px-3 py-1 text-left text-red-500 hover:bg-[#EFF6FF] cursor-pointer"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="">
      {loading ? (
        <Loading />
      ) : (
        <DynamicTable
          columns={columns}
          data={filteredData}
          loading={loading}
          emptyMessage="No blogs found."
          pagination
          itemsPerPage={10}
          headingText="Services"
          searchPlaceholder="Search By Title or Slug..."
          handleClick={() => router.push("/admin/services/create")}
        />
      )}
    </div>
  );
};

export default Page;
