import Image from "next/image";

const LogoBar = ({ modeName }: ILogoBarProps): JSX.Element => {
  return (
    <div>
      {modeName === "light" ? (
        <div className="fixed flex justify-center items-center min-w-[360px] w-full h-[56px] bg-n-white border-n-light-gray border-b border-solid top-0">
          <div className="flex gap-n-sm">
            <Image src="/images/logo.png" width={43} height={20} alt="" />
            <Image
              src="/images/quack survey.png"
              width={136}
              height={29}
              alt=""
            />
          </div>
        </div>
      ) : (
        <div className="fixed flex justify-center items-center min-w-[360px] w-full h-[56px]  bg-n-black border-n-light-gray border-b border-solid top-0">
          <div className="flex gap-n-sm">
            <Image
              priority
              src="/images/logo_black.png"
              width={43}
              height={20}
              alt=""
            />
            <Image
              priority
              src="/images/quack survey_black.png"
              width={136}
              height={29}
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoBar;
