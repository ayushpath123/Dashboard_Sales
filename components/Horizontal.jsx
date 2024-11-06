'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample Data: Replace this with the actual data you provided
const data = [
  {
    year: 2017,
    profit: [
      { date: '2017-06-18', value: 477173.34 },
      { date: '2017-06-26', value: 481740.52 },
      { date: '2017-09-29', value: 450965.94 },
      { date: '2017-12-01', value: 398222.72 },
      { date: '2017-12-24', value: 619085.33 },
    ],
    sales: [
      { date: '2017-06-18', value: 1075725.71 },
      { date: '2017-06-26', value: 1059133.24 },
      { date: '2017-09-29', value: 1076202.88 },
      { date: '2017-12-01', value: 1023459.66 },
      { date: '2017-12-24', value: 1379283.19 },
    ],
  },
  {
    year: 2018,
    profit: [
      { date: '2018-02-05', value: 336682.24 },
      { date: '2018-02-12', value: 398430.22 },
      { date: '2018-02-19', value: 373071.57 },
      { date: '2018-02-26', value: 339585.91 },
      { date: '2018-03-19', value: 406118.86 },
    ],
    sales: [
      { date: '2018-02-05', value: 795969.94 },
      { date: '2018-02-12', value: 781887.54 },
      { date: '2018-02-19', value: 879580.88 },
      { date: '2018-02-26', value: 835419.96 },
      { date: '2018-03-19', value: 895210.58 },
    ],
  },
  {
    year: 2019,
    profit: [
      { date: '2019-04-07', value: 344588.71 },
      { date: '2019-06-30', value: 413530.29 },
      { date: '2019-07-08', value: 436621.64 },
      { date: '2019-10-11', value: 356866.24 },
      { date: '2019-12-13', value: 356866.24 },
    ],
    sales: [
      { date: '2019-04-07', value: 833027.41 },
      { date: '2019-06-30', value: 1011561.10 },
      { date: '2019-07-08', value: 1010930.03 },
      { date: '2019-10-11', value: 981740.87 },
      { date: '2019-12-13', value: 981740.87 },
    ],
  },
];

const convertToLakhs = (value) => (value / 100000).toFixed(2);

// Aggregate function to get both Profit and Sales by date
const aggregateData = (data) => {
  const aggregatedData = data
    .flatMap((yearData) => {
      return yearData.profit.map((profit, index) => {
        const sales = yearData.sales[index];
        return {
          date: profit.date,
          profit: profit.value,
          sales: sales ? sales.value : 0, // Ensure sales data exists
        };
      });
    })
    .reduce((acc, curr) => {
      const existing = acc.find((item) => item.date === curr.date); // Check if date already exists
      if (existing) {
        existing.profit += curr.profit; // Sum the profit for the same date
        existing.sales += curr.sales; // Sum the sales for the same date
      } else {
        acc.push(curr); // Add new date if not found
      }
      return acc;
    }, []);

  return aggregatedData
    .sort((a, b) => b.profit - a.profit) // Sort by profit value in descending order
    .slice(0, 5); // Get top 5 entries
};

const PieChart2 = () => {
  const [selectedYear, setSelectedYear] = useState(2017); // Default year to 2017

  // Get the data for the selected year
  const selectedData = data.filter((item) => item.year === selectedYear);

  // Aggregate the data for profit and sales
  const chartData = aggregateData(selectedData);

  return (
    <div className="flex flex-col items-center p-8 w-full h-full bg-gray-950 border">
      {/* Buttons for Year Selection */}
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

      {/* Bar Chart for Profit and Sales */}
      <h2 className="text-xl font-bold text-white mb-4">Top 5 Profit and Sales Days for {selectedYear}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(value) => `${convertToLakhs(value)} Lakhs`} />
          <Tooltip formatter={(value) => `${convertToLakhs(value)} Lakhs`} />
          <Legend />
          <Bar dataKey="profit" fill="#8884d8" name="Profit" />
          <Bar dataKey="sales" fill="#82ca9d" name="Sales" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart2;
