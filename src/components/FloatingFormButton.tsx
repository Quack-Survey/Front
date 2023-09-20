import Image from "next/image";

const FloatingFormButton = ({
  onCreateSingle,
  onCreatePlural,
  onCreateDescription,
}: IFloatingFormButtonProps): JSX.Element => {
  return (
    <button>
      <button
        onClick={onCreateSingle}
        className="fixed bottom-[197px] right-[16px] flex w-[50px] h-[50px] justify-center items-center bg-n-white rounded-n-xl shadow-n-md"
      >
        <Image priority src="/images/단일.svg" width={16} height={16} alt="" />
      </button>
      <button
        onClick={onCreatePlural}
        className="fixed bottom-[131px] right-[16px] flex w-[50px] h-[50px] justify-center items-center bg-n-white rounded-n-xl shadow-n-md"
      >
        <Image priority src="/images/복수.svg" width={22} height={22} alt="" />
      </button>
      <button
        onClick={onCreateDescription}
        className="fixed bottom-[65px] right-[16px] flex w-[50px] h-[50px] justify-center items-center bg-n-white rounded-n-xl shadow-n-md"
      >
        <Image
          priority
          src="/images/서술형.svg"
          width={24}
          height={24}
          alt=""
        />
      </button>
    </button>
  );
};

export default FloatingFormButton;
