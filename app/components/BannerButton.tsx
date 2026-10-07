import AppIcon from "./AppIcon";
import CommonButton from "./common/CommonButton";

const BannerButton = ({ name, name2, handleClick, handleClick2, isAnimatedBorder,hoverBackgroundColor,hoverTextColor }: any) => {
  const scrollToCaseStudies = () => {
    const section = document.getElementById("case-studies");

    if (section) {
      const offset = 100;
      const top =
        section.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex items-center justify-center lg:justify-start gap-3 flex-wrap">
      <CommonButton
        isBorder={false}
        isHover={true}
        hoverBackgroundColor={hoverBackgroundColor}
        hoverTextColor={hoverTextColor}
        handleClick={handleClick}
        name={name}
      />

      <button
        aria-label={`view our work`}
        onClick={scrollToCaseStudies}
        className="relative group overflow-hidden flex items-center justify-center rounded-full p-[0.5px] cursor-pointer"
      >
        {/* Animated Border */}

        {isAnimatedBorder && <span className="absolute inset-[-1000%] animate-border-spin-slow bg-[conic-gradient(#4F23E7,#0069FF,#00FFC5,#4F23E7)]" />
        }

        {/* Button Content */}
        <p onClick={handleClick2} className={`relative z-10 flex items-center gap-3 px-8 py-2.5 rounded-full border border-white/80 ${isAnimatedBorder && "bg-black hover:bg-black/80"} text-white font-light font-urbanist transition-all duration-200`}>
          {name2}
          <span className="relative w-3.5 h-3.5 overflow-hidden">
            <span
              className="absolute left-0 top-1/2 -translate-y-1/2
      transition-all duration-500 ease-out
      group-hover:translate-x-5.5 group-hover:text-white"
            >
              <AppIcon
                name="ArrowFillRight"
                size={11}
                className="transition-colors duration-500 ease-out"
              />
            </span>

            <span
              className="absolute left-0 top-1/2 -translate-y-1/2
      -translate-x-5.5
      transition-all duration-500 ease-out
      group-hover:translate-x-0 group-hover:text-white"
            >
              <AppIcon
                name="ArrowFillRight"
                size={11}
                className="transition-colors duration-500 ease-out"
              />
            </span>
          </span>
        </p>
      </button>
    </div>
  );
};

export default BannerButton;
