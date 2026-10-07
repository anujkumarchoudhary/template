"use client";

import { useEffect, useState } from "react";

interface PaginationProps {
    totalPages: number;
    storageKey?: string;
    onPageChange: (page: number) => void;
    className?: string;
}

const Pagination = ({
    totalPages,
    storageKey = "pagination-page",
    onPageChange,
    className = "",
}: PaginationProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    /*
     * Restore previously selected page
     */
    useEffect(() => {
        const savedPage = sessionStorage.getItem(storageKey);

        if (savedPage) {
            const page = Number(savedPage);

            if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
                onPageChange(page);
            }
        }
    }, [storageKey, totalPages]);

    /*
     * Change page
     */
    const changePage = (page: number) => {
        if (
            page < 1 ||
            page > totalPages ||
            page === currentPage
        ) {
            return;
        }

        setCurrentPage(page);

        sessionStorage.setItem(
            storageKey,
            String(page)
        );

        onPageChange(page);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    /*
     * Generate page numbers
     */
    const getPages = () => {
        const pages: (number | "dots")[] = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }

            return pages;
        }

        // Page 1, 2, 3
        if (currentPage <= 3) {
            pages.push(1);
            pages.push(2);
            pages.push(3);
            pages.push("dots");
            pages.push(totalPages);

            return pages;
        }

        // Last pages
        if (currentPage >= totalPages - 2) {
            pages.push(1);
            pages.push("dots");
            pages.push(totalPages - 2);
            pages.push(totalPages - 1);
            pages.push(totalPages);

            return pages;
        }

        // Middle pages
        pages.push(1);
        pages.push("dots");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("dots");
        pages.push(totalPages);

        return pages;
    };

    if (totalPages <= 1) {
        return null;
    }

    const pages = getPages();

    return (
        <nav
            aria-label="Pagination"
            className={`flex items-center justify-center gap-3 ${className}`}
        >
            {/* Previous */}
            {currentPage > 1 && (
                <button
                    type="button"
                    onClick={() =>
                        changePage(currentPage - 1)
                    }
                    className="
            h-[35px]
            rounded-[4px]
            border
            border-[#E5E5E5]
            bg-white
            px-4
            text-[14px]
            text-[#222]
            cursor-pointer
            transition-all
            hover:bg-[#f5f5f5]
          "
                >
                    « Previous
                </button>
            )}

            {/* Pages */}
            {pages.map((page, index) => {
                if (page === "dots") {
                    return (
                        <span
                            key={`dots-${index}`}
                            className="
                flex
                h-[35px]
                min-w-[20px]
                items-center
                justify-center
                text-[14px]
                text-[#222]
              "
                        >
                            ...
                        </span>
                    );
                }

                const active = page === currentPage;

                return (
                    <button
                        key={page}
                        type="button"
                        onClick={() => changePage(page)}
                        aria-current={
                            active ? "page" : undefined
                        }
                        className={`
              flex
              h-[35px]
              min-w-[40px]
              items-center
              justify-center
              rounded-[4px]
              border
              px-3
              text-[14px]
              cursor-pointer
              transition-all

              ${active
                                ? "bg-linear-to-br from-[#6C72FF]  to-[#00FFC5] text-white"
                                : "border-[#E5E5E5] bg-white text-[#222] hover:bg-[#f5f5f5]"
                            }
            `}
                    >
                        {page}
                    </button>
                );
            })}

            {/* Next */}
            {currentPage < totalPages && (
                <button
                    type="button"
                    onClick={() =>
                        changePage(currentPage + 1)
                    }
                    className="
            h-[35px]
            rounded-[4px]
            border
            border-[#E5E5E5]
            bg-white
            px-4
            text-[14px]
            text-[#222]
            cursor-pointer
            transition-all
            hover:bg-[#f5f5f5]
          "
                >
                    Next »
                </button>
            )}
        </nav>
    );
};

export default Pagination;