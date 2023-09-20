import Image from "next/image";

//props 넘겨서 경우에 따라 표출되도록 설정
const SavePreserveBar = ({
  isTyping,
  toolPart,
}: ISavePreserveProps): JSX.Element => {
  return (
    <div>
      {isTyping ? (
        <div className="flex justify-between fixed top-0 min-w-[360px] w-full h-[56px] bg-n-light-black text-n-white p-n-md"></div>
      ) : (
        <div className="flex justify-between fixed top-0 min-w-[360px] w-full h-[56px] bg-n-light-black text-n-white p-n-md">
          <div className="flex gap-n-md">
            <button onClick={toolPart?.onBackward}>
              <Image
                priority
                src="./images/뒤로가기.svg"
                alt=""
                width={24}
                height={24}
              ></Image>
            </button>
            <button onClick={toolPart?.onOption}>
              <Image
                priority
                src="./images/옵션.svg"
                alt=""
                width={24}
                height={24}
              ></Image>
            </button>
            <button onClick={toolPart?.onWorkstorage}>
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
            <button onClick={toolPart?.onLocalsave}>임시저장</button>
            <button onClick={toolPart?.onSave}>저장</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavePreserveBar;
