import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const LostFoundChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    const data = {
      labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [
        // ✅ BAR Dataset (Found Items)
        {
          label: "Found Items",
          data: [40, 25, 60, 70, 50, 35, 30],
          type: "bar",
          backgroundColor: "#22c55e",
          borderWidth: 0,
          borderRadius: 6,

          // ✅ BAR height animation
          animations: {
            y: {
              duration: 1200,
              easing: "easeOutQuart",
            },
          },
        },

        // ✅ Line Animations for ALL lines
        {
          label: "Lost Items",
          data: [60, 45, 80, 90, 75, 55, 40],
          type: "line",
          borderColor: "#3b82f6",
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          animations: {
            tension: {
              duration: 1500,
              easing: "easeInOutQuart",
              from: 0.1,
              to: 0.4,
            },
          },
        },

        {
          label: "Returned Items",
          data: [10, 20, 15, 30, 25, 15, 18],
          type: "line",
          borderColor: "#f97316",
          borderWidth: 2,
          pointBackgroundColor: "#f97316",
          tension: 0.4,
          animations: {
            tension: {
              duration: 1500,
              easing: "easeInOutQuart",
              from: 0.1,
              to: 0.4,
            },
          },
        },

        {
          label: "Unclaimed",
          data: [5, 10, 8, 12, 10, 6, 9],
          type: "line",
          borderColor: "#f43f5e",
          borderWidth: 2,
          pointBackgroundColor: "#f43f5e",
          tension: 0.4,
          animations: {
            tension: {
              duration: 1500,
              easing: "easeInOutQuart",
              from: 0.1,
              to: 0.4,
            },
          },
        },
      ],
    };

    const config = {
      type: "bar",
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,

        // ✅ STAGGER ANIMATION (bars appear one after another)
        animation: {
          duration: 1200,
          easing: "easeInOutQuart",
          delay: (context) => {
            let delay = 0;
            if (context.type === "data" && context.mode === "default") {
              delay = context.dataIndex * 120;
            }
            return delay;
          },
        },

        layout: {
          padding: 0,
        },

        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },

        scales: {
          x: {
            grid: { display: false },
          },
          y: {
            beginAtZero: true,
            grid: { drawBorder: false },
          },
        },
      },
    };

    chartInstance.current = new Chart(ctx, config);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg w-full mt-8 p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Lost & Found Report
        </h2>
      </div>

      <div className="relative w-full max-w-full overflow-x-hidden h-[300px] md:h-[400px] lg:h-[450px]">
        <canvas ref={chartRef} className="w-full max-w-full"></canvas>
      </div>
    </div>
  );
};

export default LostFoundChart;
