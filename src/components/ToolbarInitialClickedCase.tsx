import { read } from "@/constants/mode";
import Image from "next/image";

interface IToolbarInitialClickedCaseProp {
  modeName?: string;
  foldMode?: boolean;
  isOpen?: boolean;
  onFoldingAll?: () => void;
}

const ToolbarInitialClickedCase = ({
  modeName,
  foldMode,
  onFoldingAll,
  isOpen,
}: IToolbarInitialClickedCaseProp): JSX.Element => {
  const imageNameInitial = ["fold"];
  const toolPartInitial = [onFoldingAll];

  return (
    <div
      className={`fixed bottom-[0px] flex h-[49px] w-full min-w-[360px] items-center justify-end gap-n-md bg-n-light-black p-n-md ${
        isOpen ? "-z-10" : ""
      }`}
    >
      <div className="flex items-center justify-end gap-n-md">
        {modeName === read
          ? toolPartInitial.map((tool, index) => (
              <button key={index} type="button" onClick={tool}>
                <Image
                  priority
                  src={
                    foldMode
                      ? `/images/${imageNameInitial[index]}_b.svg`
                      : `/images/${imageNameInitial[index]}.svg`
                  }
                  alt=""
                  width={24}
                  height={24}
                ></Image>
              </button>
            ))
          : null}
      </div>
    </div>
  );
};

export default ToolbarInitialClickedCase;
