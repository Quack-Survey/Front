import React from "react";
import DashboardLineChart from "./DashboardLineChart";

interface IDashboardCountContainerProps {
  resultCount?: [string, number][] | null;
  deadLine: string | null;
}

const DashboardCountContainer = ({
  resultCount,
  deadLine,
}: IDashboardCountContainerProps) => {
  const isEnd = deadLine ? Date.parse(deadLine) < Date.now() : false;

  return (
    <div className="border-b border-n-light-gray pb-n-xl">
      <div className="mb-n-md flex items-baseline justify-between">
        <span>일별 응답수 현황</span>
        <span
          className={`text-n-xs ${
            isEnd
              ? "rounded-md bg-n-dark-gray px-[5px] py-[1px] text-n-white"
              : ""
          }`}
        >
          {isEnd ? "설문종료" : new Date(Date.now()).toLocaleString()}
        </span>
      </div>
      {resultCount ? (
        <div>
          <DashboardLineChart resultCount={resultCount} />
        </div>
      ) : (
        <div className="flex h-[160px] items-center justify-center bg-n-light-gray text-n-dark-gray">
          제출된 응답이 없습니다.
        </div>
      )}
    </div>
  );
};

export default DashboardCountContainer;
