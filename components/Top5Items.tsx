'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample Data
const data = [
  { year: 2017, item: 'Large Canned Shrimp', total_profit: 2419306.47, total_quantity: 251874 },
  { year: 2017, item: 'High Top Dried Mushrooms', total_profit: 2165802.94, total_quantity: 166840 },
  { year: 2017, item: 'Fast Mini Donuts', total_profit: 1567596.25, total_quantity: 15350 },
  { year: 2017, item: 'Big Time Frozen Cheese Pizza', total_profit: 1286707.56, total_quantity: 12102 },
  { year: 2017, item: 'Ebony Squash', total_profit: 1093739.23, total_quantity: 4774 },
  { year: 2018, item: 'Large Canned Shrimp', total_profit: 889494.30, total_quantity: 86608 },
  { year: 2018, item: 'High Top Dried Mushrooms', total_profit: 604693.17, total_quantity: 44489 },
  { year: 2018, item: 'Big Time Frozen Cheese Pizza', total_profit: 413449.54, total_quantity: 3784 },
  { year: 2018, item: 'Discover Manicotti', total_profit: 347037.69, total_quantity: 959 },
  { year: 2018, item: 'Tell Tale Red Delcious Apples', total_profit: 329663.79, total_quantity: 4760 },
  { year: 2019, item: 'Large Canned Shrimp', total_profit: 2151025.49, total_quantity: 251861 },
  { year: 2019, item: 'High Top Dried Mushrooms', total_profit: 1889304.05, total_quantity: 165930 },
  { year: 2019, item: 'Big Time Frozen Cheese Pizza', total_profit: 1126615.89, total_quantity: 11534 },
  { year: 2019, item: 'Fast Mini Donuts', total_profit: 1064374.73, total_quantity: 11650 },
  { year: 2019, item: 'Discover Manicotti', total_profit: 960848.73, total_quantity: 3092 },
];

// Function to convert values to L (1 L = 100,000)
const convertToL = (value) => (value / 100000).toFixed(2);

// Grouped Bar Chart for Top 5 Items by Profit
const GroupedBarChart = () => {
  const [selectedYear, setSelectedYear] = useState(2017); // Default year to 2017

  // Filter the data for the selected year
  const filteredData = data.filter(item => item.year === selectedYear);

  // Sort by total_profit in descending order and get the top 5 items
  const topItemsData = [...filteredData]
    .sort((a, b) => b.total_profit - a.total_profit)
    .filter(item => item.total_quantity > 0) // Remove items with zero quantity
    .slice(0, 5);

  return (
    <div className="flex flex-col items-center p-8 w-full h-full bg-gray-950 border">
      {/* Year Selection Buttons */}
      <div className="flex space-x-4 mb-4">
        {[2017, 2018, 2019].map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded ${
              selectedYear === year
                ? 'bg-black border-2 border-blue-500'
                : 'bg-black'
            } text-white`}
          >
            {year}
          </button>
        ))}
      </div>

      <h2 className="text-xl font-bold text-white mb-4">Top 5 Items by Profit for {selectedYear}</h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={topItemsData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="item" />
          <YAxis tickFormatter={(value) => `${convertToL(value)} L`} />
          
          {/* Tooltip showing both profit and quantity */}
          <Tooltip 
            content={({ payload, label }) => {
              if (payload && payload.length) {
                const { total_profit, total_quantity } = payload[0].payload;
                return (
                  <div className="custom-tooltip bg-gray-800 text-white p-3">
                    <p><strong>Item:</strong> {label}</p>
                    <p><strong>Total Profit:</strong> {convertToL(total_profit)} L</p>
                    <p><strong>Total Quantity:</strong> {total_quantity} Items</p>
                  </div>
                );
              }
              return null;
            }} 
          />
          <Legend />
          
          {/* Single bar for total profit */}
          <Bar dataKey="total_profit" fill="#8884d8" name="Total Profit (in ₹)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GroupedBarChart;
