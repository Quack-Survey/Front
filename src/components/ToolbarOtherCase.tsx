import Image from "next/image";

const ToolbarOtherCase = ({
  toolPart,
  modeName,
}: IToolbarOtherCaseProp): JSX.Element => {
  const imageNameInitial = ["fold", "preview", "section", "image", "text"];
  const toolPartInitial = [
    toolPart.onFoldingAll,
    toolPart.onPreview,
    toolPart.onCreateSection,
    toolPart.onCreateImage,
    toolPart.onCreateText,
  ];

  const imageNameClicked = ["random", "fold", "quater"];
  const toolPartClicked = [
    toolPart.onRandomize,
    toolPart.onFolding,
    toolPart.onSettingQuater,
  ];

  return (
    <div className="fixed bottom-[0px] flex justify-end gap-n-md items-center min-w-[360px] w-full h-[49px] bg-n-light-black p-n-md">
      {modeName === "initial" ? (
        <div>
          {toolPartInitial.map((tool, index) => (
            <button key={index} onClick={tool}>
              <Image
                priority
                src={`/images/${imageNameInitial[index]}.svg`}
                alt=""
                width={24}
                height={24}
              ></Image>
            </button>
          ))}
        </div>
      ) : (
        <div>
          {toolPartClicked.map((tool, index) => (
            <button key={index} onClick={tool}>
              <Image
                priority
                src={`/images/${imageNameClicked[index]}.svg`}
                alt=""
                width={24}
                height={24}
              ></Image>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToolbarOtherCase;
