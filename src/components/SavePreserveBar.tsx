import { read } from "@/constants/mode";
import Image from "next/image";

interface ISavePreserveProps {
  modeName?: string; //initial | type | preview
  onOption?: () => void; //[initial Mode]
  onNavigateHome?: () => void;
  onSave?: () => void;
  onBackward?: () => void; //[type/preview Mode]
}

const SavePreserveBar = ({
  modeName,
  onOption,
  onNavigateHome,
  onSave,
  onBackward,
}: ISavePreserveProps): JSX.Element => {
  return (
    <div className="fixed top-0  h-[56px] w-full min-w-[360px] bg-n-light-black  p-n-md ">
      {modeName === read ? (
        <div className="flex   justify-between   text-n-white">
          <div className="flex gap-n-md">
            <button onClick={onOption} type="button">
              <Image
                priority
                src="/images/more.svg"
                alt=""
                width={24}
                height={24}
              ></Image>
            </button>
          </div>
          <div className="flex gap-n-md">
            <button onClick={onNavigateHome}>홈으로</button>
            <button onClick={onSave}>저장</button>
          </div>
        </div>
      ) : (
        <div>
          {(modeName === "type" || modeName === "preview") && onBackward ? (
            <div className="fixed top-0 flex h-[56px] w-full min-w-[360px] justify-between bg-n-light-black p-n-md text-n-white">
              <button onClick={onBackward}>
                <Image
                  priority
                  src="/images/backward.svg"
                  alt=""
                  width={24}
                  height={24}
                ></Image>
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SavePreserveBar;
// modeName === "initial" && onOption && onNavigateHome && onSave
