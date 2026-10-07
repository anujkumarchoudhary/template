"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import axios from "axios";
import { BaseURL } from "@/app/baseUrl";
import toast from "react-hot-toast";
import { socket } from "@/@core/lib/socket";

import InputField from "@/app/components/UI/InputField";
import SelectField from "@/app/components/UI/SelectField";
import ImageUpload from "@/app/components/UI/ImageUpload";
import SaveAndCancel from "@/app/components/common/SaveAndCancel";
import QuillEditor from "@/app/components/QuillEditor";

interface CategoryType {
  label: string;
  value: string;
}

const CreateBlog = ({ refresh }: any) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const blogId = params?.slug;
  const isEditMode = blogId !== "create";
  const [categoryOptions, setCategoryOptions] = useState<CategoryType[]>([]);
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [blog, setBlog] = useState<any>(null);
  const [inputVal, setInputVal] = useState({
    postTitle: "",
    slug: "",
    category: "",
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      focusKeyword: "",
    },
  });

  /* =============================
     Handle Normal + Nested Fields
  ============================== */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("seo.")) {
      const key = name.split(".")[1];

      setInputVal((prev) => ({
        ...prev,
        seo: {
          ...prev.seo,
          [key]: value,
        },
      }));
    } else {
      setInputVal((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  /* =============================
     Auto Slug Generate
  ============================== */
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputVal((prev) => ({
      ...prev,
      postTitle: value,
      slug: generateSlug(value),
    }));
  };

  /* =============================
     Image Upload
  ============================== */
  const handleImageUpload = (file: File) => {
    setSelectedFile(file);
  };

  /* =============================
     Submit Blog
  ============================== */
  const handleSubmit = async () => {
    const { postTitle, slug, category, seo } = inputVal;

    const token = localStorage.getItem("token"); // or wherever you store it
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    // ✅ Required validation
    if (
      !postTitle.trim() ||
      !slug.trim() ||
      !category ||
      !content.trim() ||
      !seo.metaTitle.trim() ||
      !seo.metaDescription.trim() ||
      !seo.keywords.trim() ||
      !seo.focusKeyword.trim()
    ) {
      toast.error("All fields are required");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("postTitle", inputVal.postTitle);
      formData.append("slug", inputVal.slug);
      formData.append("category", inputVal?.category);
      formData.append("postDescription", content);
      formData.append("seo", JSON.stringify(inputVal.seo));

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      if (isEditMode) {
        await axios.patch(`${BaseURL}blog/update/${blogId}`, formData, config);
        toast.success("Blog updated successfully");
        setLoading(false);
        router.push("/admin/blog");
      } else {
        await axios.post(`${BaseURL}blog`, formData, config);
        toast.success("Blog created successfully");
        setLoading(false);
        router.push("/admin/blog");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
      socket.emit("new_blog");
      refresh();
    }
  };
  /* =============================
     Fetch Categories
  ============================== */
  const getCategories = async () => {
    try {
      const res = await axios.get(`${BaseURL}category`);

      if (res.status === 200) {
        const formatted = res.data?.data?.map((item: any) => ({
          label: item?.name,
          value: item?._id,
        }));

        setCategoryOptions(formatted);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleBlog = async () => {
    try {
      const res = await axios.get(`${BaseURL}blog/${blogId}`);

      if (res.status === 200) {
        const blogData = res?.data?.data;
        setBlog(blogData);
        setInputVal({
          postTitle: blogData.postTitle,
          slug: blogData.slug,
          category: blogData.category,
          seo: blogData.seo || {
            metaTitle: "",
            metaDescription: "",
            keywords: "",
            focusKeyword: "",
          },
        });

        setContent(blogData.postDescription);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategories();
    if (isEditMode) {
      getSingleBlog();
    }
  }, []);

  return (
    <div className="p-10 m-5 space-y-6 bg-white rounded-lg shadow ">
      <h3>{isEditMode ? "Update" : "Create"} Blog</h3>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3 space-y-4">
          <InputField
            label="Title"
            name="postTitle"
            placeholder="Enter Heading"
            value={inputVal.postTitle}
            handleChange={handleTitleChange}
            required={true}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Slug"
              name="slug"
              placeholder="Enter Slug"
              value={inputVal.slug}
              handleChange={handleChange}
              required={true}
            />

            <SelectField
              label="Category"
              name="category"
              value={inputVal.category}
              handleChange={handleChange}
              options={categoryOptions}
              required={true}
            />
          </div>
        </div>

        {/* <ImageUpload onUpload={handleImageUpload} /> */}
        <ImageUpload
          existingImage={blog?.featuredImage ?? blog?.seo?.openGraph?.image}
          onUpload={handleImageUpload}
        />
      </div>

      {/* <Editor content={content} setContent={setContent} /> */}
      <QuillEditor value={content} onChange={setContent} />
      {/* =============================
          SEO Section
      ============================== */}
      <div className="space-y-4">
        <p className="font-semibold">Meta Tags</p>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="SEO Title"
            name="seo.metaTitle"
            placeholder="Enter SEO Title"
            value={inputVal.seo.metaTitle}
            handleChange={handleChange}
            required={true}
          />

          <InputField
            label="Keyword"
            name="seo.keywords"
            placeholder="Enter Keywords"
            value={inputVal.seo.keywords}
            handleChange={handleChange}
            required={true}
          />
        </div>

        <InputField
          label="Focus Keyword"
          name="seo.focusKeyword"
          placeholder="Enter Focus Keyword"
          value={inputVal.seo.focusKeyword}
          handleChange={handleChange}
          required={true}
        />

        <InputField
          label="Description"
          name="seo.metaDescription"
          placeholder="Enter Description"
          value={inputVal.seo.metaDescription}
          handleChange={handleChange}
          required={true}
        />
      </div>

      <div className="flex justify-end gap-2">
        <SaveAndCancel
          // handleClick={handleSubmit}
          isBgWhite={true}
          isBorder={true}
          name={"Draft"}
        />
        <SaveAndCancel
          isPlus={true}
          handleClick={handleSubmit}
          name={isEditMode ? "Update" : "Add"}
        />
      </div>
    </div>
  );
};

export default CreateBlog;