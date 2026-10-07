"use client";

import Image from "next/image";

type SvgIconProps = {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
    defaultFilter?: string;
    hoverFilter?: string;
};

export default function SvgIcon({
    src,
    alt = "",
    width = 22,
    height = 22,
    className = "",
    defaultFilter = "none",
    hoverFilter = "brightness(0) saturate(100%) invert(22%) sepia(94%) saturate(2500%) hue-rotate(210deg)",
}: SvgIconProps) {
    return (
        <span className={`group inline-flex shrink-0 ${className}`}>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                unoptimized
                className="h-full w-full object-contain transition duration-300"
                style={{ filter: defaultFilter }}
                onMouseEnter={(event) => {
                    event.currentTarget.style.filter = hoverFilter;
                }}
                onMouseLeave={(event) => {
                    event.currentTarget.style.filter = defaultFilter;
                }}
            />
        </span>
    );
}