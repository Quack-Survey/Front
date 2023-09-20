"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const GlobalNavigation = (): JSX.Element => {
  const [route, setRoute] = useState<number>(2);

  return (
    <nav>
      <div
        className={
          "fixed bottom-0 min-w-[360px] w-full h-[48px] bg-n-blue text-n-white"
        }
      >
        <div className="flex w-[360px] h-[48px] m-auto">
          <Link
            href="#"
            onClick={() => {
              setRoute(1);
            }}
            className={
              route === 1
                ? "flex items-center justify-center w-[120px] opacity-100 box-border border-b-[5px] border-n-white"
                : "flex items-center justify-center w-[120px] opacity-20"
            }
          >
            <Image
              priority
              src="images/대쉬보드.svg"
              alt=""
              width={24}
              height={24}
            />
          </Link>
          <Link
            href="#"
            onClick={() => {
              setRoute(2);
            }}
            className={
              route === 2
                ? "flex items-center justify-center w-[120px] opacity-100 box-border border-b-[5px] border-n-white"
                : "flex items-center justify-center w-[120px] opacity-20"
            }
          >
            <Image priority src="images/홈.svg" alt="" width={24} height={24} />
          </Link>
          <Link
            href="#"
            onClick={() => {
              setRoute(3);
            }}
            className={
              route === 3
                ? "flex items-center justify-center w-[120px] opacity-100 box-border border-b-[5px] border-n-white"
                : "flex items-center justify-center w-[120px] opacity-20"
            }
          >
            <Image
              priority
              src="images/마이페이지.svg"
              alt=""
              width={24}
              height={24}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default GlobalNavigation;
