import { DashboardStatusDatas } from "@/types/dashboardTypes";

const getResultCount = (
  data?: DashboardStatusDatas["complateData"],
  deadLine?: string | null,
) => {
  if (!data?.length) return null;

  const currentDate =
    deadLine && new Date(deadLine) < new Date(Date.now())
      ? new Date(deadLine).toDateString()
      : new Date(Date.now()).toDateString();

  const resultCount = data?.reduce((acc: { [index: string]: number }, cur) => {
    const date = new Date(cur.createdAt);
    const key = `${date.getFullYear()}. ${
      date.getMonth() + 1
    }. ${date.getDate()}.`;

    if (acc[key]) acc[key] = ++acc[key];
    else acc[key] = acc[key] = 1;

    return acc;
  }, {});

  const resultCountArray: [string, number][] = [...Array(7)].map((_, index) => {
    const currentMilli = Date.parse(currentDate);
    const date = new Date(currentMilli - 86400000 * index);
    const key = `${date.getFullYear()}. ${
      date.getMonth() + 1
    }. ${date.getDate()}.`;

    if (resultCount) return [key, resultCount[key] ? resultCount[key] : 0];
    else return [key, 0];
  });

  // const sortedResultCount = resultCountArray.sort((a, b) => {
  //   console.log(b[0], a[0]);
  //   return Date.parse(a[0]) - Date.parse(b[0]);
  // });

  const sortedResultCount = resultCountArray.reverse();

  return sortedResultCount;
};

const getPrevResponseCount = (data?: DashboardStatusDatas["complateData"]) => {
  if (!data?.length) return [];

  return data.filter((item) => {
    const currentDate = Date.parse(new Date(Date.now()).toLocaleDateString());
    const date = Date.parse(new Date(item.createdAt).toLocaleDateString());

    return date < currentDate;
  });
};

export { getResultCount, getPrevResponseCount };
