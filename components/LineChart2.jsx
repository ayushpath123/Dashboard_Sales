'use client';

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const monthlyData = {
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

const LineChart2 = () => {
  const [selectedYear, setSelectedYear] = useState(2017);

  // Prepare data for the selected year with sales and profit in crores
  const chartData = monthlyData[selectedYear].map(data => ({
    month: data.month,
    sales: convertToCrores(data.sales),
    profit: convertToCrores(data.profit),
  }));

  return (
    <div className="flex flex-col items-center bg-gray-950 border p-2">
  <h2 className="text-2xl font-semibold mb-4 text-center text-gray-100">
    {selectedYear} Sales and Profit Analysis (in Crores)
  </h2>

  {/* Buttons for Year Selection */}
  <div className="flex space-x-2 mb-4">
    {[2017, 2018, 2019].map(year => (
      <button
        key={year}
        onClick={() => setSelectedYear(year)}
        className={`px-4 py-2 rounded ${selectedYear === year ? 'bg-black border-2 border-blue-500' : 'bg-black'} text-white`}
      >
        {year}
      </button>
    ))}
  </div>

  {/* Line Chart */}
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={chartData}>
      <XAxis dataKey="month" />
      <YAxis label={{ value: 'Value in Cr', angle: -90, position: 'insideLeft' }} />
      <Tooltip formatter={(value) => [`₹${value} cr`, 'Value']} />
      <Legend />
      <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
    </LineChart>
  </ResponsiveContainer>
</div>

  );
};

export default LineChart2;
