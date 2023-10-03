import Image from "next/image";

interface IFormContentSelectProps {}

const FormContentSelect = ({}: IFormContentSelectProps): JSX.Element => {
  return (
    <div className="w-full space-y-n-sm pb-n-md ">
      {[1, 2, 4, 5].map((a, i) => {
        return (
          <div
            className="h-n-xlg flex w-[85%] items-center  rounded-n-sm bg-n-light-gray "
            key={i}
          >
            <Image
              className="cursor-pointer"
              src="/images/dragging.svg"
              width={20}
              height={24}
              alt=""
              priority
            />
            <div className="w-[90%]">
              <input
                className="mx-n-sm w-full shrink-0 bg-inherit text-n-sm outline-none"
                type="text"
                placeholder="보기를 작성해주세요"
                maxLength={18}
              />
            </div>
            <Image
              className="mx-n-sm cursor-pointer"
              src="/images/delete.svg"
              width={20}
              height={24}
              alt=""
              priority
            />
          </div>
        );
      })}
      <div className="h-n-xlg flex w-[85%] cursor-pointer items-center  justify-center rounded-n-sm bg-n-light-gray">
        <Image src="/images/plus.svg" width={24} height={24} alt="" priority />
      </div>
    </div>
  );
};

export default FormContentSelect;
