'use client';

import { useState } from 'react';
import GroupedBarChart from '@/components/Top5Items';  // Importing your grouped bar chart
import AreaChart from '@/components/AreaChart';
import BarChart from '@/components/BarChart';
import LineChart2 from '@/components/LineChart2';  // Renamed LineChart
import PieChartComponent from '@/components/PieChart';
import PieChart2 from '@/components/Horizontal';  // Second Pie Chart component
import ScatterPlot from '@/components/ScatterPlot';  // Scatter Plot component
import Customers from '@/components/Customers';  // Import the Customers chart

const CHARTS = {
  PIE1: 'PIE1',
  PIE2: 'PIE2',
  BAR: 'BAR',            // Normal Bar Chart
  GROUPED_BAR: 'GROUPED_BAR',  // Grouped Bar Chart
  LINE: 'LINE',
  LINE2: 'LINE2', // LineChart2
  AREA: 'AREA',
  SCATTER: 'SCATTER',
  CUSTOMERS: 'CUSTOMERS', // Add Customers chart here
};

export default function Home() {
  const [selectedChart, setSelectedChart] = useState<string | null>(null);

  const openModal = (chartType: string) => {
    setSelectedChart(chartType);
  };

  const closeModal = () => {
    setSelectedChart(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="w-full text-center p-4">
        <h1 className="text-white text-4xl font-extrabold font-serif">Amazon Sales Analysis</h1>
      </div>

      <div className={`grid grid-cols-2 md:grid-cols-2 gap-0 h-full w-full ${selectedChart ? 'filter blur-lg' : ''}`}>
        <div className="p-6 shadow-md rounded-lg cursor-pointer" onClick={() => openModal(CHARTS.PIE1)}>
          <PieChartComponent />
        </div>
        <div className="p-6 shadow-md rounded-lg cursor-pointer" onClick={() => openModal(CHARTS.BAR)}>
          <BarChart />
        </div>
        <div className="p-6 shadow-md rounded-lg cursor-pointer" onClick={() => openModal(CHARTS.SCATTER)}>
          <ScatterPlot /> 
        </div>
        <div className="p-6 shadow-md rounded-lg cursor-pointer" onClick={() => openModal(CHARTS.AREA)}>
          <AreaChart />
        </div>
        <div className="p-6 shadow-md rounded-lg cursor-pointer" onClick={() => openModal(CHARTS.PIE2)}>
          <PieChart2 />
        </div>
        <div className="p-6 shadow-md rounded-lg cursor-pointer" onClick={() => openModal(CHARTS.LINE2)}>
          <LineChart2 /> {/* Show LineChart2 */}
        </div>
        <div className="p-6 shadow-md rounded-lg cursor-pointer" onClick={() => openModal(CHARTS.GROUPED_BAR)}>
          <GroupedBarChart /> {/* Show GroupedBarChart */}
        </div>
        <div className="p-6 shadow-md rounded-lg cursor-pointer" onClick={() => openModal(CHARTS.CUSTOMERS)}>
          <Customers /> {/* Add the Customers chart here */}
        </div>
      </div>

      {selectedChart && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-black rounded-lg p-8 max-w-5xl w-full">
            <button className="absolute top-4 right-4 text-white text-xl font-bold" onClick={closeModal}>
              X
            </button>
            <div className="w-full h-[500px]">
              {selectedChart === CHARTS.PIE1 && <PieChartComponent />}
              {selectedChart === CHARTS.PIE2 && <PieChart2 />}
              {selectedChart === CHARTS.BAR && <BarChart />}
              {selectedChart === CHARTS.GROUPED_BAR && <GroupedBarChart />} {/* Conditionally render GroupedBarChart */}
              {selectedChart === CHARTS.LINE2 && <LineChart2 />}
              {selectedChart === CHARTS.AREA && <AreaChart />}
              {selectedChart === CHARTS.SCATTER && <ScatterPlot />}
              {selectedChart === CHARTS.CUSTOMERS && <Customers />}  {/* Render the Customers chart */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
