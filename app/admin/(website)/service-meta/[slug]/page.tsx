// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";

// import axios from "axios";
// import toast from "react-hot-toast";

// import InputField from "@/app/components/UI/InputField";
// import SelectField from "@/app/components/UI/SelectField";
// import ImageUpload from "@/app/components/UI/ImageUpload";
// import SaveAndCancel from "@/app/components/common/SaveAndCancel";
// import QuillEditor from "@/app/components/QuillEditor";

// interface CategoryType {
//     label: string;
//     value: string;
// }

// const UpdateMeta = ({ refresh }: any) => {
//     const [loading, setLoading] = useState(false);
//     const [service, setService] = useState<any>(null);
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);

//     const router = useRouter();
//     const params = useParams();

//     const slug = params?.slug as string;
//     const isEditMode = slug !== "create";

//     const [inputVal, setInputVal] = useState({
//         title: "",
//         description: "",
//         keywords: "",
//         index: true,
//         follow: true,
//     });

//     /* =============================
//        Handle Fields
//     ============================= */

//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//     ) => {
//         const { name, value } = e.target;

//         setInputVal((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     /* =============================
//        Image Upload
//     ============================= */

//     const handleImageUpload = (file: File) => {
//         setSelectedFile(file);
//     };

//     /* =============================
//        Fetch Service Meta
//     ============================= */

//     const getServiceMeta = async () => {
//         try {
//             setLoading(true);

//             const res = await axios.get(`${"BaseURL"}services/${slug}`);

//             if (res.status === 200) {
//                 const serviceData = res?.data?.data;

//                 setService(serviceData);

//                 const meta = serviceData?.metaDetails || {};

//                 setInputVal({
//                     title: meta?.title || "",
//                     description: meta?.description || "",
//                     keywords: meta?.keywords || "",
//                     index: meta?.robots?.index ?? true,
//                     follow: meta?.robots?.follow ?? true,
//                 });
//             }
//         } catch (err) {
//             console.log(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     /* =============================
//        Update Service Meta
//     ============================= */

//     const handleSubmit = async () => {
//         if (
//             !inputVal.title.trim() ||
//             !inputVal.description.trim() ||
//             !inputVal.keywords.trim()
//         ) {
//             toast.error("Title, description and keywords are required");
//             return;
//         }

//         try {
//             setLoading(true);

//             const formData = new FormData();

//             formData.append("title", inputVal.title);
//             formData.append("description", inputVal.description);
//             formData.append("keywords", inputVal.keywords);

//             formData.append(
//                 "robots",
//                 JSON.stringify({
//                     index: inputVal.index,
//                     follow: inputVal.follow,
//                 })
//             );

//             if (selectedFile) {
//                 formData.append("image", selectedFile);
//             }

//             const token = localStorage.getItem("token");

//             await axios.patch(
//                 `${"BaseURL"}services/${slug}/meta`,
//                 formData,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         "Content-Type": "multipart/form-data",
//                     },
//                 }
//             );

//             toast.success("Meta details updated successfully");

//             refresh?.();

//             router.push("/admin/service-meta");
//         } catch (err: any) {
//             console.log(err);

//             toast.error(
//                 err?.response?.data?.message ||
//                 "Something went wrong"
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (isEditMode) {
//             getServiceMeta();
//         }
//     }, [slug]);

//     return (
//         <div className="p-10 m-5 space-y-6 bg-white rounded-lg shadow">
//             <h3>
//                 {isEditMode ? "Update" : "Create"} Service Meta
//             </h3>

//             {/* =============================
//                 Service Information
//             ============================= */}

//             <div className="grid grid-cols-2 gap-6">
//                 <InputField
//                     label="Meta Title"
//                     name="title"
//                     placeholder="Enter Meta Title"
//                     value={inputVal.title}
//                     handleChange={handleChange}
//                     required
//                 />

//                 <InputField
//                     label="Keywords"
//                     name="keywords"
//                     placeholder="Enter Keywords"
//                     value={inputVal.keywords}
//                     handleChange={handleChange}
//                     required
//                 />
//             </div>

//             {/* =============================
//                 Description
//             ============================= */}

//             <InputField
//                 label="Meta Description"
//                 name="description"
//                 placeholder="Enter Meta Description"
//                 value={inputVal.description}
//                 handleChange={handleChange}
//                 required
//             />
//             {/* =============================
//                 Robots
//             ============================= */}

//             <div className="space-y-3">
//                 <p className="font-semibold">Robots</p>

//                 <div className="flex gap-6">
//                     <label className="flex items-center gap-2">
//                         <input
//                             type="checkbox"
//                             checked={inputVal.index}
//                             onChange={(e) =>
//                                 setInputVal((prev) => ({
//                                     ...prev,
//                                     index: e.target.checked,
//                                 }))
//                             }
//                         />
//                         Index
//                     </label>

//                     <label className="flex items-center gap-2">
//                         <input
//                             type="checkbox"
//                             checked={inputVal.follow}
//                             onChange={(e) =>
//                                 setInputVal((prev) => ({
//                                     ...prev,
//                                     follow: e.target.checked,
//                                 }))
//                             }
//                         />
//                         Follow
//                     </label>
//                 </div>
//             </div>

//             {/* =============================
//                 Meta Image
//             ============================= */}

//             <ImageUpload
//                 existingImage={service?.metaDetails?.image}
//                 onUpload={handleImageUpload}
//             />

//             {/* =============================
//                 Buttons
//             ============================= */}

//             <div className="flex justify-end gap-2">
//                 <SaveAndCancel
//                     isBgWhite
//                     isBorder
//                     name="Cancel"
//                     handleClick={() =>
//                         router.push("/admin/service-meta")
//                     }
//                 />

//                 <SaveAndCancel
//                     isPlus
//                     handleClick={handleSubmit}
//                     name={"Update"}
//                 />
//             </div>
//         </div>
//     );
// };

// export default UpdateMeta;


import React from 'react'

const page = () => {
  return (
    <div>
      
    </div>
  )
}

export default page
