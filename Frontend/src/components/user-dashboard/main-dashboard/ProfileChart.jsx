import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const ProfileChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) chartInstance.current.destroy();

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Lost Items",
            data: [15, 30, 22, 40, 28, 35],
            borderColor: "#ef4444",
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            tension: 0.4,
            borderWidth: 2,
            pointBackgroundColor: "#ef4444",
          },
          {
            label: "Found Items",
            data: [10, 25, 18, 37, 20, 30],
            borderColor: "#22c55e",
            backgroundColor: "rgba(34, 197, 94, 0.2)",
            tension: 0.4,
            borderWidth: 2,
            pointBackgroundColor: "#22c55e",
          },
          {
            label: "Claimed Items",
            data: [5, 15, 12, 20, 16, 18],
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            tension: 0.4,
            borderWidth: 2,
            pointBackgroundColor: "#3b82f6",
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,

        layout: {
          padding: { bottom: 20 },
        },

        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          tooltip: {
            enabled: true,
          },
        },

        scales: {
          x: {
            offset: false,
            ticks: { font: { size: 12 } },
            grid: { display: false },
          },
          y: {
            beginAtZero: true,
            grid: { color: "rgba(0,0,0,0.05)" },
          },
        },
      },
    });
  }, []);

  return (
    <div className="bg-white p-5 mt-6 rounded-xl shadow-md w-full h-[330px] overflow-x-hidden overflow-y-hidden">
      <canvas ref={chartRef} className="w-full max-w-full block"></canvas>
    </div>
  );
};

export default ProfileChart;
