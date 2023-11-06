import Image from "next/image";

interface ILogoBarProps {
  modeName: string; //light | dark
}

const LogoBar = ({ modeName }: ILogoBarProps): JSX.Element => {
  return (
    <div>
      {modeName === "light" ? (
        <div className="fixed top-0 z-50 flex h-[56px] w-full min-w-[360px] items-center justify-center border-b border-solid border-n-light-gray bg-n-white">
          <div className="flex gap-n-sm">
            <Image src="/images/logo.png" width={43} height={20} alt="" />
            <Image
              src="/images/quack_survey.png"
              width={136}
              height={29}
              alt=""
            />
          </div>
        </div>
      ) : (
        <div className="fixed top-0 flex h-[56px] w-full min-w-[360px] items-center  justify-center border-b border-solid border-n-light-gray bg-n-black">
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
              src="/images/quack_survey_black.png"
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
