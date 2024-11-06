'use client';

import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Sample data for sales and profit in 2017, 2018, and 2019
const data = [
  { year: '2017', sales: 87462234.49, profit: 37424402.41 },
  { year: '2018', sales: 20817471.00, profit: 9147547.74 },
  { year: '2019', sales: 77906591.65, profit: 31182301.05 },
];

// Define colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const PieChartComponent = () => {
  const [showProfit, setShowProfit] = useState(false); // State to toggle between sales and profit

  // Function to format numbers in crores
  const formatInCrores = (value) => (value / 10000000).toFixed(2) + ' Cr';

  // Calculate total sales or profit
  const total = data.reduce((acc, entry) => acc + (showProfit ? entry.profit : entry.sales), 0);

  return (
    <div className='bg-gray-950 border p-10'>
    <h2 className="text-2xl font-semibold mb-4 text-center text-gray-100">
      {showProfit ? 'Profit Analysis by Year (in Crores)' : 'Sales Analysis by Year (in Crores)'}
    </h2>
  
    <div className="mb-4 flex space-x-4">
      <button
        onClick={() => setShowProfit(false)}
        className={`text-white px-4 py-2 rounded ${!showProfit ? 'bg-black border-2 border-blue-500' : 'bg-black'}`}
      >
        Sales
      </button>
      <button
        onClick={() => setShowProfit(true)}
        className={`text-white px-4 py-2 rounded ${showProfit ? 'bg-black border-2 border-blue-500' : 'bg-black'}`}
      >
        Profit
      </button>
    </div>
  
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey={showProfit ? 'profit' : 'sales'}
          nameKey="year"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label={({ value, name }) => {
            const percent = ((value / total) * 100).toFixed(2);
            return `${formatInCrores(value)}\n(${percent}%)`; // Show value in crores and percentage
          }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${formatInCrores(value)}`, `${showProfit ? 'Profit' : 'Sales'}`]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
  
  );
};

export default PieChartComponent;
