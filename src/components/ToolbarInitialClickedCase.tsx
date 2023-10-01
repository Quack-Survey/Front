import Image from "next/image";

interface IToolbarInitialClickedCaseProp {
  modeName: string; //initial | clicked
  onCreateText?: () => void; //[initial Mode]
  onCreateImage?: () => void;
  onCreateSection?: () => void;
  onFoldingAll?: () => void;
  onPreview?: () => void;
  onRandomize?: () => void; //[clicked Mode]
  onFolding?: () => void;
  onSettingQuater?: () => void;
}

const ToolbarInitialClickedCase = ({
  modeName,
  onCreateText,
  onCreateImage,
  onCreateSection,
  onFoldingAll,
  onPreview,
  onRandomize,
  onFolding,
  onSettingQuater,
}: IToolbarInitialClickedCaseProp): JSX.Element => {
  const imageNameInitial = ["fold", "preview", "section", "image", "text"];
  const toolPartInitial = [
    onFoldingAll,
    onPreview,
    onCreateSection,
    onCreateImage,
    onCreateText,
  ];
  const imageNameClicked = ["random", "fold", "quater"];
  const toolPartClicked = [onRandomize, onFolding, onSettingQuater];

  return (
    <div className="fixed bottom-[0px] flex h-[49px] w-full min-w-[360px] items-center justify-end gap-n-md bg-n-light-black p-n-md">
      {modeName === "initial" &&
      onCreateText &&
      onCreateImage &&
      onCreateSection &&
      onFoldingAll &&
      onPreview ? (
        <div className="flex items-center justify-end gap-n-md">
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
          {
            <div className="flex items-center justify-end gap-n-md">
              {modeName === "clicked" &&
              onRandomize &&
              onFolding &&
              onSettingQuater
                ? toolPartClicked.map((tool, index) => (
                    <button key={index} onClick={tool}>
                      <Image
                        priority
                        src={`/images/${imageNameClicked[index]}.svg`}
                        alt=""
                        width={24}
                        height={24}
                      ></Image>
                    </button>
                  ))
                : null}
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default ToolbarInitialClickedCase;
