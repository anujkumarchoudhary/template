import Image from "next/image";
import BannerClient from "./BannerClient";
import bannerRobot_1_j539fy from '../../public/assets/common/bannerRobot_1_j539fy.webp'
export default function Banner() {
  return (
    <BannerClient>
      <div className="lg:mt-auto mt-16 w-full transition-all delay-200 duration-1000">
        <Image
          src={bannerRobot_1_j539fy}
          alt="bannerRobot"
          width={910}
          height={910}
          priority
          fetchPriority="high"
          sizes="(max-width:1024px) 80vw, 45vw"
          className="w-[clamp(280px,44vw,910px)] h-auto object-contain lg:mx-0 mx-auto"
        />
      </div>
    </BannerClient>
  );
}
