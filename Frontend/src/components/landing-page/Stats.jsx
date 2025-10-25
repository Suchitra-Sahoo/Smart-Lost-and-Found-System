import React, { useEffect, useState } from "react";

const statsData = [
  { label: "Items Recovered", value: 1200 },
  { label: "Active Users", value: 8500 },
  { label: "Campuses Connected", value: 120 },
  { label: "Reports Filed", value: 5000 },
];

export const Stats = () => {
  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    const intervals = statsData.map((stat, index) => {
      const increment = Math.ceil(stat.value / 100);
      return setInterval(() => {
        setCounts((prev) => {
          const newCounts = [...prev];
          if (newCounts[index] < stat.value) {
            newCounts[index] = Math.min(newCounts[index] + increment, stat.value);
          }
          return newCounts;
        });
      }, 20);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="relative w-full bg-orange-500 overflow-hidden">
      {/* Faded Background Image */}
      <img
        src="https://www.247software.com/hubfs/lost-and-found-software.png"
        alt="Lost and Found Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
      />

      {/* Stats Content */}
      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="pb-1 text-4xl font-extrabold text-white">
            CampusFind Impact
          </h2>
          <p className="mt-3 text-lg text-white">
            See how CampusFind is making your campus safer and more connected!
          </p>
        </div>
        <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-4 sm:gap-8">
          {statsData.map((stat, idx) => (
            <div key={idx} className="flex flex-col mt-10 sm:mt-0">
              <dd className="order-1 text-5xl font-extrabold text-white">
                {counts[idx].toLocaleString()}
              </dd>
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-white">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
