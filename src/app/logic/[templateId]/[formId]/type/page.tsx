"use client";

import { useState } from "react";
import { NextPage } from "next";
import NextPreviousButton from "@/components/NextPreviousButton";
import Image from "next/image";

const SettingLogicType: NextPage = (): JSX.Element => {
  const [logicToggle, setLogicToggle] = useState({
    moving: false,
    filter: false,
  });

  const handleLogicToggle = (type: string) => {
    if (type === "moving") {
      setLogicToggle((prev) => {
        return { ...prev, moving: !prev.moving, filter: prev.moving };
      });
    } else {
      setLogicToggle((prev) => {
        return { ...prev, filter: !prev.filter, moving: prev.filter };
      });
    }
  };

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
        <button
          className={`flex h-[145px] w-[145px] cursor-pointer items-center justify-center border border-n-gray ${
            logicToggle.moving
              ? "bg-n-light-gray text-n-gray"
              : "bg-white text-black"
          } `}
          onClick={() => handleLogicToggle("moving")}
        >
          <div className="flex flex-col items-center justify-center">
            <Image
              src={`/images/moving_${logicToggle.moving ? "g" : "b"}.svg`}
              priority
              width={45}
              height={45}
              alt=""
            />
            이동로직
          </div>
        </button>
        <button
          className={`flex h-[145px] w-[145px] cursor-pointer items-center justify-center border border-n-gray  ${
            logicToggle.filter
              ? "bg-n-light-gray text-n-gray"
              : "bg-white text-black"
          }`}
          onClick={() => handleLogicToggle("filter")}
        >
          <div className="flex flex-col items-center justify-center ">
            <Image
              src={`/images/filter_${logicToggle.filter ? "g" : "b"}.svg`}
              priority
              width={45}
              height={45}
              alt=""
            />
            필터로직
          </div>
        </button>
      </div>
      <NextPreviousButton
        modeName={"single"}
        buttonText={["다음"]}
        onClick={() => {}}
      />
    </div>
  );
};

export default SettingLogicType;
