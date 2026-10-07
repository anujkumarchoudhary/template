"use client";

import { useEffect, useState } from "react";

const stats = [
    {
        title: "Clients & Partners",
        value: "100+",
        description:
            "Businesses Supported With Reliable, Scalable PHP Development Solutions",
    },
    {
        title: "Projects Delivered",
        value: "500+",
        description:
            "Digital Projects Delivered From Concept to Launch With PHP Expertise",
    },
    {
        title: "PHP Experts",
        value: "10+",
        description:
            "Technology Experts Building Custom PHP Solutions For Growing Businesses",
    },
    {
        title: "Industry Expertise",
        value: "9+",
        description:
            "Years of Experience Delivering Business-Focused PHP Development Systems",
    },
];

const DataAnimator = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % stats.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const item = stats[activeIndex];

    return (
        <div className="w-full">
            {/* CARDS */}
            <div className="md:w-[60%] mx-auto lg:mr-0 lg:min-w-140 overflow-hidden rounded-[30px] lg:rounded-[40px] border-3 border-b-8 border-r-8 border-[#0083FF] bg-white px-5 lg:px-10 py-6 lg:py-11">

                <div key={activeIndex} className="animate-stat-content space-y-10 lg:space-y-30">
                    <div className="inline-flex rounded-full bg-[#0083FF] px-8 py-2">
                        <span className="text-[clamp(16px,1.4vw,23px)] font-bold text-white">
                            {item.title}
                        </span>
                    </div>

                    <div className="space-y-10">
                        <h3 className=" text-[clamp(48px,5vw,110px)] font-normal text-black">
                            {item.value}
                        </h3>

                        <p className=" text-[clamp(16px,1.4vw,20px)] font-semibold text-[#00000099]">
                            {item.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataAnimator;