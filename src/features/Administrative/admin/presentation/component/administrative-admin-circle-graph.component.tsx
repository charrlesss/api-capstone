import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

export const data = {
  labels: ["Green", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19],
      backgroundColor: ["rgba(75, 192, 192, 0.2)", "#e7e6eb"],
      borderColor: ["rgba(75, 192, 192, 2)", "rgba(153, 102, 255, 2)"],
      borderWidth: 1,
      borderRadius: 50,
    },
  ],
};
const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      labels: {
        color: "#fff" as const,
      },
    },
  },
  elements: {
    arc: {
      borderWidth: 1,
      // borderRadius: 0,
    },
  },
};

const plugins = [
  {
    id: "text",
    beforeDraw: function (chart: any, a: any, b: any) {
      var width = chart.width,
        height = chart.height,
        ctx = chart.ctx;

      ctx.restore();
      ctx.font = "600 40px Arial, Helvetica, sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#fff";

      var text = "25",
        textX = Math.round((width - ctx.measureText(text).width) / 1.98),
        textY = height / 1.8;

      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  },
];

export const AdministrativeAdminCircleGraphComponent: React.FC =
  (): JSX.Element => {
    return (
      <Doughnut
        data={data}
        options={{ cutout: 100, ...options }}
        plugins={plugins}
      />
    );
  };
