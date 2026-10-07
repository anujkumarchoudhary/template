import { useState, useEffect } from "react";

// import { DynamicTableProps } from "@/@core/types/table.type";
import Loading from "../Loading";

import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { HiMiniPlus } from "react-icons/hi2";
import { CiFilter } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";

function DynamicTable<T extends { _id: string }>({
  isAdd,
  columns,
  data,
  loading,
  headingText,
  searchPlaceholder,
  emptyMessage = "No data found",
  pagination = false,
  itemsPerPage = 5,
  handleClick,
  isAction = false,
  isEdit = false,
  isDelete = false,
  onEdit,
  onDelete,
}: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const filteredData = data.filter((item:any) =>
    columns.some((col:any) => {
      const value = item[col.key as keyof T];

      if (value == null) return false;

      return String(value)
        .toLowerCase()
        .includes(search.toLowerCase());
    }),
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // const totalItems = data.length;
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = currentPage * itemsPerPage;

  // const currentData = pagination
  //   ? data.slice(indexOfFirstItem, indexOfLastItem)
  //   : data;
  const currentData = pagination
    ? filteredData.slice(indexOfFirstItem, indexOfLastItem)
    : filteredData;

  if (loading) return <Loading />;

  // if (data.length === 0) {
  //   return <div className="pt-36 text-center">{emptyMessage}</div>;
  // }

  // if (filteredData.length === 0) {
  //   return (
  //     <div className="pt-36 text-center">
  //       {search ? "No matching results found" : emptyMessage}
  //     </div>
  //   );
  // }

  const finalColumns = isAction
    ? [...columns, { key: "actions", label: "Action" }]
    : columns;

  return (
    <div className="px-10 pt-5 pb-10 bg-white rounded-xl shadow ">
      <div className="flex mb-2 justify-between items-center">
        <h2 className="text-lg font-semibold">{headingText}</h2>

        {data.length > 0 ? (
          <div className="flex items-center gap-3">
            {/* SEARCH INPUT (TOGGLE) */}
            {showSearch && (
              <div className="rounded-full bg-[#f8f8f8] w-80 border border-black/10 flex items-center overflow-hidden transition-all duration-300">
                <input
                  type="text"
                  placeholder={searchPlaceholder || "Search..."}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full outline-none px-5 py-2"
                />
              </div>
            )}

            {/* ICON BUTTONS */}
            <div className="flex gap-2">
              {/* SEARCH BUTTON */}
              <button
                aria-label={
                  showSearch ? "Hide search input" : "Show search input"
                }
                onClick={() => setShowSearch((prev) => !prev)}
                className="group flex items-center cursor-pointer p-2 border border-black/10 rounded-full bg-[#f8f8f8] hover:bg-primary transition"
              >
                <IoIosSearch
                  size={20}
                  className="text-black group-hover:text-white transition"
                />
              </button>

              {/* FILTER BUTTON */}
              <button
                aria-label="Filter table data"
                // onClick={() => setShowSearch((prev) => !prev)}
                className="group flex items-center cursor-pointer p-2 border border-black/10 rounded-full bg-[#f8f8f8] hover:bg-primary transition"
              >
                <CiFilter
                  size={20}
                  className="text-black group-hover:text-white transition"
                />
              </button>
              <button
                aria-label="Adjust table columns"
                // onClick={() => setShowSearch((prev) => !prev)}
                className="group flex items-center cursor-pointer p-2 border border-black/10 rounded-full bg-[#f8f8f8] hover:bg-primary transition"
              >
                <HiOutlineAdjustmentsHorizontal
                  size={20}
                  className="text-black group-hover:text-white transition"
                />
              </button>
              {/* ADD BUTTON */}
              {isAdd && <button
                aria-label={`Add new ${headingText}`}
                onClick={handleClick}
                className="group flex items-center cursor-pointer p-2 border border-black/10 rounded-full bg-[#f8f8f8] hover:bg-primary transition"
              >
                <HiMiniPlus
                  size={20}
                  className="text-black group-hover:text-white transition"
                />
              </button>}

            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <button
              aria-label={`Add new ${headingText}`}
              onClick={handleClick}
              className="flex items-center gap-2 bg-blue-800 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
            >
              <HiMiniPlus className="text-2xl" />
              Add New
            </button>
          </div>
        )}
      </div>

      {/* HEADER */}
      <div className={`bg-white rounded-xl overflow-hidden ${currentData.length > 0 ? "shadow-md" : "shadow-none"}`}>
        {currentData.length > 0 ? (
          <>
            {/* TABLE HEADER */}
            <div className="bg-[#f8f8f8] text-black px-6 py-3.5 text-sm uppercase font-semibold">
              <div
                className="grid gap-10 w-full"
                style={{
                  gridTemplateColumns: finalColumns
                    .map((col:any) => col.width || "1fr")
                    .join(" "),
                }}
              >
                {finalColumns.map((col:any, i:any) => (
                  <div
                    key={i}
                    className={col.key === "actions" ? "text-right" : ""}
                  >
                    {col.label}
                  </div>
                ))}
              </div>
            </div>

            {/* TABLE BODY */}
            {currentData.map((item:any) => (
              <div
                key={item._id}
                className="grid gap-10 items-center px-6 py-2 border-t border-t-[#000000]/10 hover:bg-blue-50"
                style={{
                  gridTemplateColumns: finalColumns
                    .map((col:any) => col.width || "1fr")
                    .join(" "),
                }}
              >
                {finalColumns.map((col:any, i:number) => {
                  if (col.key === "actions") {
                    return (
                      <div key={i} className="flex justify-end relative">
                        {/* 3 DOT BUTTON */}
                        <button
                          aria-label="Open action menu"
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === item._id ? null : item._id,
                            )
                          }
                          className="p-2 mr-2.5 rounded-full hover:bg-gray-200"
                        >
                          <BsThreeDots size={18} />
                        </button>

                        {/* DROPDOWN */}
                        {openDropdown === item._id && (
                          <div className="absolute right-0 top-10 w-25 bg-white border rounded-lg shadow-lg z-50">
                            {/* EDIT */}
                            {isEdit && (
                              <button
                                aria-label={`Edit ${headingText} ${String(item._id)}`}
                                onClick={() => {
                                  onEdit?.(item);
                                  setOpenDropdown(null);
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 rounded-lg hover:bg-gray-100 text-sm"
                              >
                                <FiEdit /> Edit
                              </button>
                            )}

                            {/* DELETE */}
                            {isDelete && (
                              <button
                                aria-label={`Delete ${headingText} ${String(item._id)}`}
                                onClick={() => {
                                  onDelete?.(item);
                                  setOpenDropdown(null);
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                              >
                                <FiTrash2 /> Delete
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <div key={i} className="truncate">
                      {col.render
                        ? col.render(item)
                        : col.key !== "actions"
                          ? String(item[col.key as keyof T] ?? "-")
                          : null}
                    </div>
                  );
                })}
              </div>
            ))}
          </>
        ) : (
          <div className="py-45 text-center text-gray-500">
            {search ? "No matching results found" : emptyMessage}
          </div>
        )}

        {/* PAGINATION */}
        {pagination && totalPages > 1 && (
          <div className="flex justify-between items-center px-6 py-2 border-t border-t-[#000000]/10 bg-[#f8f8f8]">
            <p className="text-sm">
              Showing {indexOfFirstItem + 1} -{" "}
              {Math.min(indexOfLastItem, totalItems)} of {totalItems}
            </p>

            <div className="flex gap-3">
              <button
                aria-label="Previous page"
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
                className="p-2 bg-primary text-white rounded-full disabled:opacity-50"
              >
                <IoIosArrowBack />
              </button>

              <button
                aria-label="Next page"
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
                className="p-2 bg-primary text-white rounded-full disabled:opacity-50"
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DynamicTable;