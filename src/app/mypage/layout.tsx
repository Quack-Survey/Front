import GlobalNavigation from "@/components/GlobalNavigation";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <>
      <div className="fixed top-0 z-50 flex h-[56px] w-full min-w-[360px] items-center justify-center border-b border-solid border-n-gray bg-n-light-gray">
        <div className="text-n-lg text-n-light-black">마이페이지</div>
      </div>
      <div className="mb-[48px] mt-[56px]">{children}</div>
      <GlobalNavigation />
    </>
  );
};

export default layout;
