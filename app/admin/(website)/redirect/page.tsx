"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { GoArrowSwitch } from "react-icons/go";
import {
    FiPlus,
    FiSearch,
    FiEdit2,
    FiTrash2,
} from "react-icons/fi";

import { BaseURL } from "@/app/baseUrl";

interface BlogRedirectItem {
    _id: string;
    postTitle: string;
    slug: string;

    redirect?: {
        enabled: boolean;
        from: string;
        url: string;
        statusCode: 301 | 302;
    };

    createdAt?: string;
    updatedAt?: string;
}

interface RedirectForm {
    from: string;
    to: string;
}

const Page = () => {
    const [showForm, setShowForm] = useState(false);

    const [blogs, setBlogs] = useState<BlogRedirectItem[]>([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const [search, setSearch] = useState("");

    const [editingId, setEditingId] = useState<string | null>(null);

    const [form, setForm] = useState<RedirectForm>({
        from: "",
        to: "",
    });

    // =========================================================
    // NORMALIZE SLUG
    // =========================================================

    const normalizeSlug = (value: string) => {
        if (!value) return "";

        return value
            .trim()
            .replace(/^https?:\/\/[^/]+/i, "")
            .replace(/^\/?blog\/?/i, "")
            .replace(/^\/+|\/+$/g, "");
    };

    // =========================================================
    // GET BLOGS
    // =========================================================

    const fetchBlogs = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                `${BaseURL}blog/redirected`
            );

console.log(response,"response13123")
            setBlogs(response.data?.data || []);
        } catch (error: any) {
            console.error("Fetch blogs error:", error);

            alert(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to fetch blogs"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    // =========================================================
    // FORM CHANGE
    // =========================================================

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =========================================================
    // CREATE / UPDATE REDIRECT
    // =========================================================

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        const oldSlug = normalizeSlug(form.from);
        const newSlug = normalizeSlug(form.to);

        // -----------------------------------------------------
        // VALIDATION
        // -----------------------------------------------------

        if (!oldSlug) {
            alert("Old blog slug is required.");
            return;
        }

        if (!newSlug) {
            alert("New blog slug is required.");
            return;
        }

        if (
            oldSlug.toLowerCase() ===
            newSlug.toLowerCase()
        ) {
            alert(
                "Old blog slug and New blog slug cannot be the same."
            );
            return;
        }

        // -----------------------------------------------------
        // FIND NEW BLOG
        // -----------------------------------------------------

        const newBlog = blogs.find(
            (blog) =>
                normalizeSlug(blog.slug).toLowerCase() ===
                newSlug.toLowerCase()
        );

        if (!newBlog) {
            alert(
                `New blog with slug "${newSlug}" was not found.`
            );
            return;
        }

        try {
            setSaving(true);

            // -------------------------------------------------
            // UPDATE REDIRECT
            //
            // PATCH /blog/update-redirect/:newSlug
            // -------------------------------------------------

            const response = await axios.patch(
                `${BaseURL}blog/redirect/${encodeURIComponent(
                    newSlug
                )}`,
                {
                    enabled: true,
                    from: `/${oldSlug}`,
                    url: `/${newSlug}`,
                    statusCode: 301,
                }
            );

            alert(
                response.data?.message ||
                "Redirect updated successfully"
            );

            // -------------------------------------------------
            // RESET FORM
            // -------------------------------------------------

            setForm({
                from: "",
                to: "",
            });

            setEditingId(null);
            setShowForm(false);

            // -------------------------------------------------
            // REFRESH BLOGS
            // -------------------------------------------------

            await fetchBlogs();
        } catch (error: any) {
            console.error(
                "Save redirect error:",
                error
            );

            alert(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update redirect"
            );
        } finally {
            setSaving(false);
        }
    };

    // =========================================================
    // EDIT
    // =========================================================

    const handleEdit = (
        item: BlogRedirectItem
    ) => {
        const oldSlug = normalizeSlug(
            item.redirect?.from || ""
        );

        const newSlug = normalizeSlug(
            item.slug
        );

        setForm({
            from: oldSlug,
            to: newSlug,
        });

        setEditingId(item._id);
        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // =========================================================
    // REMOVE REDIRECT
    // =========================================================

    const handleDelete = async (
        item: BlogRedirectItem
    ) => {
        const confirmed = window.confirm(
            "Are you sure you want to remove this redirect?"
        );

        if (!confirmed) return;

        try {
            setDeletingId(item._id);

            // -------------------------------------------------
            // DISABLE REDIRECT
            //
            // PATCH /blog/update-redirect/:slug
            // -------------------------------------------------

            const response = await axios.patch(
                `${BaseURL}blog/redirect/${encodeURIComponent(
                    item.slug
                )}`,
                {
                    enabled: false,
                }
            );

            // -------------------------------------------------
            // UPDATE LOCAL STATE
            // -------------------------------------------------

            setBlogs((prev) =>
                prev.map((blog) =>
                    blog._id === item._id
                        ? {
                            ...blog,
                            redirect: undefined,
                        }
                        : blog
                )
            );

            alert(
                response.data?.message ||
                "Redirect removed successfully"
            );
        } catch (error: any) {
            console.error(
                "Remove redirect error:",
                error
            );

            alert(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to remove redirect"
            );
        } finally {
            setDeletingId(null);
        }
    };

    // =========================================================
    // TOGGLE STATUS
    // =========================================================

    const toggleStatus = async (
        item: BlogRedirectItem
    ) => {
        const currentEnabled =
            item.redirect?.enabled ?? false;

        const newEnabled = !currentEnabled;

        // -----------------------------------------------------
        // ENABLE VALIDATION
        // -----------------------------------------------------

        if (
            newEnabled &&
            !item.redirect?.from
        ) {
            alert(
                "Please add a redirect first."
            );
            return;
        }

        try {
            setUpdatingId(item._id);

            const payload = newEnabled
                ? {
                    enabled: true,
                    from:
                        item.redirect?.from ||
                        `/${item.slug}`,
                    url:
                        item.redirect?.url ||
                        `/${item.slug}`,
                    statusCode:
                        item.redirect?.statusCode ||
                        301,
                }
                : {
                    enabled: false,
                };

            // -------------------------------------------------
            // PATCH REDIRECT
            // -------------------------------------------------

            const response = await axios.patch(
                `${BaseURL}blog/update-redirect/${encodeURIComponent(
                    item.slug
                )}`,
                payload
            );

            // -------------------------------------------------
            // UPDATE LOCAL STATE
            // -------------------------------------------------

            if (!newEnabled) {
                setBlogs((prev) =>
                    prev.map((blog) =>
                        blog._id === item._id
                            ? {
                                ...blog,
                                redirect: undefined,
                            }
                            : blog
                    )
                );
            } else {
                setBlogs((prev) =>
                    prev.map((blog) =>
                        blog._id === item._id
                            ? {
                                ...blog,
                                redirect: {
                                    enabled: true,
                                    from:
                                        item.redirect
                                            ?.from ||
                                        `/${item.slug}`,
                                    url:
                                        item.redirect
                                            ?.url ||
                                        `/${item.slug}`,
                                    statusCode:
                                        item.redirect
                                            ?.statusCode ||
                                        301,
                                },
                            }
                            : blog
                    )
                );
            }

            console.log(
                "Redirect status updated:",
                response.data
            );
        } catch (error: any) {
            console.error(
                "Toggle status error:",
                error
            );

            alert(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update status"
            );
        } finally {
            setUpdatingId(null);
        }
    };

    // =========================================================
    // CANCEL FORM
    // =========================================================

    const handleCancel = () => {
        setShowForm(false);
        setEditingId(null);

        setForm({
            from: "",
            to: "",
        });
    };

    // =========================================================
    // ADD REDIRECT
    // =========================================================

    const handleAddRedirect = () => {
        setEditingId(null);

        setForm({
            from: "",
            to: "",
        });

        setShowForm(true);
    };

    // =========================================================
    // ACTIVE REDIRECTS
    // =========================================================

    const filteredRedirects = useMemo(() => {
        return blogs
            .filter(
                (item) =>
                    item.redirect?.enabled &&
                    item.redirect?.from &&
                    item.redirect?.url
            )
            .filter((item) => {
                const searchValue =
                    search.toLowerCase();

                const oldUrl =
                    item.redirect?.from || "";

                const newUrl =
                    item.redirect?.url || "";

                return (
                    item.postTitle
                        ?.toLowerCase()
                        .includes(searchValue) ||
                    item.slug
                        ?.toLowerCase()
                        .includes(searchValue) ||
                    oldUrl
                        .toLowerCase()
                        .includes(searchValue) ||
                    newUrl
                        .toLowerCase()
                        .includes(searchValue)
                );
            });
    }, [blogs, search]);

    // =========================================================
    // UI
    // =========================================================

    return (
        <div className="min-h-full bg-[#f7f9fb] p-5 md:p-6">
            <div className="rounded-2xl bg-white p-5 shadow-sm md:p-7">

                {/* ================================================= */}
                {/* HEADER */}
                {/* ================================================= */}

                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <GoArrowSwitch size={22} />

                            <h1 className="text-xl font-semibold text-gray-900">
                                Blog Redirects
                            </h1>
                        </div>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage blog URLs and redirect
                            old URLs to new pages.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleAddRedirect}
                        className="flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-[#1b5a96] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#154a7b]"
                    >
                        <FiPlus size={18} />

                        Add Redirect
                    </button>
                </div>

                {/* ================================================= */}
                {/* FORM */}
                {/* ================================================= */}

                {showForm && (
                    <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5">

                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-base font-semibold text-gray-900">
                                {editingId
                                    ? "Edit Redirect"
                                    : "Add Redirect"}
                            </h2>

                            <button
                                type="button"
                                onClick={handleCancel}
                                className="cursor-pointer text-sm text-gray-500 hover:text-gray-900"
                            >
                                Cancel
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                {/* OLD SLUG */}

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Old Blog Slug
                                    </label>

                                    <input
                                        type="text"
                                        name="from"
                                        value={form.from}
                                        onChange={handleChange}
                                        disabled={saving}
                                        placeholder="old-blog-slug"
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#1b5a96] disabled:cursor-not-allowed disabled:bg-gray-100"
                                    />

                                    <p className="mt-1.5 text-xs text-gray-400">
                                        Example:
                                        this-is-test-blog121-old
                                    </p>
                                </div>

                                {/* NEW SLUG */}

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        New Blog Slug
                                    </label>

                                    <input
                                        type="text"
                                        name="to"
                                        value={form.to}
                                        onChange={handleChange}
                                        disabled={saving}
                                        placeholder="new-blog-slug"
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#1b5a96] disabled:cursor-not-allowed disabled:bg-gray-100"
                                    />

                                    <p className="mt-1.5 text-xs text-gray-400">
                                        Example:
                                        this-is-test-blog121
                                    </p>
                                </div>
                            </div>

                            {/* ACTIONS */}

                            <div className="mt-5 flex justify-end gap-3">

                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={saving}
                                    className="cursor-pointer rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={
                                        saving ||
                                        !form.from.trim() ||
                                        !form.to.trim()
                                    }
                                    className="cursor-pointer rounded-lg bg-[#1b5a96] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#154a7b] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingId
                                            ? "Update Redirect"
                                            : "Save Redirect"}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* ================================================= */}
                {/* SEARCH */}
                {/* ================================================= */}

                <div className="mb-4 flex items-center justify-between">

                    <div className="relative w-full max-w-sm">

                        <FiSearch
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search redirects..."
                            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#1b5a96]"
                        />
                    </div>

                    <div className="hidden text-sm text-gray-500 md:block">
                        {filteredRedirects.length}{" "}
                        Redirect
                        {filteredRedirects.length !== 1
                            ? "s"
                            : ""}
                    </div>
                </div>

                {/* ================================================= */}
                {/* TABLE */}
                {/* ================================================= */}

                <div className="overflow-hidden rounded-xl border border-gray-200">

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[800px] border-collapse">

                            <thead>
                                <tr className="bg-gray-50">

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-600">
                                        Blog
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-600">
                                        Old URL
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-600">
                                        New URL
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-600">
                                        Status
                                    </th>

                                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase text-gray-600">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-5 py-12 text-center text-sm text-gray-500"
                                        >
                                            Loading redirects...
                                        </td>
                                    </tr>
                                ) : filteredRedirects.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-5 py-12 text-center text-sm text-gray-500"
                                        >
                                            No redirects found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredRedirects.map(
                                        (item) => (
                                            <tr
                                                key={item._id}
                                                className="border-t border-gray-200 hover:bg-gray-50"
                                            >

                                                {/* BLOG */}

                                                <td className="max-w-[250px] px-5 py-4">
                                                    <div className="truncate text-sm font-medium text-gray-900">
                                                        {
                                                            item.postTitle
                                                        }
                                                    </div>
                                                </td>

                                                {/* OLD URL */}

                                                <td className="px-5 py-4 text-sm font-medium text-gray-900">
                                                    {
                                                        item
                                                            .redirect
                                                            ?.from
                                                    }
                                                </td>

                                                {/* NEW URL */}

                                                <td className="px-5 py-4 text-sm text-gray-600">
                                                    {
                                                        item
                                                            .redirect
                                                            ?.url
                                                    }
                                                </td>

                                                {/* STATUS */}

                                                <td className="px-5 py-4">

                                                    <button
                                                        type="button"
                                                        disabled={
                                                            updatingId ===
                                                            item._id
                                                        }
                                                        onClick={() =>
                                                            toggleStatus(
                                                                item
                                                            )
                                                        }
                                                        className={`rounded-full px-3 py-1 text-xs font-medium ${item
                                                            .redirect
                                                            ?.enabled
                                                            ? "bg-green-50 text-green-700"
                                                            : "bg-gray-100 text-gray-500"
                                                            } ${updatingId ===
                                                                item._id
                                                                ? "cursor-not-allowed opacity-50"
                                                                : "cursor-pointer"
                                                            }`}
                                                    >
                                                        {updatingId ===
                                                            item._id
                                                            ? "Updating..."
                                                            : item
                                                                .redirect
                                                                ?.enabled
                                                                ? "Active"
                                                                : "Inactive"}
                                                    </button>
                                                </td>

                                                {/* ACTION */}

                                                <td className="px-5 py-4">

                                                    <div className="flex justify-end gap-2">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    item
                                                                )
                                                            }
                                                            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-[#1b5a96]"
                                                            title="Edit"
                                                        >
                                                            <FiEdit2
                                                                size={16}
                                                            />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            disabled={
                                                                deletingId ===
                                                                item._id
                                                            }
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item
                                                                )
                                                            }
                                                            className="rounded-md p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                                                            title="Remove Redirect"
                                                        >
                                                            <FiTrash2
                                                                size={16}
                                                            />
                                                        </button>

                                                    </div>
                                                </td>

                                            </tr>
                                        )
                                    )
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;