"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "@/app/components/Loading";
import DynamicTable from "@/app/components/table/DynamicTable";

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

    const filteredData = data.filter((service: any) => {
        return (
            service.title?.toLowerCase().includes(search.toLowerCase()) ||
            service.slug?.toLowerCase().includes(search.toLowerCase())
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

    const getServices = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${"BaseURL"}/services`);
            console.log(res, "res328423")

            if (res?.status === 200) {
                const servicesArray = Array.isArray(res.data)
                    ? res.data
                    : res.data?.data || [];

                console.log(servicesArray, "servicesArray212")

                const transformedData = servicesArray.map((service: any) => ({
                    ...service,
                    title: service?.metaDetails?.title || "-",
                }));
                console.log(transformedData, "   ")
                setData(transformedData);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        getServices();
    }, [refresh]);

    const columns: any = [
        {
            key: "title",
            label: "Title",
            width: "50%",
            render: (item: any) => item?.metaDetails?.title || "-",
        },
        {
            key: "slug",
            label: "Slug",
            width: "30%",
            render: (item: any) => item?.slug || "-",
        },
    ];
    return (
        <div className="">
            {loading ? (
                <Loading />
            ) : (
                <DynamicTable<any>
                    columns={columns}
                    data={filteredData}
                    loading={loading}
                    emptyMessage="No Service found."
                    pagination
                    itemsPerPage={10}
                    headingText="Service Meta"
                    searchPlaceholder="Search By Title or Slug..."
                    handleClick={() => router.push("/admin/blog/create")}
                    isAction={true}
                    isEdit={true}
                    onEdit={(item:any) => {
                        router.push(`/admin/service-meta/${item.slug}`);
                    }}

                />
            )}
        </div>
    );
};

export default Page;
