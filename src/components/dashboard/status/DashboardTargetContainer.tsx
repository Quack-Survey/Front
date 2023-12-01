import React from "react";
import DashboardDoughnutChart from "./DashboardDoughnutChart";

interface IDashboardTargetContainerProps {
  currenrResponseRatio: number;
  prevResponseRatio: number;
  targetCount: number;
  currenrResponseCount: number;
}

const DashboardTargetContainer = ({
  currenrResponseRatio,
  prevResponseRatio,
  targetCount,
  currenrResponseCount,
}: IDashboardTargetContainerProps) => {
  return (
    <div className="border-b border-n-light-gray pb-n-xl">
      <div className="mb-n-md flex">
        <span>전체 응답 현황</span>
      </div>
      {targetCount ? (
        <div className="flex px-n-2xl">
          <div className="basis-[40%]">
            <DashboardDoughnutChart
              targetRatio={currenrResponseRatio}
              increaseRate={currenrResponseRatio - prevResponseRatio}
            />
          </div>
          <div className="flex basis-[60%] flex-col justify-center gap-n-md">
            <div className="flex justify-between">
              <span>목표 응답수</span>
              <span>{targetCount} 명</span>
            </div>
            <div className="flex justify-between">
              <span>누적 응답수</span>
              <span>{currenrResponseCount} 명</span>
            </div>
            <div className="flex justify-between">
              <span>잔여 응답수</span>
              <span>
                {targetCount - currenrResponseCount < 0
                  ? 0
                  : targetCount - currenrResponseCount}{" "}
                명
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-[160px] items-center justify-center bg-n-light-gray text-n-dark-gray">
          목표 응답수를 설정해주세요.
        </div>
      )}
    </div>
  );
};

export default DashboardTargetContainer;
