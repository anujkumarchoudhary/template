import React from 'react'
import AppIcon from '../AppIcon'
import Image from 'next/image'

const HSEGraph = () => {

    const reportUrl =
  "https://marketing.adaired.com/report/15178860/tkn.ced89047fe5a1bd9d3e7d7e7b3c1984c";

const handleDownloadReport = async () => {
    const link = document.createElement("a");
    link.href = reportUrl;
    link.download = "detailed-report";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

    return (
        <div className='relative w-[90%] md:w-[80%] mx-auto lg:w-full bg-[#ffffff] border border-[#04A27E] rounded-[20px]'>

            <div className='bg-[#04A27E] w-full h-15 rounded-tl-[19px] rounded-tr-[19px]'></div>

            <div className='absolute top-6 flex gap-2 left-6'>
                <span className='bg-[#ffffff] h-3 w-3 rounded-full' />
                <span className='bg-[#ffffff] h-3 w-3 rounded-full' />
                <span className='bg-[#ffffff] h-3 w-3 rounded-full' />
            </div>

            <video
                src={`${"imageBaseUrl"}/banner/hire_seo_experts/hse.mp4`}
                className="rounded-[30px] p-4"
                autoPlay
                loop
                muted
                playsInline
            />

            {/* 92% Progress */}
            <div
                className="absolute hidden md:flex top-[45%] left-[10%] z-10 
                h-18 w-18 rounded-full bg-white 
                 items-center justify-center"
            >

                {/* Decorative Lines */}
                <span className="absolute -top-[14px] left-[42px] w-[2px] h-[10px] bg-[#04A27E] rotate-[8deg] rounded-full" />
                <span className="absolute -top-[13px] left-[52px] w-[2px] h-[12px] bg-[#04A27E] rotate-[35deg] rounded-full" />
                <span className="absolute -top-[9px] left-[62px] w-[2px] h-[12px] bg-[#04A27E] rotate-[45deg] rounded-full" />

                {/* Progress Circle */}
                <div className="h-16 w-16 rounded-full flex items-center justify-center">

                    <svg
                        className="absolute h-16 w-16 -rotate-90"
                        viewBox="0 0 64 64"
                    >
                        {/* Background Ring */}
                        <circle
                            cx="32"
                            cy="32"
                            r="26"
                            fill="none"
                            stroke="#E5E5E5"
                            strokeWidth="6"
                        />

                        {/* 92% Progress */}
                        <circle
                            cx="32"
                            cy="32"
                            r="26"
                            fill="none"
                            stroke="#04A27E"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray="163.36"
                            strokeDashoffset="13.07"
                        />
                    </svg>

                    {/* Center */}
                    <div
                        className="h-12 w-12 rounded-full bg-white 
                        flex items-center justify-center 
                        text-[#000000] font-semibold
                        text-[clamp(10px,1vw,12px)]"
                    >
                        92%
                    </div>

                </div>
            </div>

            {/* Screening Summary */}
            <div className='absolute hidden md:block top-[25%] hsegraph_left'>

                <div className='bg-[#ffffff] flex gap-3 border-[1.5px] rounded-full border-[#04A27E] w-fit px-4 py-2'>
                    <AppIcon
                        name='BsFillPatchCheckFill'
                        className='text-[#04A27E] my-auto'
                    />

                    <p className='font-semibold text-[clamp(14px,1.3vw,16px)]'>
                        Screening Summary
                    </p>
                </div>

                {/* Vertical dotted line */}
                <div className="ml-14 h-20 border-l-2 border-dotted border-[#04A27E]" />

                <div className='bg-[#ffffff] p-5 rounded-[20px] space-y-3 w-[55%] divide-y divide-[#000000]/20'>

                    <div className='pb-2'>
                        <p className='text-[#000000]/50 text-[clamp(13px,1.1vw,16px)]'>
                            Overall Score
                        </p>

                        <p className='text-[clamp(14px,1.2vw,16px)]'>
                            92 / 100
                        </p>
                    </div>

                    <div className='pb-2'>
                        <p className='text-[#000000]/50 text-[clamp(13px,1.1vw,16px)]'>
                            SEO Knowledge
                        </p>

                        <p className='text-[clamp(14px,1.2vw,16px)]'>
                            Advanced
                        </p>
                    </div>

                    <div>
                        <p className='text-[#000000]/50 text-[clamp(13px,1.1vw,16px)]'>
                            Specializations
                        </p>

                        <p className='text-[clamp(13px,1.1vw,16px)]'>
                            Technical SEO, On-Page & Content SEO,
                            Local SEO, E-commerce SEO
                        </p>
                    </div>

                </div>
            </div>

            {/* Verified Profile */}
            <div className='absolute hidden md:block top-[45%] right-[-15%]'>

                <div className="flex justify-end">

                    <div className="bg-[#ffffff] flex gap-3 border-[1.5px] rounded-full border-[#04A27E] w-fit px-4 py-2">

                        <AppIcon
                            name="BsFillPatchCheckFill"
                            className="text-[#04A27E] my-auto"
                        />

                        <p className="font-semibold text-[clamp(14px,1.3vw,16px)]">
                            Verified Profile
                        </p>

                    </div>

                </div>

                <div className='mt-10 space-y-1 bg-[#ffffff] p-5 rounded-[20px]'>

                    <div className='flex gap-2'>

                        <p className='font-bold text-[clamp(18px,1.6vw,21px)]'>
                            Ankit S
                        </p>

                        <AppIcon
                            name='BsFillPatchCheckFill'
                            size={16}
                            className='text-[#04A27E] my-auto'
                        />

                        {/* Horizontal + Vertical dotted line */}
                        <div className="relative my-auto w-7.5 border-t-2 border-dotted border-[#04A27E]">

                            <div className="absolute right-0 bottom-0 h-18 border-r-2 border-dotted border-[#04A27E]" />

                        </div>

                    </div>

                    <p className='text-[clamp(14px,1.2vw,16px)] text-[#000000]/70'>
                        Senior SEO Specialist
                    </p>

                    <div className='flex gap-1'>
                        <AppIcon
                            name='TbPointFilled'
                            size={14}
                            className='my-auto'
                        />

                        <p className='text-[clamp(12px,1vw,14px)] text-[#000000]/70'>
                            7+ Years of Experience
                        </p>
                    </div>

                    <div className='flex gap-1'>
                        <AppIcon
                            name='TbPointFilled'
                            size={14}
                            className='my-auto'
                        />

                        <p className='text-[clamp(12px,1vw,14px)] text-[#000000]/70'>
                            Available to Start
                        </p>
                    </div>
                    <a
                        href="https://marketing.adaired.com/report/15178860/tkn.ced89047fe5a1bd9d3e7d7e7b3c1984c"
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-2 bg-[#00FFC5] cursor-pointer px-2 py-1 rounded-md"
                    >
                        <AppIcon
                            name="GoDownload"
                            size={16}
                            className="my-auto"
                        />

                        <p className="text-[clamp(10px,0.9vw,12px)] font-semibold uppercase">
                            View Detailed Report
                        </p>
                    </a>

                </div>
            </div>

        </div>
    )
}

export default HSEGraph