interface TechItem {
    name: string;
    icon: React.ReactNode;
}

const CustomDevGraph: React.FC = () => {
    // 1. Outer Ring Items
    const outerItems: TechItem[] = [
        {
            name: 'Firebase',
            icon: (
                <svg className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none">
                    <path d="M3.89 15.75L10.23 2.45c.18-.38.73-.38.91 0l1.49 2.87z" fill="#FFC107" />
                    <path d="M11.66 8.45l-1.92-3.66a.512.512 0 00-.91 0L3.05 16.4c-.17.33-.03.74.31.9l8.3-8.85z" fill="#FF6F00" />
                    <path d="M20.11 16.35L13.24 3.41c-.2-.37-.76-.32-.89.09l-2.07 6.64 9.83 6.21c.36-.2.48-.66.21-1.0z" fill="#FFCA28" />
                </svg>
            ),
        },
        {
            name: 'Laravel',
            icon: (
                <svg className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#FF2D20]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5M12 22V12" />
                </svg>
            ),
        },
        {
            name: 'AWS',
            icon: (
                <svg className="w-6 h-4 sm:w-10 sm:h-6 md:w-12 md:h-8 text-[#232F3E]" viewBox="0 0 24 14" fill="currentColor">
                    <text x="0" y="10" fontSize="9" fontWeight="bold" fontFamily="sans-serif">aws</text>
                    <path d="M2 11c5 3 15 3 20 0" fill="none" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            name: 'CSS3',
            icon: (
                <svg className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#1572B6]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1.5 22L3.5 2h17l2 20L12 24L1.5 22zM12 4.1L5.4 5.3l1.1 12.4l5.5 1.5l5.5-1.5l1.1-12.4L12 4.1z" />
                    <path d="M12 7.5v3h3.6l-.4 3.8l-3.2.9v3.1l6.3-1.7l.8-9.1H12z" fill="#FFF" />
                    <path d="M12 7.5H6.3l.3 3h5.4v-3zm0 6.1H8.9l-.2-2.1h3.3v-3H6.5l.6 6.1l4.9 1.3v-2.3z" fill="#FFF" />
                </svg>
            ),
        },
        {
            name: 'Nest Js',
            icon: (
                <svg className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#E0234E]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 8.5v7L12 22l10-6.5v-7L12 2zM10.5 16.5l-4-2.5v-4l4-2.5 4 2.5v4l-4 2.5z" />
                </svg>
            ),
        },
        {
            name: 'HTML',
            icon: (
                <svg className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#E34F26]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1.5 22L3.5 2h17l2 20L12 24L1.5 22zM12 4.1L5.4 5.3l1.1 12.4l5.5 1.5l5.5-1.5l1.1-12.4L12 4.1z" />
                    <path d="M12 7.5v3h3.6l-.4 3.8l-3.2.9v3.1l6.3-1.7l.8-9.1H12zM12 7.5H6.3l.3 3h5.4v-3z" fill="#FFF" />
                </svg>
            ),
        },
        {
            name: 'React JS',
            icon: (
                <svg className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#61DAFB]" viewBox="-11.5 -10.2 23 20.4">
                    <circle cx="0" cy="0" r="2.05" fill="currentColor" />
                    <g stroke="currentColor" strokeWidth="1" fill="none">
                        <ellipse rx="11" ry="4.2" />
                        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                    </g>
                </svg>
            ),
        },
        {
            name: 'Alpine Js',
            icon: (
                <svg className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#77C1D4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4L4 16h16L12 4zM12 10l4 6H8l4-6z" />
                </svg>
            ),
        },
    ];

    // 2. Inner Ring Items
    const innerItems: TechItem[] = [
        {
            name: 'Fast API',
            icon: (
                <div className="bg-[#05998B] text-white rounded-full w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-[10px] sm:text-sm">
                    F
                </div>
            ),
        },
        {
            name: 'Livewire',
            icon: (
                <div className="bg-[#FB70A9] rounded-full w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="8" />
                    </svg>
                </div>
            ),
        },
        {
            name: 'MongoDB',
            icon: (
                <svg className="w-4 h-4 sm:w-7 sm:h-7 text-[#13AA52]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C12 2 6 9 6 14C6 18.5 8.5 22 12 22C15.5 22 18 18.5 18 14C18 9 12 2 12 2ZM12 19.5C10.5 19.5 9 18 9 14C9 10.5 12 6.5 12 6.5Z" />
                </svg>
            ),
        },
        {
            name: 'Supabase',
            icon: (
                <svg className="w-4 h-4 sm:w-7 sm:h-7 text-[#3ECF8E]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 10.5h-7.5V3l-10.5 10.5h7.5V21L21 10.5z" />
                </svg>
            ),
        },
        {
            name: 'Vite',
            icon: (
                <svg className="w-4 h-4 sm:w-7 sm:h-7 text-[#FFC107]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 4L11 20l-2-6-4-1 14-9z" />
                </svg>
            ),
        },
        {
            name: 'Node Js',
            icon: (
                <svg className="w-4 h-4 sm:w-7 sm:h-7 text-[#339933]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm7 14.3l-7 3.9l-7-3.9V8.7l7-3.9l7 3.9v8.6z" />
                </svg>
            ),
        },
        {
            name: 'SQL',
            icon: (
                <svg className="w-4 h-4 sm:w-7 sm:h-7 text-[#E2913B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <ellipse cx="12" cy="5" rx="8" ry="3" />
                    <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
                </svg>
            ),
        },
        {
            name: 'PostgreSQL',
            icon: (
                <svg className="w-4 h-4 sm:w-7 sm:h-7 text-[#336791]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
                </svg>
            ),
        },
    ];

    const totalItems = innerItems.length + outerItems.length;
    const stagger = 0.15;
    const animDuration = 0.6;
    const reverseStartTime = 6;
    const loopDuration = 9;

    const dynamicKeyframes = Array.from({ length: totalItems }).map((_, i) => {
        const t1 = i * stagger;
        const t2 = t1 + animDuration;
        const t3 = reverseStartTime + (totalItems - 1 - i) * stagger;
        const t4 = t3 + animDuration;

        const p1 = (t1 / loopDuration) * 100;
        const p2 = (t2 / loopDuration) * 100;
        const p3 = (t3 / loopDuration) * 100;
        const p4 = (t4 / loopDuration) * 100;

        // REVERSE
        // return `
        //     @keyframes customShoot-${i} {
        //         0%, ${p1}% { transform: translate(-50%, -50%) scale(0); opacity: 0; animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        //         ${p2}%, ${p3}% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1); opacity: 1; animation-timing-function: ease-in-out; }
        //         ${p4}%, 100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        //     }
        // `;

        // FADE
        return `
            @keyframes customShoot-${i} {
                0%, ${p1}% {transform: translate(-50%, -50%) scale(0); opacity: 0; animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);}
                ${p2}% {transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1); opacity: 1;}
                ${p3}% {transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1); opacity: 1;}
                ${p4}%, 100% {transform: translate(calc(-50% + var(--tx)),calc(-50% + var(--ty))) scale(0.85); opacity: 0;
            }
        }`;

    }).join('\n');

    return (
        <div className="relative w-full select-none flex items-center justify-center">
            {/* INJECTED CUSTOM KEYFRAMES */}
            <style>
                {`
                @keyframes popIn {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                    100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                }
                @keyframes pulseScale {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                @keyframes rippleWave {
                    0% { transform: scale(0.8); opacity: 0.8; border-width: 4px; }
                    100% { transform: scale(3.5); opacity: 0; border-width: 0px; }
                }
                /* Dynamically generated staggered keyframes for perfect LIFO reversing */
                ${dynamicKeyframes}
                `}
            </style>

            <div
                className="flex items-center justify-center aspect-square
                   w-[clamp(310px,80vw,760px)]
                   [--r-inner:72px] [--r-outer:135px]
                   sm:[--r-inner:115px] sm:[--r-outer:215px]
                   md:[--r-inner:125px] md:[--r-outer:250px]
                   lg:[--r-inner:140px] lg:[--r-outer:280px]"
            >
                {/* WAVE EFFECT */}
                <div
                    className="absolute left-1/2 top-1/2 z-0 w-[clamp(60px,8vw,115px)] h-[clamp(60px,8vw,115px)]"
                    style={{
                        animation: "popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
                    }}
                >
                    {[0, 1, 2].map((i) => (
                        <div
                            key={`wave-${i}`}
                            className="absolute inset-0 rounded-full border border-purple-500/40"
                            style={{
                                animation:
                                    "rippleWave 4.5s cubic-bezier(0.0, 0.2, 0.8, 1) infinite",
                                animationDelay: `${i * 0.6}s`,
                            }}
                        />
                    ))}
                </div>

                {/* CENTER ICON */}
                <div
                    className="absolute left-1/2 top-1/2 z-30 w-[clamp(60px,7vw,115px)] h-[clamp(60px,7vw,115px)]"
                    style={{
                        animation: "popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
                    }}
                >
                    <div
                        className="flex items-center justify-center w-full h-full rounded-full bg-white text-black shadow-xl"
                        style={{
                            animation: "pulseScale 2s ease-in-out infinite",
                            animationDelay: "0.6s"
                        }}
                    >
                        <svg className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 text-black" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                        </svg>
                    </div>
                </div>

                {/* INNER RING MAPPING */}
                {innerItems.map((item, index) => {
                    const globalIndex = index;
                    const angle = (index * 360) / 8 - 90;
                    const rad = (angle * Math.PI) / 180;
                    const cos = Math.cos(rad).toFixed(4);
                    const sin = Math.sin(rad).toFixed(4);

                    return (
                        <div
                            key={`inner-${item.name}`}
                            className="absolute left-1/2 top-1/2 z-20 w-[clamp(50px,5.5vw,92px)] h-[clamp(50px,5.5vw,92px)]"
                            style={{
                                "--tx": `calc(var(--r-inner) * ${cos})`,
                                "--ty": `calc(var(--r-inner) * ${sin})`,
                                animation: `customShoot-${globalIndex} ${loopDuration}s infinite`,
                                opacity: 0,
                            } as React.CSSProperties}
                        >
                            <div
                                className="flex flex-col items-center justify-center w-full h-full bg-white rounded-full shadow-lg cursor-pointer"
                                style={{
                                    animation: "pulseScale 2.5s ease-in-out infinite",
                                    animationDelay: `${(globalIndex * stagger) + 0.6}s`,
                                }}
                            >
                                <div className="flex flex-col items-center justify-center gap-1">
                                    {item.icon}
                                    <span className="w-full text-center font-semibold text-gray-900 text-[7px] sm:text-[9px] md:text-[11px] lg:text-xs">
                                        {item.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* OUTER RING MAPPING */}
                {outerItems.map((item, index) => {
                    const globalIndex = innerItems.length + index;
                    const angle = (index * 360) / 8 - 90;
                    const rad = (angle * Math.PI) / 180;
                    const cos = Math.cos(rad).toFixed(4);
                    const sin = Math.sin(rad).toFixed(4);

                    return (
                        <div
                            key={`outer-${item.name}`}
                            className="absolute left-1/2 top-1/2 z-10 w-[clamp(60px,7vw,115px)] h-[clamp(60px,7vw,115px)]"
                            style={{
                                "--tx": `calc(var(--r-outer) * ${cos})`,
                                "--ty": `calc(var(--r-outer) * ${sin})`,
                                animation: `customShoot-${globalIndex} ${loopDuration}s infinite`,
                                opacity: 0,
                            } as React.CSSProperties}
                        >
                            <div
                                className="flex flex-col items-center justify-center w-full h-full bg-white rounded-full shadow-xl cursor-pointer"
                                style={{
                                    animation: "pulseScale 2.5s ease-in-out infinite",
                                    animationDelay: `${(globalIndex * stagger) + 0.6}s`,
                                }}
                            >
                                <div className="flex flex-col items-center justify-center gap-1">
                                    {item.icon}
                                    <span className="w-full text-center truncate font-semibold text-gray-900 text-[7px] sm:text-[9px] md:text-[11px] lg:text-xs">
                                        {item.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CustomDevGraph;