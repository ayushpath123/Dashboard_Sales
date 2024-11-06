'use client';

import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Utility function to format numbers in lakhs and crores
const formatNumber = (value) => {
  if (value >= 10000000) {
    return (value / 10000000).toFixed(2) + 'cr';
  } else if (value >= 100000) {
    return (value / 100000).toFixed(2) + 'L';
  }
  return value.toFixed(2);
};

// Sales data for the years 2017, 2018, and 2019
const salesData = {
  2017: [
    { name: 'Jan', revenue: 8650450.48, profit: 3608608.66 },
    { name: 'Feb', revenue: 7216327.65, profit: 3058428.41 },
    { name: 'Mar', revenue: 7567525.47, profit: 3238303.63 },
    { name: 'Apr', revenue: 5650633.87, profit: 2411999.06 },
    { name: 'May', revenue: 5988460.88, profit: 2623243.73 },
    { name: 'Jun', revenue: 8674182.00, profit: 3735692.09 },
    { name: 'Jul', revenue: 6391727.78, profit: 2736051.16 },
    { name: 'Aug', revenue: 7749377.54, profit: 3315172.09 },
    { name: 'Sep', revenue: 8786342.38, profit: 3810222.27 },
    { name: 'Oct', revenue: 6368884.91, profit: 2691692.34 },
    { name: 'Nov', revenue: 7150974.78, profit: 3058119.07 },
    { name: 'Dec', revenue: 7267346.75, profit: 3136869.90 },
  ],
  2018: [
    { name: 'Jan', revenue: 7633808.48, profit: 3258036.33 },
    { name: 'Feb', revenue: 6707430.91, profit: 3007451.87 },
    { name: 'Mar', revenue: 6476231.61, profit: 2882059.54 },
  ],
  2019: [
    { name: 'Jan', revenue: 3187480.58, profit: 1290189.03 },
    { name: 'Feb', revenue: 6573591.35, profit: 2593855.73 },
    { name: 'Mar', revenue: 7670415.60, profit: 3101354.55 },
    { name: 'Apr', revenue: 6461262.71, profit: 2620916.98 },
    { name: 'May', revenue: 5064603.27, profit: 1966721.30 },
    { name: 'Jun', revenue: 7178214.38, profit: 2877827.78 },
    { name: 'Jul', revenue: 6895857.61, profit: 2859859.85 },
    { name: 'Aug', revenue: 6841233.86, profit: 2691686.37 },
    { name: 'Sep', revenue: 7679926.49, profit: 3131453.77 },
    { name: 'Oct', revenue: 6461098.60, profit: 2559257.13 },
    { name: 'Nov', revenue: 6643787.28, profit: 2606123.89 },
    { name: 'Dec', revenue: 7249119.92, profit: 2883054.67 },
  ],
};

const BarChartComponent = () => {
  const [year, setYear] = useState('2017'); // State to manage selected year

  return (
    <div className="p-4 bg-gray-950 border text-gray-200 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-100">
        Yearly Sales Data Analysis
      </h2>
      <div className="mb-4 flex gap-4 justify-center">
        {/* Button for each year with checklist style */}
        {['2017', '2018', '2019'].map((yr) => (
          <button
            key={yr}
            onClick={() => setYear(yr)}
            className={`flex items-center p-3 rounded-lg shadow-md transition-colors duration-300 ${
              year === yr ? 'border-2 border-blue-500' : ''
            } text-white`}
          >
            <span className={`mr-2 ${year === yr ? 'text-blue-500' : ''}`}>
              {year === yr ? '✓' : '✗'}
            </span>
            {yr}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={salesData[year]} // Use data based on selected year
          margin={{ right: 30 }}
          style={{ backgroundColor: 'black' }}
        >
          <XAxis dataKey="name" stroke="#d1d5db" />
          <YAxis tickFormatter={formatNumber} stroke="#d1d5db" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="revenue" fill="#2563eb" />
          <Bar dataKey="profit" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-gray-800 border border-blue-600 flex flex-col gap-2 rounded-md shadow-lg">
        <p className="text-medium text-lg text-white">{label}</p>
        <p className="text-sm text-blue-400">
          Revenue:
          <span className="ml-2">{formatNumber(payload[0].value)}</span>
        </p>
        <p className="text-sm text-indigo-400">
          Profit:
          <span className="ml-2">{formatNumber(payload[1].value)}</span>
        </p>
      </div>
    );
  }
  return null;
};
