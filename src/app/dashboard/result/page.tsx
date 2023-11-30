"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { useSearchParams } from "next/navigation";
import { useGetDashboardResult } from "@/hooks/queries/useGetDashboardResult";
import DashboardContainer from "@/components/dashboard/common/DashboardContainer";
import DashboardToolbar from "@/components/dashboard/result/DashboardToolbar";
import DashboardResultContainer from "@/components/dashboard/result/DashboardResultContainer";

const DashboardResult = (): JSX.Element => {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("templateId");
  const { data, isFetching } = useGetDashboardResult(
    `/complete/dashboard?templateId=${templateId}`,
    templateId ? templateId : "",
  );

  if (isFetching) return <LoadingSpinner />;

  return (
    <DashboardContainer>
      <>
        {templateId ? (
          <DashboardResultContainer data={data} />
        ) : (
          <div className="flex h-[50vh] items-center justify-center bg-n-light-gray text-n-dark-gray">
            상단 버튼을 눌러 템플릿을 선택해주세요.
          </div>
        )}
        <DashboardToolbar />
      </>
    </DashboardContainer>
  );
};

export default DashboardResult;
