"use client";

import { NextPage } from "next";
import NextPreviousButton from "@/components/NextPreviousButton";
import Image from "next/image";

const SettingLogicSelect: NextPage = (): JSX.Element => {
  return (
    <div>
      <div className="fixed top-0 flex h-[56px] w-full min-w-[360px] items-center justify-center border-b border-solid border-n-light-gray bg-n-white">
        <div className="flex gap-n-sm">
          본 세션의 팀 프로그램에 참여하시겠습니까?
        </div>
      </div>
      <div className="m-auto mt-[56px] flex h-[100px] w-[250px]">
        <div className="flex w-full items-center">
          <div className="flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full bg-n-light-black p-1.5">
            <Image src="/images/type.svg" alt="" height={18} width={18}></Image>
          </div>
          <div className="h-1 w-full bg-n-light-black"></div>
        </div>
        <div className="flex w-full items-center">
          <div className="flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full bg-n-light-black p-1.5">
            <Image
              src="/images/check.svg"
              alt=""
              height={18}
              width={18}
            ></Image>
          </div>
          <div className="h-1 w-full bg-n-light-gray"></div>
        </div>
        <div className="flex items-center">
          <div className="flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full bg-n-light-gray p-1.5">
            <Image src="/images/link.svg" alt="" height={18} width={18}></Image>
          </div>
        </div>
      </div>
      <NextPreviousButton
        modeName={"double"}
        buttonText={["이전", "다음"]}
        onLeftClick={() => {}}
        onRightClick={() => {}}
      ></NextPreviousButton>
      <p className="text-center text-n-xl font-bold">
        로직 적용할 항목을 선택하세요
      </p>
      <div className="m-n-lg flex flex-col gap-n-sm">
        <div className="h-[42px] w-full rounded-n-md border border-n-gray p-n-sm">
          예
        </div>
        <div className="h-[42px] w-full rounded-n-md border border-n-gray bg-n-light-gray p-n-sm text-n-gray">
          아니오
        </div>
        <div className="h-[42px] w-full rounded-n-md border border-n-gray bg-n-light-gray p-n-sm text-n-gray">
          모르겠음
        </div>
      </div>
    </div>
  );
};

export default SettingLogicSelect;
