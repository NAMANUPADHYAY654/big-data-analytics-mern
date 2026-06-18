import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import SalesAnalytics from './components/SalesAnalytics';
import DataGrid from './components/DataGrid';
import { generateRawData, processData } from './dataEngine';

function App() {
  const [currentTab, setCurrentTab] = useState('overview');
  const [daysFilter, setDaysFilter] = useState(30);
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Generate data once on mount
  useEffect(() => {
    // Generate 5000 rows of complex data
    const data = generateRawData(5000);
    setRawData(data);
    setLoading(false);
  }, []);

  // Process data whenever rawData or filter changes
  const processedData = useMemo(() => {
    if (!rawData.length) return null;
    return processData(rawData, daysFilter);
  }, [rawData, daysFilter]);

  if (loading || !processedData) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-gray-100 font-sans flex">
      {/* Sidebar */}
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        
        {/* Top Header & Filter */}
        <header className="h-20 border-b border-[#27272a] bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-20 px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white tracking-tight capitalize">
            {currentTab === 'data' ? 'Raw Data Engine' : currentTab.replace('-', ' ')}
          </h1>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 font-medium">Time Range:</span>
            <select 
              value={daysFilter}
              onChange={(e) => setDaysFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="bg-[#18181b] border border-[#27272a] text-white text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
              <option value={7}>Last 7 Days</option>
              <option value={30}>Last 30 Days</option>
              <option value={90}>Last 90 Days</option>
              <option value={365}>Last 1 Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8 flex-1">
          {currentTab === 'overview' && <Overview data={processedData} />}
          {currentTab === 'sales' && <SalesAnalytics data={processedData} />}
          {currentTab === 'data' && <DataGrid data={processedData.filteredData} />}
        </main>

      </div>
    </div>
  );
}

export default App;
