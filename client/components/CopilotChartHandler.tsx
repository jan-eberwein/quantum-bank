"use client";
import { useState } from "react";
import { useCopilotAction } from "@copilotkit/react-core";
import DynamicChart from "./DynamicChart";

const CopilotChartHandler = () => {
  const [charts, setCharts] = useState<
    { id: number; type: "bar" | "line" | "pie"; data: number[]; labels: string[]; title: string }[]
  >([]);

  useCopilotAction({
    name: "generateChart",
    description: "Generate a financial chart based on user input",
    parameters: [
      { name: "chartType", type: "string", description: "Chart type (e.g., line, bar, pie)", required: true },
      { name: "category", type: "string", description: "Data category (e.g., income, expenses, savings)", required: true },
      { name: "timeRange", type: "string", description: "Time range (e.g., last 30 days, yearly)", required: false },
    ],
    handler: async ({ chartType, category, timeRange }) => {
      console.log("🚀 Copilot Action Triggered:", { chartType, category, timeRange });

      // Mock Data for Testing
      const mockData = {
        income: [500, 700, 800, 1000, 950],
        expenses: [300, 450, 500, 600, 700],
        savings: [200, 250, 300, 400, 250],
      };

      if (!mockData[category]) {
        console.warn("⚠️ Invalid category received:", category);
        return;
      }

      const labels = ["Jan", "Feb", "Mar", "Apr", "May"];
      const data = mockData[category];

      // Update the chart state
      setCharts((prevCharts) => [
        ...prevCharts,
        { id: Date.now(), type: chartType as "bar" | "line" | "pie", data, labels, title: `${category} over ${timeRange || "last 5 months"}` },
      ]);

      console.log("✅ Chart Added:", { chartType, data, labels });
    },
  });

  return (
    <div className="copilot-chart-window">
      {charts.map((chart) => (
        <div key={chart.id} className="mb-4">
          <h3 className="font-bold">{chart.title}</h3>
          <DynamicChart type={chart.type} data={chart.data} labels={chart.labels} title={chart.title} />
        </div>
      ))}
    </div>
  );
};

export default CopilotChartHandler;
