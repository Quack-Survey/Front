import Image from "next/image";

const FloatingTemplateButton = (): JSX.Element => {
  return (
    <div>
      <button className="fixed right-[16px] bottom-[66px] flex w-[50px] h-[50px] justify-center items-center bg-n-light-blue rounded-n-md shadow-n-md">
        <Image priority src="/images/개설.svg" width={28} height={28} alt="" />
      </button>
    </div>
  );
};

export default FloatingTemplateButton;
