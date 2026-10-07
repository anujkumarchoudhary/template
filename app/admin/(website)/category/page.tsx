"use client";

import { useEffect, useState, useMemo, useRef } from "react";

import { BaseURL } from "@/app/baseUrl";

import axios from "axios";
import toast from "react-hot-toast";

import QuillEditor from "@/app/components/QuillEditor";
import DynamicTable from "@/app/components/table/DynamicTable";
import { Category, Column } from "@/@core/types/table.type";

const Page = () => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BaseURL}/category`);
      setData(res?.data?.data || []);
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createCategory = async () => {
    if (!formData.name.trim()) {
      return toast.error("Category name required");
    }
    try {
      const res = await axios.post(`${BaseURL}/category`, formData);
      if (res?.data?.success) {
        toast.success("Category created");
        setOpenModal(false);
        setFormData({
          name: "",
          description: "",
        });
        getCategories();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const res = await axios.delete(`${BaseURL}/category/delete/${id}`);
      if (res?.data?.success) {
        toast.success("Category deleted");
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  const columns: Column<Category>[] = [
    { key: "name", label: "Category" },
    { key: "description", label: "Description" },
  ];

  return (
    <div>
      <DynamicTable
        columns={columns}
        data={filteredData}
        loading={loading}
        emptyMessage="No categories found."
        pagination
        itemsPerPage={10}
        headingText="Category"
        searchPlaceholder="Search Category..."
        handleClick={() => setOpenModal(!openModal)}
        isAction
        isEdit
        isDelete
        onEdit={(item) => {
          setOpenModal(true);
        }}
        onDelete={(item) => {
          deleteCategory(item._id);
        }}
      />

      {/* OVERLAY */}
      {openModal && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpenModal(false)}
        />
      )}

      {/* RIGHT DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-105 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          openModal ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative h-full">
          <h4 className="text-xl font-semibold bg-primary text-white p-4 rounded-t-[20px]">
            Create Category
          </h4>
          <div className="flex flex-col gap-4 p-4 rounded-b-[20px]">
            <p className="font-semibold text-[16px]">Name</p>
            <input
              type="text"
              name="name"
              placeholder="Category Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-3 rounded-md outline-none"
            />

            <p className="font-semibold text-[16px]">Description</p>
            <QuillEditor
              value={formData.description}
              onChange={(val: string) =>
                setFormData({ ...formData, description: val })
              }
            />
          </div>

          <div className="flex justify-center gap-3 absolute bottom-[2rem] w-full">
            <button
              aria-label="Cancel"
              onClick={() => setOpenModal(false)}
              className="px-4 py-2 border rounded-md cursor-pointer hover:border-red-600 hover:text-red-600"
            >
              Cancel
            </button>

            <button
              aria-label="Create category"
              onClick={createCategory}
              className="px-4 py-2 bg-blue-900 text-white rounded-md cursor-pointer hover:bg-[#FB9100]"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;