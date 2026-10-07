import Image from "next/image";
import React, { JSX } from "react";
import Label from "../../UI/Label";
// import AppImage from "../../AppImage";
import CommonButton from "../CommonButton";

export interface IHeading {
  subTitle?: String;
  title?: String;
  span?: String;
  spanColor?: string;
  isH1?: boolean;
  isH3?: boolean;
  isBigSize?: boolean;
  isNotPaddingTop?: boolean,
  description?: any;
  isCenter?: boolean;
  isVarticle?: boolean;
  textColor?: string;
  className?: string;
  isDecVarticle?: boolean;
  button?: string,
  isBackgroundColor?:boolean,
  hoverTextColor?:string,
  isHover?:boolean
  hoverBackgroundColor?:string,
  btnTextColor?: string,
  btnBgColor?: string,
  handleClick?: () => void;
  description2?: string;
  isPara2?: boolean;
  headingWidth?: string;
  breakIndex?: number;
  isLabel?: boolean;
  spanBreakIndex?: number;
  isCapitalize?: boolean;
  headingParts?: any;
  isLastParaBold?: boolean;
  isGradient?: boolean;
  textSize?: string;
  lineHeight?: string;
}

const Heading = ({
  subTitle,
  isNotPaddingTop,
  description,
  isCenter,
  textColor,
  button,
  btnTextColor,
  btnBgColor,
  isHover,
  hoverTextColor,
  hoverBackgroundColor,
  isBackgroundColor,
  handleClick,
  className,
  isH1,
  isH3,
  isBigSize,
  isDecVarticle,
  headingWidth,
  breakIndex,
  isLastParaBold,
  isVarticle,
  isLabel,
  isCapitalize,
  headingParts,
  isGradient,
  textSize,
  lineHeight,
}: IHeading) => {
  const HeadingTag = isH1 ? "h1" : isH3 ? "h3" : "h2";

  const headingClass =
    HeadingTag === "h1"
      ? "text-[clamp(1.8rem,3vw,3.75rem)] leading-[clamp(2.5rem,3.65vw,4.65rem)]"
      : HeadingTag === "h2"
        ? isBigSize ? "text-[clamp(1.8rem,3vw,3.75rem)] leading-[clamp(2.5rem,3.65vw,4.65rem)]" : "text-[clamp(1.6rem,2.188vw,2.188rem)] leading-[clamp(2rem,3.125vw,3.125rem)]"
        : "text-[clamp(1.4rem,2vw,1.8rem)] leading-[clamp(1.8rem,2.5vw,2.5rem)]";

  return (
    <div className={className}>
      {isVarticle ? (
        <div className="">
          {isCenter ? (
            <div className="">
              <div className="md:flex` w- block gap-3">
                <div className="flex justify-center">
                  <div
                    className={`flex w-fit justify-center gap-3 rounded-full border-[0.71px] px-4 py-1`}
                    style={{
                      backgroundColor: textColor || "#000000",
                      border: textColor || "#000000",
                    }}
                  >
                    
                    <span
                      className={`my-auto uppercase`}
                      style={{ color: textColor || "#000000" }}
                    >
                      {subTitle}
                    </span>
                  </div>
                </div>
                <div className="mt-px md:mt-3.75">
                  {isH1 ? (
                    <h1 className={`text-center capitalize`}>
                      {headingParts
                        ?.flatMap((part: any) =>
                          part.gradient
                            ? [
                              {
                                text: part.text,
                                size: part?.size,
                                font: part.font,
                                style: part.style,
                                color: part.color,
                                weight: part.weight,
                                gradient: part.gradient,
                              },
                            ]
                            : part.text.split(" ").map((word: string) => ({
                              text: `${word} `,
                              size: part?.size,
                              font: part.font,
                              style: part.style,
                              color: part.color,
                              weight: part.weight,
                              gradient: null,
                            })),
                        )
                        .map((item: any, i: number) => (
                          <span
                            key={i}
                            style={{
                              fontSize: item?.size,
                              fontWeight: item.weight,
                              fontFamily: item.font
                                ? `var(--font-${item.font})`
                                : undefined,
                              fontStyle: item.style || "normal",
                              ...(item.gradient
                                ? {
                                  background: item.gradient,
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                }
                                : {
                                  color: item.color,
                                }),
                            }}
                            className={`${headingClass} ${isCapitalize ? "capitalize" : ""
                              }`}
                          >
                            {item.text}
                            {breakIndex === i + 1 && (
                              <br className="hidden md:block" />
                            )}
                          </span>
                        ))}
                    </h1>
                  ) : (
                    <h2 className={`text-center capitalize`}>
                      {headingParts
                        ?.flatMap((part: any) =>
                          part.gradient
                            ? [
                              {
                                text: part.text,
                                font: part.font,
                                size: part?.size,
                                style: part.style,
                                color: part.color,
                                weight: part.weight,
                                gradient: part.gradient,
                              },
                            ]
                            : part.text.split(" ").map((word: string) => ({
                              text: `${word} `,
                              font: part.font,
                              size: part?.size,
                              style: part.style,
                              color: part.color,
                              weight: part.weight,
                              gradient: null,
                            })),
                        )
                        .map((item: any, i: number) => (
                          <span
                            key={i}
                            style={{
                              fontSize: item?.size,
                              fontWeight: item.weight,
                              fontFamily: item.font
                                ? `var(--font-${item.font})`
                                : undefined,
                              fontStyle: item.style || "normal",
                              ...(item.gradient
                                ? {
                                  background: item.gradient,
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                }
                                : {
                                  color: item.color,
                                }),
                            }}
                            className={`${headingClass} ${isCapitalize ? "capitalize" : ""
                              }`}
                          >
                            {item.text}
                            {breakIndex === i + 1 && (
                              <br className="hidden md:block" />
                            )}
                          </span>
                        ))}
                    </h2>
                  )}
                </div>
              </div>
              <div className="px-0 lg:px-[20%]">
                {/* <p
                  className={`py-4 text-center`}
                  style={{ color: textColor || '#000000' }}
                >
                  {description}
                </p> */}
                {Array.isArray(description) ? (
                  description.map((item: string, index: number) => (
                    <p
                      key={index}
                      className={`py-4 text-center`}
                      style={{ color: textColor || "#000000" }}
                    >
                      {item}
                    </p>
                  ))
                ) : (
                  <p
                    className={`py-4 text-center`}
                    style={{ color: textColor || "#000000" }}
                  >
                    {description}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className={`${""}`}>
              <div className="flex gap-8">
                <div className="flex h-fit mb-4 gap-2">

                  <span
                    className={`my-auto uppercase xl:text-[14px]`}
                    style={{
                      color: textColor || "#000000",
                      border: textColor || "#000000",
                    }}
                  >
                    {subTitle}
                  </span>
                </div>
                <div className="mb-auto mt-3 h-0.5 w-32 bg-[#D7EBFF]"></div>
                <div className={`-mt-4 ${headingWidth}`}>
                  {isH1 ? (
                    <h1 className={`capitalize`}>
                      {headingParts
                        ?.flatMap((part: any) =>
                          part.gradient
                            ? [
                              {
                                text: part.text,
                                font: part.font,
                                size: part?.size,
                                style: part.style,
                                color: part.color,
                                weight: part.weight,
                                gradient: part.gradient,
                              },
                            ]
                            : part.text.split(" ").map((word: string) => ({
                              text: `${word} `,
                              font: part.font,
                              size: part?.size,
                              style: part.style,
                              color: part.color,
                              weight: part.weight,
                              gradient: null,
                            })),
                        )
                        .map((item: any, i: number) => (
                          <span
                            key={i}
                            style={{
                              fontSize: item?.size,
                              fontWeight: item.weight,
                              fontFamily: item.font
                                ? `var(--font-${item.font})`
                                : undefined,
                              fontStyle: item.style || "normal",
                              ...(item.gradient
                                ? {
                                  background: item.gradient,
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                }
                                : {
                                  color: item.color,
                                }),
                            }}
                            className={`${headingClass} ${isCapitalize ? "capitalize" : ""
                              }`}
                          >
                            {item.text}
                            {breakIndex === i + 1 && (
                              <br className="hidden md:block" />
                            )}
                          </span>
                        ))}
                    </h1>
                  ) : (
                    <h2 className={`capitalize`}>
                      {headingParts
                        ?.flatMap((part: any) =>
                          part.gradient
                            ? [
                              {
                                text: part.text,
                                font: part.font,
                                size: part?.size,
                                style: part.style,
                                color: part.color,
                                weight: part.weight,
                                gradient: part.gradient,
                              },
                            ]
                            : part.text.split(" ").map((word: string) => ({
                              text: `${word} `,
                              font: part.font,
                              size: part?.size,
                              style: part.style,
                              color: part.color,
                              weight: part.weight,
                              gradient: null,
                            })),
                        )
                        .map((item: any, i: number) => (
                          <span
                            key={i}
                            style={{
                              fontSize: item?.size,
                              fontWeight: item.weight,
                              fontFamily: item.font
                                ? `var(--font-${item.font})`
                                : undefined,
                              fontStyle: item.style || "normal",
                              ...(item.gradient
                                ? {
                                  background: item.gradient,
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                }
                                : {
                                  color: item.color,
                                }),
                            }}
                            className={`${headingClass} ${isCapitalize ? "capitalize" : ""
                              }`}
                          >
                            {item.text}
                            {breakIndex === i + 1 && (
                              <br className="hidden md:block" />
                            )}
                          </span>
                        ))}
                    </h2>
                  )}
                </div>
              </div>
              <div className={`${isDecVarticle && "pt-4"}`}>
                {/* <p className="pt-4" style={{ color: textColor || '#000000' }}>
                  {description}
                </p> */}
                {Array.isArray(description) ? (
                  description.map((item: string, index: number) => (
                    <p
                      key={index}
                      className={`py-4 text-center`}
                      style={{ color: textColor || "#000000" }}
                    >
                      {"item"}
                    </p>
                  ))
                ) : (
                  <p
                    className={`py-4 text-center`}
                    style={{ color: textColor || "#000000" }}
                  >
                    {description}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          {isCenter ? (
            <div className="">
              <div className="md:flex` w- block gap-3">
                {isLabel && (
                  <div className="flex pb-4 justify-center">
                    <Label name={subTitle} isBorder={true} />
                  </div>
                )}
                <div className="">
                  {isH1 ? (
                    <h1 className="text-center">
                      {(() => {
                        let currentWordIndex = 0;

                        return headingParts
                          ?.flatMap((part: any) => {
                            // =====================================================
                            // SPECIAL PART
                            // Keep gradient / border / animateChars as ONE ITEM
                            // =====================================================
                            if (
                              part.gradient ||
                              part.border ||
                              part.animateChars
                            ) {
                              const words = part.text.trim().split(/\s+/);

                              const startWordIndex = currentWordIndex + 1;

                              currentWordIndex += words.length;

                              const endWordIndex = currentWordIndex;

                              return [
                                {
                                  text: part.text,
                                  font: part.font,
                                  size: part?.size,
                                  style: part.style,
                                  color: part.color,
                                  bg: part?.bg,
                                  weight: part.weight,
                                  gradient: part.gradient,
                                  border: part.border,
                                  bgColor: part.bgColor,
                                  animateChars: part.animateChars,

                                  // Keep track of the word range
                                  startWordIndex,
                                  endWordIndex,
                                },
                              ];
                            }

                            // =====================================================
                            // NORMAL PART
                            // Split word-by-word
                            // =====================================================
                            return part.text.split(" ").map((word: string) => {
                              currentWordIndex += 1;

                              return {
                                text: `${word} `,
                                font: part.font,
                                size: part?.size,
                                style: part.style,
                                color: part.color,
                                bg: part?.bg,
                                weight: part.weight,
                                border: part.border,
                                bgColor: part.bgColor,
                                gradient: null,
                                animateChars: false,

                                startWordIndex: currentWordIndex,
                                endWordIndex: currentWordIndex,
                              };
                            });
                          })
                          ?.map((item: any, i: number) => {
                            // =====================================================
                            // BREAK LOGIC
                            //
                            // If breakIndex falls exactly at the END of this item,
                            // add <br>.
                            //
                            // Normal word:
                            //   start = 3, end = 3
                            //
                            // Animated part:
                            //   start = 1, end = 4
                            // =====================================================

                            const shouldBreak =
                              breakIndex === item.endWordIndex;

                            return (
                              <span
                                key={i}
                                className={`${headingClass} ${isCapitalize ? "capitalize" : ""
                                  }`}
                                style={{
                                  fontSize: item?.size,
                                  fontWeight: item.weight,
                                  fontFamily: item.font
                                    ? `var(--font-${item.font})`
                                    : undefined,
                                  fontStyle: item.style || "normal",

                                  // Gradient
                                  ...(item.gradient
                                    ? {
                                      background: item.gradient,
                                      WebkitBackgroundClip: "text",
                                      WebkitTextFillColor:
                                        "transparent",
                                    }
                                    : {
                                      color: item.color,
                                      background: item.bg,
                                    }),

                                  // Border
                                  ...(item.border
                                    ? {
                                      position: "relative",
                                      display: "inline-block",
                                      border: `1px solid ${item.border}`,
                                      padding: "2px 5px",
                                    }
                                    : {}),

                                  // Background color
                                  ...(item.bgColor
                                    ? {
                                      backgroundColor:
                                        item.bgColor,
                                    }
                                    : {}),
                                }}
                              >
                                {/* =================================================
                CHARACTER ANIMATION
            ================================================= */}
                                {item?.animateChars ? (
                                  <span
                                    key={i}
                                    className="inline-block normal-case"
                                    style={{
                                      fontSize:
                                        item?.size ||
                                        "clamp(1.5rem, 3vw, 3.75rem)",

                                      fontWeight:
                                        item?.weight || 400,

                                      fontFamily: item?.font
                                        ? `var(--font-${item.font})`
                                        : undefined,

                                      fontStyle:
                                        item?.style || "normal",

                                      color: item?.gradient
                                        ? undefined
                                        : item?.color,

                                      ...(item?.gradient
                                        ? {
                                          background:
                                            item.gradient,
                                          WebkitBackgroundClip:
                                            "text",
                                          WebkitTextFillColor:
                                            "transparent",
                                        }
                                        : {}),
                                    }}
                                  >
                                    {item.text
                                      .split("")
                                      .map(
                                        (
                                          char: string,
                                          index: number
                                        ) => (
                                          <span
                                            key={`${i}-${index}`}
                                            className="inline-block letter-animate normal-case"
                                            style={{
                                              fontSize:
                                                item?.size ||
                                                "clamp(1.5rem, 3vw, 3.75rem)",

                                              fontWeight:
                                                item?.weight || 400,

                                              fontFamily:
                                                item?.font
                                                  ? `var(--font-${item.font})`
                                                  : undefined,

                                              fontStyle:
                                                item?.style ||
                                                "normal",

                                              color:
                                                item?.gradient
                                                  ? undefined
                                                  : item?.color,

                                              ...(item?.gradient
                                                ? {
                                                  background:
                                                    item.gradient,
                                                  WebkitBackgroundClip:
                                                    "text",
                                                  WebkitTextFillColor:
                                                    "transparent",
                                                }
                                                : {}),

                                              animationDelay: `${index * 0.06
                                                }s`,
                                            }}
                                          >
                                            {char === " "
                                              ? "\u00A0"
                                              : char}
                                          </span>
                                        )
                                      )}
                                  </span>
                                ) : (
                                  /* =================================================
                                     NORMAL TEXT
                                  ================================================= */
                                  <span
                                    key={i}
                                    className={`${headingClass} ${isCapitalize
                                      ? "capitalize"
                                      : ""
                                      }`}
                                    style={{
                                      fontSize: item?.size,
                                      fontWeight: item?.weight,
                                      fontFamily: item?.font
                                        ? `var(--font-${item.font})`
                                        : undefined,
                                      fontStyle:
                                        item?.style || "normal",

                                      color: item?.gradient
                                        ? undefined
                                        : item?.color,

                                      ...(item?.gradient
                                        ? {
                                          background:
                                            item.gradient,
                                          WebkitBackgroundClip:
                                            "text",
                                          WebkitTextFillColor:
                                            "transparent",
                                        }
                                        : {}),
                                    }}
                                  >
                                    {item.text}
                                  </span>
                                )}

                                {/* =================================================
                BREAK AFTER breakIndex
            ================================================= */}
                                {shouldBreak && (
                                  <br className="hidden md:block" />
                                )}
                              </span>
                            );
                          });
                      })()}
                    </h1>
                  ) : (
                    <h2 className={`text-center`}>

                      {headingParts
                        ?.flatMap((part: any) =>
                          part.gradient
                            ? [
                              {
                                text: part.text,
                                font: part.font,
                                size: part?.size,
                                style: part.style,
                                color: part.color,
                                weight: part.weight,
                                gradient: part.gradient,
                              },
                            ]
                            : part.text.split(" ").map((word: string) => ({
                              text: `${word} `,
                              font: part.font,
                              size: part?.size,
                              style: part.style,
                              color: part.color,
                              weight: part.weight,
                              gradient: null,
                            })),
                        )
                        .map((item: any, i: number) => (
                          <span
                            key={i}
                            style={{
                              fontSize: item?.size,
                              fontWeight: item.weight,
                              fontFamily: item.font
                                ? `var(--font-${item.font})`
                                : undefined,
                              fontStyle: item.style || "normal",
                              ...(item.gradient
                                ? {
                                  background: item.gradient,
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                }
                                : {
                                  color: item.color,
                                }),
                            }}
                            className={`${headingClass} ${isCapitalize ? "capitalize" : ""
                              }`}
                          >
                            {item.text}
                            {breakIndex === i + 1 && (
                              <br className="hidden md:block" />
                            )}
                          </span>
                        ))}
                    </h2>
                  )}
                </div>
              </div>
              {description && (
                <div className="px-0 lg:px-[15%]">
                  {Array.isArray(description) ? (
                    description.map((item: string, index: number) => {
                      const isLast = description.length - 1 === index;
                      return (
                        <p
                          key={index}
                          className={`mx-auto w-full py-4 text-center lg:w-full ${isLast && isLastParaBold && "font-bold"}`}
                          style={{ color: textColor || "#000000" }}
                        >
                          {item}
                        </p>
                      );
                    })
                  ) : (
                    <p
                      className={`mx-auto w-full py-4 text-center lg:w-full`}
                      style={{ color: textColor || "#000000" }}
                    >
                      {description}
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div
              className={`${isDecVarticle && "grid grid-cols-1 lg:grid-cols-2 lg:gap-40"}`}
            >
              <div className="md:flex` block w-full justify-center justify-items-center gap-3 md:justify-center md:justify-items-center lg:w-fit lg:justify-start lg:justify-items-start">
                {isLabel && (
                  <div className="flex pb-6.25 justify-center md:justify-self-start">
                    <Label name={subTitle} isBorder={true} />
                  </div>
                )}
                <HeadingTag
                  className={`text-center ${HeadingTag === "h1"
                    ? "lg:text-left"
                    : "md:text-center lg:text-left"
                    }`}
                >
                  {headingParts
                    ?.flatMap((part: any) =>
                      part.gradient
                        ? [
                          {
                            text: part.text,
                            size: part?.size,
                            font: part.font,
                            style: part.style,
                            color: part.color,
                            weight: part.weight,
                            gradient: part.gradient,
                          },
                        ]
                        : part.text.split(" ").map((word: string) => ({
                          text: `${word} `,
                          size: part?.size,
                          font: part.font,
                          style: part.style,
                          color: part.color,
                          weight: part.weight,
                          gradient: null,
                        })),
                    )
                    .map((item: any, i: number) => (
                      <span
                        key={i}
                        style={{
                          fontSize: item?.size,
                          fontWeight: item.weight,
                          fontFamily: item.font
                            ? `var(--font-${item.font})`
                            : undefined,
                          fontStyle: item.style || "normal",
                          ...(item.gradient
                            ? {
                              background: item.gradient,
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }
                            : {
                              color: item.color,
                            }),
                        }}
                        className={`${headingClass} ${isCapitalize ? "capitalize" : ""
                          }`}
                      >
                        {item.text}
                        {breakIndex === i + 1 && (
                          <br className="hidden md:block" />
                        )}
                      </span>
                    ))}
                </HeadingTag>
              </div>
              <div className={`${isDecVarticle && "pt-0"}`}>
                {Array.isArray(description) ? (
                  description?.map((item: string, index: number) => {
                    const isLast = description.length - 1 === index;
                    return (
                      <p
                        key={index}
                        className={`pt-4 text-center lg:text-left ${isLast && isLastParaBold && "font-bold"}`}
                        style={{ color: textColor || "#000000" }}
                      >
                        {item}
                      </p>
                    );
                  })
                ) : (

                  <>
                    {description && <p
                      className={` ${!isNotPaddingTop && "pt-4"} text-center lg:text-left ${lineHeight} `}
                      style={{
                        color: textColor || "#000000",
                        fontSize: textSize
                      }}
                    >
                      {description}
                    </p>}
                  </>

                )}
                {button && <div className="mt-4 lg:mt-0 flex justify-center lg:justify-end p-3">
                  <CommonButton name={button} isBackgroundColor={isBackgroundColor} isHover={isHover} textColor={btnTextColor} hoverTextColor={hoverTextColor} hoverBackgroundColor={hoverBackgroundColor} backgroundColor={btnBgColor} handleClick={handleClick} />
                </div>}

              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Heading;