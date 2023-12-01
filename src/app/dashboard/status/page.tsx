"use client";

import { useSearchParams } from "next/navigation";
import { useGetDashboardStatus } from "@/hooks/queries/useGetDashboardStatus";
import { getPrevResponseCount, getResultCount } from "@/utils/dashboard";
import LoadingSpinner from "@/components/LoadingSpinner";
import DashboardContainer from "@/components/dashboard/common/DashboardContainer";
import DashboardTargetContainer from "@/components/dashboard/status/DashboardTargetContainer";
import DashboardCountContainer from "@/components/dashboard/status/DashboardCountContainer";

const DashboardStatus = (): JSX.Element => {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("templateId");
  const { data, isFetching } = useGetDashboardStatus(
    templateId,
    templateId ? templateId : "",
  );

  if (isFetching) return <LoadingSpinner />;

  const complateData = data.complateData;
  const templeteData = data.templeteData;
  const targetCount = templeteData.targetNumber;
  const deadLine = templeteData.deadline;
  const currenrResponseCount = complateData.length;
  const prevResponseCount = getPrevResponseCount(complateData).length;
  const resultCount = getResultCount(complateData, deadLine);
  const currenrResponseRatio = (currenrResponseCount / targetCount) * 100;
  const prevResponseRatio = (prevResponseCount / targetCount) * 100;

  return (
    <DashboardContainer>
      <>
        {templateId ? (
          <>
            <DashboardCountContainer
              resultCount={resultCount}
              deadLine={deadLine}
            />
            <DashboardTargetContainer
              currenrResponseCount={currenrResponseCount}
              prevResponseRatio={prevResponseRatio}
              currenrResponseRatio={currenrResponseRatio}
              targetCount={targetCount}
            />
          </>
        ) : (
          <div className="flex h-[50vh] items-center justify-center bg-n-light-gray text-n-dark-gray">
            상단 버튼을 눌러 템플릿을 선택해주세요.
          </div>
        )}
      </>
    </DashboardContainer>
  );
};

export default DashboardStatus;
