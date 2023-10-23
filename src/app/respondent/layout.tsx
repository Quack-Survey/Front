import LogoBar from "@/components/LogoBar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className="m-auto w-[360px] border-[1px] border-black bg-gray-200">
      {/* TODO: LogoBar fixed 문의 */}
      <LogoBar modeName="dark"></LogoBar>
      <div>{children}</div>
    </div>
  );
};

export default layout;
