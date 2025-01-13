"use client";
import React, { useState } from "react";
import DynamicChart from "./DynamicChart";

const ChartsBox = () => {
  const [charts, setCharts] = useState([
    { id: 1, type: "line", data: [200, 400, 300, 500, 700], labels: ["Jan", "Feb", "Mar", "Apr", "May"], title: "Account Balance Over Time" },
    { id: 2, type: "pie", data: [500, 200, 300], labels: ["Income", "Expenses", "Savings"], title: "Income vs Expenses" },
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {charts.map((chart) => (
        <DynamicChart key={chart.id} type={chart.type} data={chart.data} labels={chart.labels} title={chart.title} />
      ))}
    </div>
  );
};

export default ChartsBox;
