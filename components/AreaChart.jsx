'use client';

import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Data for sales and profit for three different years
const dataByYear = {
  2017: [
    { month: 'Jan', sales: 8650450.48, profit: 3608608.66 },
    { month: 'Feb', sales: 7216327.65, profit: 3058428.41 },
    { month: 'Mar', sales: 7567525.47, profit: 3238303.63 },
    { month: 'Apr', sales: 5650633.87, profit: 2411999.06 },
    { month: 'May', sales: 5988460.88, profit: 2623243.73 },
    { month: 'Jun', sales: 8674182.00, profit: 3735692.09 },
    { month: 'Jul', sales: 6391727.78, profit: 2736051.16 },
    { month: 'Aug', sales: 7749377.54, profit: 3315172.09 },
    { month: 'Sep', sales: 8786342.38, profit: 3810222.27 },
    { month: 'Oct', sales: 6368884.91, profit: 2691692.34 },
    { month: 'Nov', sales: 7150974.78, profit: 3058119.07 },
    { month: 'Dec', sales: 7267346.75, profit: 3136869.90 },
  ],
  2018: [
    { month: 'Jan', sales: 7633808.48, profit: 3258036.33 },
    { month: 'Feb', sales: 6707430.91, profit: 3007451.87 },
    { month: 'Mar', sales: 6476231.61, profit: 2882059.54 },
    { month: 'Apr', sales: 0, profit: 0 },
    { month: 'May', sales: 0, profit: 0 },
    { month: 'Jun', sales: 0, profit: 0 },
    { month: 'Jul', sales: 0, profit: 0 },
    { month: 'Aug', sales: 0, profit: 0 },
    { month: 'Sep', sales: 0, profit: 0 },
    { month: 'Oct', sales: 0, profit: 0 },
    { month: 'Nov', sales: 0, profit: 0 },
    { month: 'Dec', sales: 0, profit: 0 },
  ],
  2019: [
    { month: 'Jan', sales: 3187480.58, profit: 1290189.03 },
    { month: 'Feb', sales: 6573591.35, profit: 2593855.73 },
    { month: 'Mar', sales: 7670415.60, profit: 3101354.55 },
    { month: 'Apr', sales: 6461262.71, profit: 2620916.98 },
    { month: 'May', sales: 5064603.27, profit: 1966721.30 },
    { month: 'Jun', sales: 7178214.38, profit: 2877827.78 },
    { month: 'Jul', sales: 6895857.61, profit: 2859859.85 },
    { month: 'Aug', sales: 6841233.86, profit: 2691686.37 },
    { month: 'Sep', sales: 7679926.49, profit: 3131453.77 },
    { month: 'Oct', sales: 6461098.60, profit: 2559257.13 },
    { month: 'Nov', sales: 6643787.28, profit: 2606123.89 },
    { month: 'Dec', sales: 7249119.92, profit: 2883054.67 },
  ],
};

// Utility function to convert numbers to crores
const convertToCrores = (value) => {
  return (value / 10000000).toFixed(2); // Converts to crores and keeps two decimal places
};

const AreaChartComponent = () => {
  const [selectedYear, setSelectedYear] = useState(2017);
  const data = dataByYear[selectedYear].map((item) => ({
    month: item.month,
    sales: convertToCrores(item.sales),
    profit: convertToCrores(item.profit),
  }));

  return (
    <div className="p-4 bg-gray-950 border text-gray-200 rounded-lg">
  <h2 className="text-2xl font-semibold mb-4 text-center text-gray-100">
    Sales and Profit Analysis (in Crores)
  </h2>

  {/* Description of colors for Sales and Profit */}
  <p className="text-center mb-4 text-gray-300">
    <span className="text-blue-400">Blue</span> represents Sales and 
    <span className="text-purple-400"> Purple</span> represents Profit.
  </p>

  {/* Buttons for Year Selection */}
  <div className="mb-4 flex justify-center gap-2">
    {[2017, 2018, 2019].map((year) => (
      <button
        key={year}
        onClick={() => setSelectedYear(year)}
        className={`px-4 py-2 rounded-lg shadow-md transition-colors duration-300 ${
          selectedYear === year ? ' border-2 border-blue-500' : ''
        } text-white`}
      >
        {year}
      </button>
    ))}
  </div>

  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data}>
      <XAxis dataKey="month" stroke="#d1d5db" />
      <YAxis
        label={{
          value: 'Value in Cr',
          angle: -90,
          position: 'insideLeft',
          fill: '#d1d5db',
        }}
      />
      <Tooltip formatter={(value) => [`₹${value} Cr`, 'Value']} />
      <Area type="monotone" dataKey="sales" stroke="#1E90FF" fill="#1E90FF" fillOpacity={0.3} />
      <Area type="monotone" dataKey="profit" stroke="#9370DB" fill="#9370DB" fillOpacity={0.3} />
    </AreaChart>
  </ResponsiveContainer>
</div>

  
  );
};

export default AreaChartComponent;
