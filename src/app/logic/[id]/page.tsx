"use client";

import { NextPage } from "next";
import NextPreviousButton from "@/components/NextPreviousButton";
import Image from "next/image";

const Logic: NextPage = (): JSX.Element => {
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
            <Image src="/images/type.svg" alt="" height={18} width={18} />
          </div>
          <div className="h-1 w-full bg-n-light-gray"></div>
        </div>
        <div className="flex w-full items-center">
          <div className="flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full bg-n-light-gray p-1.5">
            <Image src="/images/check.svg" alt="" height={18} width={18} />
          </div>
          <div className="h-1 w-full bg-n-light-gray"></div>
        </div>
        <div className="flex items-center">
          <div className="flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full bg-n-light-gray p-1.5">
            <Image src="/images/link.svg" alt="" height={18} width={18} />
          </div>
        </div>
      </div>
      <p className="text-center text-n-xl font-bold">
        적용할 로직 타입을 선택하세요
      </p>
      <div className="m-n-lg flex justify-center gap-n-md">
        <div className="flex h-[145px] w-[145px] cursor-pointer items-center justify-center border border-n-gray bg-n-white">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/images/up.svg"
              priority
              width={45}
              height={45}
              alt=""
            />
            이동로직
          </div>
        </div>
        <div className="flex h-[145px] w-[145px] cursor-pointer items-center justify-center border border-n-gray bg-n-light-gray">
          <div className="flex flex-col items-center justify-center text-n-gray">
            <Image
              src="/images/filter_black.svg"
              priority
              width={45}
              height={45}
              alt=""
            />
            필터로직
          </div>
        </div>
      </div>
      <NextPreviousButton
        modeName={"single"}
        buttonText={["다음"]}
        onClick={() => {}}
      />
    </div>
  );
};

export default Logic;
