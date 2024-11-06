"use client";

import React, { useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Sample monthly data for three years
const monthlyData = {
  2017: [
    { month: 'Jan', salesQuantity: 136996, salesAmount: 8650450.48 },
    { month: 'Feb', salesQuantity: 119580, salesAmount: 7216327.65 },
    { month: 'Mar', salesQuantity: 113618, salesAmount: 7567525.47 },
    { month: 'Apr', salesQuantity: 87772, salesAmount: 5650633.87 },
    { month: 'May', salesQuantity: 103570, salesAmount: 5988460.88 },
    { month: 'Jun', salesQuantity: 138018, salesAmount: 8674182.00 },
    { month: 'Jul', salesQuantity: 101924, salesAmount: 6391727.78 },
    { month: 'Aug', salesQuantity: 124156, salesAmount: 7749377.54 },
    { month: 'Sep', salesQuantity: 128551, salesAmount: 8786342.38 },
    { month: 'Oct', salesQuantity: 84487, salesAmount: 6368884.91 },
    { month: 'Nov', salesQuantity: 119206, salesAmount: 7150974.78 },
    { month: 'Dec', salesQuantity: 98244, salesAmount: 7267346.75 },
  ],
  2018: [
    { month: 'Jan', salesQuantity: 133372, salesAmount: 7633808.48 },
    { month: 'Feb', salesQuantity: 96998, salesAmount: 6707430.91 },
    { month: 'Mar', salesQuantity: 96255, salesAmount: 6476231.61 },
  ],
  2019: [
    { month: 'Jan', salesQuantity: 55192, salesAmount: 3187480.58 },
    { month: 'Feb', salesQuantity: 111172, salesAmount: 6573591.35 },
    { month: 'Mar', salesQuantity: 118925, salesAmount: 7670415.60 },
    { month: 'Apr', salesQuantity: 105290, salesAmount: 6461262.71 },
    { month: 'May', salesQuantity: 99214, salesAmount: 5064603.27 },
    { month: 'Jun', salesQuantity: 126452, salesAmount: 7178214.38 },
    { month: 'Jul', salesQuantity: 95008, salesAmount: 6895857.61 },
    { month: 'Aug', salesQuantity: 118669, salesAmount: 6841233.86 },
    { month: 'Sep', salesQuantity: 113312, salesAmount: 7679926.49 },
    { month: 'Oct', salesQuantity: 99894, salesAmount: 6461098.60 },
    { month: 'Nov', salesQuantity: 102054, salesAmount: 6643787.28 },
    { month: 'Dec', salesQuantity: 115261, salesAmount: 7249119.92 },
  ],
};

const ScatterPlot = () => {
  const [selectedYear, setSelectedYear] = useState(2017);
  const data = monthlyData[selectedYear].map(item => ({
    month: item.month,
    salesQuantity: item.salesQuantity,
    // Convert sales amount to crores
    salesAmount: item.salesAmount / 10000000, // Divide by 10 million to convert to crores
  }));

  return (
    <div className="flex bg-gray-950 border flex-col items-center p-2">
      {/* Buttons for Year Selection */}
      <h2 className="text-white text-2xl mb-4">Sales Quantity vs. Sales Amount ({selectedYear})</h2>
      <div className="mb-4">
        {[2017, 2018, 2019].map(year => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded ${selectedYear === year ? 'bg-black border-2 border-blue-500' : 'bg-black'} text-white mx-1`}
          >
            {year}
          </button>
        ))}
      </div>
      
  
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <XAxis dataKey="month" name="Month" />
          <YAxis 
            dataKey="salesAmount" 
            name="Sales Amount (in CR)"
            label={{ value: 'Sales Amount (in CR)', angle: -90, position: 'insideLeft' }} // Add Y-axis label
          />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }} 
            formatter={(value, name, props) => {
              // Avoid duplicating sales amount
              if (name === 'Sales Amount') {
                return [value.toFixed(2), 'Sales Amount (in CR)'];
              }
              return [value, name];
            }} 

            
          />
          <Legend />
          <Scatter name="Sales Data" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScatterPlot;
