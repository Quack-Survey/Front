"use client";
import Image from "next/image";
import DashboardVerticalGraph from "@/components/dashboard/result/DashboardVerticalGraph";
const CurrentTemplate = (): JSX.Element => {
  return (
    <div>
      <div className="h-[167px] w-[326px]">
        <DashboardVerticalGraph
          graphData={[1, 2, 3]}
          graphLabels={["안녕하ff세요fdsfdfd", "525", "@4"]}
        ></DashboardVerticalGraph>
      </div>
    </div>
  );
};

export default CurrentTemplate;
