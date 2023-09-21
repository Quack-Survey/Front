import Image from "next/image";
import FormContentInput from "./FormContentInput";
import FormTitle from "./FormTitle";

const FormWrapper = () => {
  const modeName = "initial";

  return (
    <>
      {modeName === "initial" ? (
        <div className="flex-col w-[360px] h-full border-l-[8px] border-n-dark-gray">
          <div className="ml-n-sm pt-n-sm pb-n-xlg">
            <FormTitle />
            <FormContentInput />
          </div>
        </div>
      ) : (
        <div>
          <div className="flex w-[360px] h-full border-l-[8px] border-n-light-blue">
            <div className="flex pt-[12px] h-full w-n-2xl justify-center text-n-2xl font-bold text-n-light-blue">
              {1}
            </div>
            <div>
              <div className="py-n-md text-n-black text-n-lg font-bold">
                <input
                  className="border-b-[1px] border-n-gray outline-none"
                  value="안녕하세요"
                />
              </div>
              <div className="flex flex-col gap-n-xs">
                <div className="flex items-center w-[273px] min-h-[28px] py-n-xs bg-n-light-gray rounded-n-sm text-n-sm">
                  <div className="flex justify-center items-center w-n-lg h-full">
                    <Image
                      priority
                      src="/images/드래깅.svg"
                      alt=""
                      width={18}
                      height={18}
                    />
                  </div>
                  <div className="w-[230px]">{"1시간에 1번씩"}</div>
                  <div className="flex justify-center items-center w-[25px]">
                    <Image
                      priority
                      src="/images/삭제.svg"
                      alt=""
                      width={18}
                      height={18}
                    />
                  </div>
                </div>
                <div className="flex w-[273px] min-h-[28px] py-n-xs bg-n-light-gray rounded-n-sm text-n-sm">
                  <button className="w-full h-full flex justify-center items-center">
                    <Image
                      priority
                      src="/images/플러스.svg"
                      alt=""
                      width={18}
                      height={18}
                    />
                  </button>
                </div>
              </div>
              <div className="w-[273px] h-n-2xl bg-n-white"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormWrapper;

{
  /* <div className="flex pt-[12px] h-full w-n-2xl justify-center text-n-2xl font-bold text-n-gray">
              {1}
            </div>
            <div>
              <div className="py-n-md text-n-black text-n-lg font-bold">
                {"안녕하세요"}
              </div>
              <div className="flex w-[273px] min-h-[28px] py-n-xs bg-n-light-gray rounded-n-sm text-n-sm">
                <div className="flex justify-center items-center w-n-lg h-full"></div>
                {"1시간에 1번씩"}
              </div>
              <div className="w-[273px] h-n-2xl bg-n-white"></div>
            </div> */
}
