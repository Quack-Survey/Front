import { useQueries } from "@tanstack/react-query";
import { getFetch } from "@/utils/fetch/core";
import { DashboardStatusDatas } from "@/types/dashboardTypes";
import { UseQueryOptions } from "react-query";

interface IQueryConfig {
  refetchOnWindowFocus: boolean;
  cacheTime?: number;
}

const useGetDashboardStatus = (
  url: string | null,
  id?: string | string[],
  time?: number,
) => {
  const queryKey = ["dashboardStatus", id];
  const queryConfig: IQueryConfig = {
    refetchOnWindowFocus: false,
  };

  if (time === 0 || time) {
    queryConfig.cacheTime = time;
  }

  // const { data, isLoading, error, isFetching } = useQuery<
  //   DashboardStatusDatas[]
  // >(["dashboardStatus", () => getFetch(url)], queryConfig);

  const result = useQueries({
    queries: [
      {
        queryKey: ["dashboardStatus", id],
        queryFn: () => getFetch(`/complete?templateId=${url}`),
      },
      {
        queryKey: ["dashboardStatus1", id],
        queryFn: () => getFetch(`/template/one?templateId=${url}`),
      },
    ],
  });

  const data = result.reduce((acc, cur) => {
    if (Array.isArray(cur.data)) acc = { ...acc, complateData: cur.data };
    else acc = { ...acc, templeteData: cur.data };

    return acc;
  }, {}) as DashboardStatusDatas;

  const error = result.some((result) => result.error);
  const isLoading = result.some((result) => result.isLoading);
  const isFetching = result.some((result) => result.isFetching);

  return {
    data,
    isLoading,
    error,
    isFetching,
  };
};

export { useGetDashboardStatus };
