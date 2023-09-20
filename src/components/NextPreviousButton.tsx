const NextPreviousButton = ({
  modeName,
  toolPart,
}: INextPreviousButtonProps): JSX.Element => {
  return (
    <div>
      {modeName === "double" ? (
        <div className="fixed flex min-w-[360px] w-full h-[56px] text-n-white text-center leading-[56px] bottom-0">
          {"onLeftClick" in toolPart && "onRightClick" in toolPart ? (
            <div className="w-full">
              <button
                className="min-w-[181px] w-[50%] h-full border bg-n-white text-n-xl text-n-dark-gray text-center leading-[56px] border-solid border-n-gray"
                onClick={toolPart.onLeftClick}
              >
                {toolPart.buttonText[0]}
              </button>
              <button
                className="min-w-[181px] w-[50%] h-full bg-n-blue text-n-xl text-[white] text-center leading-[56px]"
                onClick={toolPart.onRightClick}
              >
                {toolPart.buttonText[1]}
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div>
          {"onClick" in toolPart ? (
            <div className="fixed flex min-w-[360px] w-full h-[56px] text-n-white text-center leading-[56px] bottom-0">
              <button
                className="min-w-[181px] w-full h-full bg-n-blue text-n-xl text-[white] text-center leading-[56px]"
                onClick={toolPart.onClick}
              >
                {toolPart.buttonText}
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

export default NextPreviousButton;
