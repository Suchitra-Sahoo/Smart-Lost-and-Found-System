import React, { useEffect, useRef } from "react";
import {
  FaBook,
  FaUtensils,
  FaUmbrella,
  FaLaptop,
  FaGlasses,
  FaBriefcase,
} from "react-icons/fa";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const RecentFoundItems = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const foundItems = [
    {
      id: 1,
      name: "Books",
      icon: <FaBook />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 2,
      name: "Lunch Box",
      icon: <FaUtensils />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: 3,
      name: "Umbrella",
      icon: <FaUmbrella />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 4,
      name: "Laptop",
      icon: <FaLaptop />,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 5,
      name: "Spectacles",
      icon: <FaGlasses />,
      color: "bg-pink-100 text-pink-600",
    },
    {
      id: 6,
      name: "Office Bag",
      icon: <FaBriefcase />,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  useEffect(() => {
    if (chartInstance.current) chartInstance.current.destroy();

    const ctx = chartRef.current.getContext("2d");

    const labels = ["Books", "Lunch Box", "Umbrella", "Laptop", "Spectacles", "Office Bag"];
    const values = [4, 7, 3, 2, 6, 1]; 

    const data = {
      labels,
      datasets: [
        {
          label: "Found Items",
          data: values,
          backgroundColor: "#22c55e", // ✅ GREEN theme (different)
          borderRadius: 6,
          borderWidth: 0,
          animations: {
            y: { duration: 1200, easing: "easeOutQuart" },
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

        animation: {
          duration: 1200,
          easing: "easeInOutQuart",
          delay: (ctx) =>
            ctx.type === "data" && ctx.mode === "default"
              ? ctx.dataIndex * 120
              : 0,
        },

        plugins: {
          legend: { display: true, position: "top" },
        },

        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true, grid: { drawBorder: false } },
        },
      },
    };

    chartInstance.current = new Chart(ctx, config);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-stretch w-full overflow-hidden">

      {/* LEFT — Found Items Grid */}
      <div
        className="
          bg-gray-50 rounded-2xl p-5 border-3 border-gray-200
          w-full lg:w-[40%] flex-shrink-0
          min-h-[280px] md:min-h-[330px] lg:min-h-[380px]
          overflow-hidden
        "
      >
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Recently Found Items
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 w-full">
          {foundItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center bg-gray-50 border border-gray-200 
                         rounded-xl p-3 sm:p-4 hover:shadow-md transition cursor-pointer w-full"
            >
              <div
                className={`
                  w-10 h-10
                  sm:w-12 sm:h-12
                  md:w-14 md:h-14
                  lg:w-16 lg:h-16
                  flex items-center justify-center rounded-full
                  text-xl sm:text-2xl md:text-3xl 
                  ${item.color}
                `}
              >
                {item.icon}
              </div>
              <p className="mt-2 text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 text-center">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ RIGHT — Found Items Chart  */}
      <div
        className="
          bg-white rounded-2xl border-3 border-gray-200 p-5
          w-full lg:w-[60%] min-w-0
        "
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Most Frequently Found Items
        </h2>

        <div
          className="
            relative w-full 
            h-[220px] sm:h-[260px] md:h-[300px] lg:h-[360px] xl:h-[380px]
            overflow-hidden
          "
        >
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default RecentFoundItems;
