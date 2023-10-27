import GlobalNavigation from "@/components/GlobalNavigation";
import LogoBar from "@/components/LogoBar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <>
      <LogoBar modeName="light" />
      <div className="my-[56px]">{children}</div>
      <GlobalNavigation />
    </>
  );
};

export default layout;
