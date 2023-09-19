import Image from "next/image";

interface IToolbarTopProps {
  onBackward: () => void;
  onOption: () => void;
  onWorkstorage: () => void;
  onTempsave: () => void;
  onSave: () => void;
}

const ToolbarTop = ({
  onBackward,
  onOption,
  onWorkstorage,
  onTempsave,
  onSave,
}: IToolbarTopProps): JSX.Element => {
  return (
    <div>
      <div className="flex justify-between fixed top-0 min-w-[360px] w-full h-[56px] bg-n-light-black text-n-white p-n-md">
        <div className="flex gap-n-md">
          <button onClick={onBackward}>
            <Image
              priority
              src="./images/뒤로가기.svg"
              alt=""
              width={24}
              height={24}
            ></Image>
          </button>
          <button onClick={onOption}>
            <Image
              priority
              src="./images/옵션.svg"
              alt=""
              width={24}
              height={24}
            ></Image>
          </button>
          <button onClick={onWorkstorage}>
            <Image
              priority
              src="./images/보관함.svg"
              alt=""
              width={24}
              height={24}
            ></Image>
          </button>
        </div>
        <div className="flex gap-n-md">
          <button onClick={onTempsave}>임시저장</button>
          <button onClick={onSave}>저장</button>
        </div>
      </div>
    </div>
  );
};

export default ToolbarTop;
