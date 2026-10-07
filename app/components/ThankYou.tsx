import Image from "next/image";
import Link from "next/link";

type ThankYouProps = {
  title: string;
  description: string;
  icon?: string;
  ctaText?: string;
  ctaLink?: string;
};

const ThankYou = ({
  title,
  description,
  icon = "/assets/images/thankyou.svg",
  ctaText = "Go back to Home",
  ctaLink = "/",
}: ThankYouProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 px-4">
      <div className="flex flex-col items-center text-center max-w-xl">
        {/* Icon */}
        <div className="mb-6">
          <Image
            src={icon}
            alt="Thank you"
            width={160}
            height={160}
            draggable={false}
            className="animate-fade-in"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          {title}
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-base md:text-lg mb-8">{description}</p>

        {/* CTA */}
        <Link
          href={ctaLink}
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#1B5A96] text-white font-medium shadow-md hover:scale-105 transition"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;