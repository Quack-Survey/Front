import Image from "next/image";

const FloatingFormButton = ({
  onClick,
  imageName,
  size,
  isBlocked,
}: IFloatingFormButtonProps): JSX.Element => {
  return (
    <div>
      {isBlocked ? (
        <div className="flex w-[50px] h-[50px] justify-center items-center bg-n-light-black rounded-n-full shadow-n-md"></div>
      ) : (
        <button
          onClick={onClick}
          className="flex w-[50px] h-[50px] justify-center items-center bg-n-white rounded-n-full shadow-n-md"
        >
          <Image
            priority
            src={`/images/${imageName}.svg`}
            width={size}
            height={size}
            alt=""
          />
        </button>
      )}
    </div>
  );
};

export default FloatingFormButton;
