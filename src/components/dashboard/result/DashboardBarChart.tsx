import { DashboardResultDatas } from "@/types/dashboardTypes";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

interface IDashboardBarChart {
  answer: DashboardResultDatas["response"];
  quater?: DashboardResultDatas["response"];
  title: string;
  question: DashboardResultDatas["question"];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const DashboardBarChart = ({
  answer,
  quater,
  title,
  question,
}: IDashboardBarChart) => {
  const datasets = [
    {
      label: title,
      data: answer.map((data) => {
        return {
          x: data[0],
          y: data[1],
        };
      }),
      borderColor: "#788ef5",
      backgroundColor: "#788ef5",
    },
  ];

  if (quater)
    datasets.push({
      label: title,
      data: quater.map((data) => {
        return {
          x: data[0],
          y: data[1],
        };
      }),
      borderColor: "#788ef5",
      backgroundColor: "#788ef5",
    });

  return (
    <div className="pb-[20px]">
      <Bar
        className="h-[360px] max-h-[360px]"
        height={360}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 2,
          scales: {
            y: {
              ticks: {
                callback: (label) => {
                  if (typeof label === "number" && Math.floor(label) === label)
                    return label;
                },
              },
            },
          },
        }}
        data={{
          labels: question,
          datasets,
        }}
      />
    </div>
  );
};

export default DashboardBarChart;
