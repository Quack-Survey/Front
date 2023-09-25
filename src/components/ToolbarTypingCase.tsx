import Image from "next/image";

interface IToolbarTypeCaseProp {
  modeName: string; //type
  onFocusUp: () => void;
  onFocusDown: () => void;
  onDuplicate: () => void;
  onConfirm: () => void;
  onEnter: () => void;
}

const ToolbarTypeCase = ({
  modeName,
  onFocusUp,
  onFocusDown,
  onDuplicate,
  onConfirm,
  onEnter,
}: IToolbarTypeCaseProp): JSX.Element => {
  const imageName = ["duplicate_white", "down", "up", "enter", "confirm"];
  const toolPartLeft = [onDuplicate, onFocusDown, onFocusUp];
  const toolPartRight = [onEnter, onConfirm];
  return (
    <div>
      {modeName === "type" ? (
        <div className="fixed bottom-[0px] flex h-[49px] w-full min-w-[360px] justify-between bg-n-light-black px-n-md py-n-sm">
          <div className="flex items-center gap-n-sm">
            {toolPartLeft.map((tool, index) => (
              <button
                key={index}
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
              onClick={toolPartRight[0]}
              className="flex h-[34px] w-[34px] items-center justify-center rounded-[5px] bg-n-blue"
            >
              <Image
                priority
                src={`/images/${imageName[3]}.svg`}
                alt=""
                width={24}
                height={24}
              />
            </button>
            <button
              onClick={toolPartRight[1]}
              className="flex h-[34px] w-[51px]  items-center justify-center rounded-[5px] bg-n-purple"
            >
              <Image
                priority
                src={`/images/${imageName[4]}.svg`}
                alt=""
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ToolbarTypeCase;