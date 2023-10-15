import Image from "next/image";

interface IToolbarTypeCaseProp {
  modeName: string; //type
  isQuater: boolean;
  onFocusUp: () => void;
  onFocusDown: () => void;
  onDuplicate?: () => void;
  onQuater?: () => void;
  onEnter?: () => void;
}

const ToolbarTypeCase = ({
  modeName,
  isQuater,
  onFocusUp,
  onFocusDown,
  onDuplicate,
  onQuater,
  onEnter,
}: IToolbarTypeCaseProp): JSX.Element => {
  const imageName = [
    "down",
    "up",
    "duplicate",
    `${isQuater ? "quater_b" : "quater"}`,
    "enter",
    "confirm",
  ];
  const toolPartLeft = [onFocusDown, onFocusUp, onDuplicate, onQuater];
  const toolPartRight = [onEnter];

  return (
    <>
      {modeName === "form" ? (
        <div className="fixed bottom-[0px] left-0 flex h-[49px] w-full min-w-[360px] justify-between bg-n-light-black px-n-md py-n-sm">
          <div className="flex items-center gap-n-sm">
            {toolPartLeft.map((tool, index) => (
              <button
                key={imageName[index]}
                type="button"
                onClick={tool}
                className="flex h-[34px] w-[34px] items-center justify-center rounded-[5px] bg-[#7f7f7f]"
              >
                <Image
                  priority
                  src={`/images/${imageName[index]}.svg`}
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-n-sm">
            <div className="mr-n-sm h-[30px] w-[1px] bg-n-dark-gray"></div>
            <button
              type="button"
              onClick={toolPartRight[0]}
              className="flex h-[34px] w-[34px] items-center justify-center rounded-[5px] bg-n-blue"
            >
              <Image
                priority
                src={`/images/${imageName[4]}.svg`}
                alt=""
                width={24}
                height={24}
              />
            </button>
            <button
              type="submit"
              className="flex h-[34px] w-[51px]  items-center justify-center rounded-[5px] bg-n-purple"
            >
              <Image
                priority
                src={`/images/${imageName[5]}.svg`}
                alt=""
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      ) : (
        <div className="fixed bottom-[0px] left-0 flex h-[49px] w-full min-w-[360px] justify-between bg-n-light-black px-n-md py-n-sm">
          <div className="flex items-center gap-n-sm">
            {toolPartLeft
              .slice(0, toolPartLeft.length - 2)
              .map((tool, index) => (
                <button
                  key={imageName[index]}
                  type="button"
                  onClick={tool}
                  className="flex h-[34px] w-[34px] items-center justify-center rounded-[5px] bg-[#7f7f7f]"
                >
                  <Image
                    priority
                    src={`/images/${imageName[index]}.svg`}
                    alt=""
                    width={24}
                    height={24}
                  />
                </button>
              ))}
          </div>
          <div className="flex items-center gap-n-sm">
            <div className="mr-n-sm h-[30px] w-[1px] bg-n-dark-gray"></div>
            <button
              type="submit"
              className="flex h-[34px] w-[51px]  items-center justify-center rounded-[5px] bg-n-purple"
            >
              <Image
                priority
                src={`/images/${imageName[5]}.svg`}
                alt=""
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ToolbarTypeCase;
