import GlobalNavigation from "@/components/GlobalNavigation";
import DashboardNavigation from "@/components/dashboard/common/DashboardNavigation";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <>
      <DashboardNavigation />
      <div className="m-auto mb-[48px] mt-[93px] max-w-[768px]">{children}</div>
      <GlobalNavigation />
    </>
  );
};

export default layout;
