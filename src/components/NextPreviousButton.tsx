interface INextPreviousButtonProps {
  modeName: string; //single | double
  buttonText: string[];
  onClick?: () => void; //[single Mode]
  onLeftClick?: () => void; //[double Mode]
  onRightClick?: () => void;
}

const NextPreviousButton = ({
  modeName,
  buttonText,
  onClick,
  onLeftClick,
  onRightClick,
}: INextPreviousButtonProps): JSX.Element => {
  return (
    <div>
      {modeName === "single" && onClick ? (
        <div className="fixed bottom-0 flex h-[56px] w-full min-w-[360px] text-center leading-[56px] text-n-white">
          <button
            className="h-full w-full min-w-[181px] bg-n-blue text-center text-n-xl leading-[56px] text-[white]"
            onClick={onClick}
          >
            {buttonText[0]}
          </button>
        </div>
      ) : (
        <div>
          {modeName === "double" && onLeftClick && onRightClick ? (
            <div className="fixed bottom-0 flex h-[56px] w-full min-w-[360px] text-center leading-[56px] text-n-white">
              <button
                className="h-full w-[50%] min-w-[181px] border border-solid border-n-gray bg-n-white text-center text-n-xl leading-[56px] text-n-dark-gray"
                onClick={onLeftClick}
              >
                {buttonText[0]}
              </button>
              <button
                className="h-full w-[50%] min-w-[181px] bg-n-blue text-center text-n-xl leading-[56px] text-[white]"
                onClick={onRightClick}
              >
                {buttonText[1]}
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
