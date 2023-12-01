import { DashboardResultDatas } from "@/types/dashboardTypes";
import DashboardBarChart from "./DashboardBarChart";
import DashboardResultWrapper from "./DashboardResultWrapper";
import DashboardTextResult from "./DashboardTextResult";

interface IDashboardResultContainerProps {
  data?: DashboardResultDatas[];
}

const DashboardResultContainer = ({ data }: IDashboardResultContainerProps) => {
  return (
    <>
      {Array.isArray(data) ? (
        data?.map((item) => (
          <DashboardResultWrapper
            key={item.order}
            order={item.order}
            title={item.title}
          >
            {item.type === "select" ? (
              <DashboardBarChart
                key={item.order}
                answer={item.response}
                question={item.question}
                title={item.title}
              />
            ) : (
              <DashboardTextResult textResults={item.response} />
            )}
          </DashboardResultWrapper>
        ))
      ) : (
        <div className="flex h-[50vh] items-center justify-center bg-n-light-gray text-n-dark-gray">
          제출된 응답이 없습니다.
        </div>
      )}
    </>
  );
};

export default DashboardResultContainer;
