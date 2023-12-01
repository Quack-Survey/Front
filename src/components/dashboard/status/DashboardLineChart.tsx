import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface IDashboardLineChart {
  resultCount?: [index: string, number][] | null;
}

const DashboardLineChart = ({ resultCount }: IDashboardLineChart) => {
  const datasets = [
    {
      label: "일별 응답자 수",
      data: resultCount?.map((data) => {
        return {
          x: data[0].slice(6, data[0].length - 1),
          y: data[1],
        };
      }),
      borderColor: "#788ef5",
      backgroundColor: "#788ef5",
    },
  ];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
    scales: {
      y: {
        ticks: {
          callback: (label: string | number) => {
            if (typeof label === "number" && Math.floor(label) === label)
              return label;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Line
      className="h-[360px] max-h-[360px]"
      options={options}
      data={{
        labels: [],
        datasets,
      }}
    />
  );
};

export default DashboardLineChart;
