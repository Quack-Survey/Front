"use client";
import NextPreviousButton from "@/components/NextPreviousButton";
import Image from "next/image";

const LogicHome = (): JSX.Element => {
  return (
    <div>
      <div className="fixed top-0 flex w-full min-w-[360px] flex-col items-center justify-center border-b border-solid border-n-light-gray bg-n-black p-n-md text-n-white">
        <div className="flex h-[48px] gap-n-sm">
          본 세션의 팀 프로그램에 참여하시겠습니까?
        </div>
        <div className="flex w-full items-center justify-start gap-n-sm">
          <div className=" h-[47px] w-[47px] rounded-md bg-n-blue">
            <div className="flex justify-end pr-[3px] pt-[3px]">
              <Image
                src="/images/delete.svg"
                alt=""
                width={13}
                height={13}
              ></Image>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/images/logic.svg"
                alt=""
                width={25}
                height={25}
              ></Image>
            </div>
          </div>
          <div className=" h-[47px] w-[47px] rounded-md bg-n-gray">
            <div className="flex justify-end pr-[3px] pt-[3px]">
              <Image
                src="/images/delete.svg"
                alt=""
                width={13}
                height={13}
              ></Image>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/images/logic.svg"
                alt=""
                width={25}
                height={25}
              ></Image>
            </div>
          </div>
        </div>
      </div>
      <NextPreviousButton
        modeName={"double"}
        buttonText={["취소", "저장"]}
        onLeftClick={() => {}}
        onRightClick={() => {}}
      ></NextPreviousButton>
      <div className="mt-[128px] flex h-full min-h-[445px] flex-col gap-n-sm bg-n-light-gray">
        <div className="flex h-[63px] w-full bg-n-white">
          <div className="h-full w-[53px] text-center text-n-xl font-bold leading-[63px]">
            1
          </div>
          <div className="flex w-full flex-col ">
            <div className="h-[26px] w-auto text-n-xs leading-[26px]">예</div>
            <div className="flex h-[37px] items-center gap-n-md">
              <div className="flex gap-n-xs text-n-md text-n-blue">
                <Image
                  src="/images/link_blue.svg"
                  alt=""
                  height={20}
                  width={20}
                />
                3
              </div>
              <div className="flex gap-n-xs text-n-md text-n-black">
                <Image
                  src="/images/link_black.svg"
                  alt=""
                  height={20}
                  width={20}
                />
                -
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-[63px] w-full bg-n-white">
          <div className="h-full w-[53px] text-center text-n-xl font-bold leading-[63px]">
            2
          </div>
          <div className="flex w-full flex-col ">
            <div className="h-[26px] w-auto text-n-xs leading-[26px]">
              아니오
            </div>
            <div className="flex h-[37px] items-center gap-n-md">
              <div className="flex gap-n-xs text-n-md text-n-blue">
                <Image
                  src="/images/link_blue.svg"
                  alt=""
                  height={20}
                  width={20}
                />
                -
              </div>
              <div className="flex gap-n-xs text-n-md text-n-black">
                <Image
                  src="/images/link_black.svg"
                  alt=""
                  height={20}
                  width={20}
                />
                5
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogicHome;
