import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IDashboardDoughnutChartProps {
  targetRatio: number;
  increaseRate: number;
}

const DashboardDoughnutChart = ({
  targetRatio,
  increaseRate,
}: IDashboardDoughnutChartProps) => {
  const data = {
    labels: ["Show", "Hide"],
    datasets: [
      {
        label: "# of Votes",
        data: [22, 78],
        backgroundColor: ["#788ef5", "transparent"],
        borderColor: ["#788ef5", "#788ef5"],
        borderWidth: 0.1,
        cutout: "85%",
        tooltip: false,
      },
    ],
  };

  const doughnutLabel = {
    id: "doughnutLabel",
    afterDatasetDraw(chart: any) {
      const { ctx } = chart;

      const centerX = chart.getDatasetMeta(0).data[0].x;
      const centerY = chart.getDatasetMeta(0).data[0].y;

      ctx.save();
      ctx.font = "bold 24px sans-self";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${targetRatio.toFixed(2)} %`, centerX, centerY - 15);
      ctx.font = "16px sans-self";
      ctx.fillText(`( ▲ ${increaseRate.toFixed(2)} % )`, centerX, centerY + 25);
    },
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <Doughnut
      className="h-[160px] max-h-[160px] w-[160px] max-w-[160px]"
      data={data}
      options={options}
      plugins={[doughnutLabel]}
    />
  );
};

export default DashboardDoughnutChart;
