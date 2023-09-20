import Image from "next/image";
const SubmitResponseButton = ({
  modeName,
  toolPart,
}: ISubmitResponseButtonProps): JSX.Element => {
  return (
    <div>
      {modeName === "double" ? (
        <div>
          {"onReset" in toolPart && "onSubmit" in toolPart ? (
            <div className="fixed flex min-w-[360px] w-full h-[56px] text-n-white text-center leading-[56px] bottom-0">
              <button
                className="inline-flex justify-center items-center w-[20%] h-[56px] bg-n-red text-n-xl"
                onClick={toolPart.onReset}
              >
                <Image
                  priority
                  src="images/초기화_w.svg"
                  alt=""
                  width={32}
                  height={32}
                />
              </button>
              <button
                className="w-[80%] h-[56px] bg-n-blue text-n-xl text-[white] text-center"
                onClick={toolPart.onSubmit}
              >
                제출
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="fixed flex min-w-[360px] w-full h-[56px] text-n-white text-center leading-[56px] bottom-0">
          {"onClick" in toolPart ? (
            <button
              className="min-w-[181px] w-full h-full bg-n-blue text-n-xl text-[white] text-center leading-[56px]"
              onClick={toolPart.onClick}
            >
              {toolPart.buttonText}
            </button>
          ) : (
            ""
          )}
        </div>
      )}{" "}
    </div>
  );
};

export default SubmitResponseButton;
