// import AppImage from "../AppImage";
export interface ILabel {
  name?: any;
  isBorder?: boolean;
}

const Label = ({ name, isBorder }: ILabel) => {
  return (
    <div className="relative w-fit rounded-full overflow-hidden p-px">
      {/* Animated Border */}
      {isBorder && (
        <span className="absolute inset-[-1000%] animate-border-spin-fast bg-[conic-gradient(#4F23E7,#0069FF,#00FFC5,#4F23E7)]" />
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center gap-2 px-5 py-0.5 rounded-full bg-white">


        <p className="font-urbanist uppercase">{name}</p>
      </div>
    </div>
  );
};

export default Label;