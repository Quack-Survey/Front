import Image from "next/image";

const ToolbarTypeCase = ({ toolPart }: IToolbarTypeCaseProp): JSX.Element => {
  const imageName = ["duplicate_white", "down", "up", "enter", "confirm"];
  const toolPartLeft = [
    toolPart.onDuplicate,
    toolPart.onFocusDown,
    toolPart.onFocusUp,
  ];
  const toolPartRight = [toolPart.onEnter, toolPart.onConfirm];
  return (
    <div>
      <div className="fixed bottom-[0px] flex justify-between min-w-[360px] w-full h-[49px] bg-n-light-black py-n-sm px-n-md">
        <div className="flex items-center gap-n-sm">
          {toolPartLeft.map((tool, index) => (
            <button
              key={index}
              onClick={tool}
              className="flex justify-center items-center w-[34px] h-[34px] bg-[#7f7f7f] rounded-[5px]"
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
          <div className="w-[1px] h-[30px] bg-n-dark-gray mr-n-sm"></div>
          <button
            onClick={toolPartRight[0]}
            className="flex justify-center items-center w-[34px] h-[34px] bg-n-blue rounded-[5px]"
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
            className="flex justify-center items-center  w-[51px] h-[34px] bg-n-purple rounded-[5px]"
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
    </div>
  );
};

export default ToolbarTypeCase;
