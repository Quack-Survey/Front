import Image from "next/image";

interface ISubmitResponseButtonProps {
  modeName: string;
  buttonText: string;
  onClick?: () => void; //[single Mode]
  onSubmit?: () => void; //[double Mode]
  onReset?: () => void;
}
const SubmitResponseButton = ({
  modeName,
  buttonText,
  onClick,
  onSubmit,
  onReset,
}: ISubmitResponseButtonProps): JSX.Element => {
  return (
    <div>
      {true ? (
        <div className="fixed bottom-0 left-0 flex h-[56px] w-full min-w-[360px] text-center leading-[56px] text-n-white">
          <button
            className="h-full w-full min-w-[181px] bg-n-blue text-center text-n-xl leading-[56px] text-[white]"
            onClick={onClick}
          >
            {buttonText}
          </button>
        </div>
      ) : (
        <div>
          {modeName === "double" && onReset && onSubmit ? (
            <div className="fixed bottom-0 flex h-[56px] w-full min-w-[360px] text-center leading-[56px] text-n-white">
              <button
                className="inline-flex h-[56px] w-[20%] items-center justify-center bg-n-red text-n-xl"
                onClick={onReset}
              >
                <Image
                  priority
                  src="images/initialize.svg"
                  alt=""
                  width={32}
                  height={32}
                />
              </button>
              <button
                className="h-[56px] w-[80%] bg-n-blue text-center text-n-xl text-[white]"
                onClick={onSubmit}
              >
                제출
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default SubmitResponseButton;
