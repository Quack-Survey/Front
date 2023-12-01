import { useQuery } from "@tanstack/react-query";
import { getFetch } from "@/utils/fetch/core";
import { DashboardResultDatas } from "@/types/dashboardTypes";

interface IQueryConfig {
  refetchOnWindowFocus: boolean;
  cacheTime?: number;
}

const useGetDashboardResult = (
  url: string,
  id?: string | string[],
  time?: number,
) => {
  const queryKey = ["dashboardResult", id];
  const queryConfig: IQueryConfig = {
    refetchOnWindowFocus: false,
  };

  if (time === 0 || time) {
    queryConfig.cacheTime = time;
  }

  const { data, isLoading, error, isFetching } = useQuery<
    DashboardResultDatas[]
  >(queryKey, () => getFetch(url), queryConfig);

  return {
    data,
    isLoading,
    error,
    isFetching,
  };
};

export { useGetDashboardResult };
