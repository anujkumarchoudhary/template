"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


import axios from "axios";

import Loading from "@/app/components/Loading";
import DynamicTable from "@/app/components/table/DynamicTable";

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
      const res = await axios.get(`${"BaseURL"}/products`);

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

  const deleteProduct = async (id: string) => {
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
    {
      key: "featuredImage",
      label: "Image",
      width: "1fr",
      render: (item:any) => (
        <img
          src={item.featuredImage}
          alt={item.name || "featured image"}
          className="w-8 h-6 object-fill rounded"
        />
      ),
    },
    {
      key: "name",
      label: "Product",
      width: "2fr",
    },
    {
      key: "minimumQuantity",
      label: "Minimum Quantity",
      width: "2fr",
    },
    {
      key: "minimumWords",
      label: "Minimum Words",
      width: "2fr",
    },

    {
      key: "pricePerUnit",
      label: "Price",
      width: "2fr",
      render: (item:any) => `$${item.pricePerUnit}`,
    },
    {
      key: "pricingType",
      label: "Pricing Type",
      width: "2fr",
      render: (item:any) =>
        item.pricingType === "perWord" ? "Per Word" : "Per Unit",
    },

    {
      key: "status",
      label: "Status",
      width: "1.5fr",
      render: (item:any) => (
        <span
          className={`px-2 py-1 text-xs rounded ${
            item.status === "active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {item.status}
        </span>
      ),
    },
  ];

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <DynamicTable<any>
          columns={columns}
          data={filteredData}
          loading={loading}
          emptyMessage="No products found."
          pagination
          itemsPerPage={10}
          headingText="Products"
          searchPlaceholder="Search..."
          isAction
          isEdit
          isDelete
          onEdit={(item:any) => {
            router.push(`/admin/products/${item.slug}`);
          }}
          onDelete={(item:any) => {
            deleteProduct(item._id);
          }}
        />
      )}
    </div>
  );
};

export default Page;