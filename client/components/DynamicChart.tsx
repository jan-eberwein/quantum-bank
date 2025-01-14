"use client";
import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

interface ChartProps {
  type: "bar" | "line" | "pie";
  data: number[];
  labels: string[];
  title?: string;
}

const DynamicChart: React.FC<ChartProps> = ({ type, data, labels, title }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: title || "Data",
        data,
        backgroundColor: ["#4F46E5", "#22C55E", "#EF4444", "#FACC15", "#14B8A6"],
        borderColor: "#ffffff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      {type === "bar" && <Bar data={chartData} />}
      {type === "line" && <Line data={chartData} />}
      {type === "pie" && <Pie data={chartData} />}
    </div>
  );
};

export default DynamicChart;
