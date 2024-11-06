'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Data with total purchase amounts
const data = [
  { Custkey: 10021485, total_purchase_amount: 11397206.36 },
  { Custkey: 10009676, total_purchase_amount: 10843991.23 },
  { Custkey: 10025024, total_purchase_amount: 9254771.72 },
  { Custkey: 10021300, total_purchase_amount: 8707904.14 },
  { Custkey: 10025052, total_purchase_amount: 5433005.93 },
  { Custkey: 10025737, total_purchase_amount: 5202201.60 },
  { Custkey: 10025039, total_purchase_amount: 3275015.91 },
  { Custkey: 10025919, total_purchase_amount: 3251414.29 },
  { Custkey: 10002154, total_purchase_amount: 3122752.50 },
  { Custkey: 10019194, total_purchase_amount: 3113493.93 },
];

// Helper function to convert value to Lakhs
const formatToLakhs = (value) => {
  return (value / 100000).toFixed(2); // Converts value to lakhs (1 lakh = 100,000)
};

const Customers = () => {
  return (
    <div className="flex flex-col items-center bg-gray-950 p-8 w-full">
      <h2 className="text-2xl font-bold text-white mb-6">Top Customers by Total Purchase Amount (in Lakhs)</h2>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 40, // Adjusted margin to give more space for Y-axis label
            bottom: 5,
          }}
        >      
          {/* XAxis now refers to Custkey (Customer IDs) */}
          <XAxis 
            dataKey="Custkey" 
            type="category"
          />
          
          {/* YAxis now has better spacing and labeling */}
          <YAxis 
            type="number" 

            tickFormatter={(value) => `${formatToLakhs(value)} L`} // Format Y-axis in lakhs
            tickCount={6} // Define how many ticks you want on Y-axis
            interval="preserveStartEnd" // Preserve the first and last ticks for better distribution
          />
          
          {/* Tooltip with customized content */}
          <Tooltip 
            content={({ payload }) => {
              if (payload && payload.length) {
                const { Custkey, total_purchase_amount } = payload[0].payload;
                return (
                  <div className="custom-tooltip bg-gray-800 p-2 rounded text-white">
                    <p><strong>Customer ID:</strong> {Custkey}</p>
                    <p><strong>Total Purchase Amount:</strong> {formatToLakhs(total_purchase_amount)} L</p>
                  </div>
                );
              }
              return null;
            }}
          />
          
          <Legend />
          
          {/* The Bar should show total_purchase_amount */}
          <Bar dataKey="total_purchase_amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Customers;
