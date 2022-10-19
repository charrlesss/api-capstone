import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
      lineTension: 0.8,
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: true,
      borderColor: "#742774",
      backgroundColor: "#fcb3fc",
      lineTension: 0.8,
    },
  ],
};

const options = {
  maintainAspectRatio: true,
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: "#fff" as const,
      },
    },
  },
  animations: {
    tension: {
      easing: "linear" as const,
      duration: 1000,
      from: 1,
      to: 0,
      loop: true,
    },
  },
  scales: {
    yAxes: {
      min: 0,
      max: 100,
      grid: {
        drawBorder: true,
        color: "#03314a",
      },
      ticks: {
        beginAtZero: true,
        color: "white",
        fontSize: 12,
      },
    },
    xAxes: {
      min: 0,
      max: 100,
      grid: {
        drawBorder: true,
        color: "#03314a",
      },
      ticks: {
        beginAtZero: true,
        color: "white",
        fontSize: 12,
      },
    },
  },
};

export const AdministrativeClientboxGraphComponent: React.FC =
  (): JSX.Element => {
    return (
      <div className="flex-1">
        <Line data={data} options={options} />
      </div>
    );
  };
