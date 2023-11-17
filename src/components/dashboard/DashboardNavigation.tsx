"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import InputModal from "../InputModal";

const DashboardNavigation = (): JSX.Element => {
  const [route, setRoute] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onCancel = () => setIsOpen(false);
  const onSubmit = (events: any) => {};

  return (
    <div>
      <div className="justify-items-between fixed top-0 flex h-[93px] w-full flex-col items-center justify-between border-[1px] border-b border-b-n-gray bg-n-light-gray">
        <div
          onClick={() => {
            setIsOpen(true);
          }}
          className="mt-n-sm flex items-center gap-n-sm text-center text-n-xs"
        >
          <Image
            priority
            src={"/images/down_black.svg"}
            alt=""
            height={18}
            width={18}
          ></Image>
          템플릿이름이 표시됩니다
        </div>
        <div className="flex">
          <Link
            href="/dashboard/status"
            onClick={() => {
              setRoute(1);
            }}
            className={
              route === 1
                ? "h-[35px] w-[100px] border-b-[5px] border-n-light-black text-center text-n-md text-n-light-black"
                : "h-[35px] w-[100px] text-center text-n-md text-n-light-black"
            }
          >
            응답현황
          </Link>
          <Link
            href="/dashboard/result"
            onClick={() => {
              setRoute(2);
            }}
            className={
              route === 2
                ? "h-[35px] w-[100px] border-b-[5px] border-n-light-black text-center text-n-md text-n-light-black"
                : "h-[35px] w-[100px] text-center text-n-md text-n-light-black"
            }
          >
            설문결과
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavigation;
