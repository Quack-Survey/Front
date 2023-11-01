import { read } from "@/constants/mode";
import Image from "next/image";

interface ISavePreserveProps {
  modeName: string;
  onOption: () => void;
  onNavigateHome: () => void;
  onSave: () => void;
}

const SavePreserveBar = ({
  modeName,
  onOption,
  onNavigateHome,
  onSave,
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
              />
            </button>
          </div>
          <div className="flex gap-n-md">
            <button onClick={onNavigateHome}>홈으로</button>
            <button onClick={onSave}>저장</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SavePreserveBar;
