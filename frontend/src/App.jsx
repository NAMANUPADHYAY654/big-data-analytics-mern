import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Activity, Users, DollarSign, ArrowUpRight, TrendingUp } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/analytics';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

function App() {
  const [summary, setSummary] = useState({ totalSales: 0, totalUsers: 0, totalEvents: 0 });
  const [monthlySales, setMonthlySales] = useState([]);
  const [categorySales, setCategorySales] = useState([]);
  const [deviceActivity, setDeviceActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [summaryRes, monthlyRes, categoryRes, deviceRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/summary`),
          axios.get(`${API_BASE_URL}/sales/monthly`),
          axios.get(`${API_BASE_URL}/sales/category`),
          axios.get(`${API_BASE_URL}/users/device`),
        ]);

        setSummary(summaryRes.data);
        setMonthlySales(monthlyRes.data);
        setCategorySales(categoryRes.data);
        setDeviceActivity(deviceRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to connect to the backend API. Please ensure the backend server is running and seeded.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-4">
        <div className="bg-red-900/50 border border-red-500 p-6 rounded-lg max-w-lg text-center">
          <h2 className="text-xl font-bold mb-2">Connection Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-gray-100 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">Analytics Dashboard</h1>
            <p className="text-gray-400 mt-1">Real-time big data insights & metrics</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2 font-medium">
              <TrendingUp size={18} /> Generate Report
            </button>
          </div>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            title="Total Revenue" 
            value={`$${summary.totalSales.toLocaleString()}`} 
            icon={<DollarSign className="text-blue-500" size={24} />} 
            trend="+12.5%" 
          />
          <Card 
            title="Active Users" 
            value={summary.totalUsers.toLocaleString()} 
            icon={<Users className="text-emerald-500" size={24} />} 
            trend="+5.2%" 
          />
          <Card 
            title="Total Events Logged" 
            value={summary.totalEvents.toLocaleString()} 
            icon={<Activity className="text-amber-500" size={24} />} 
            trend="+18.1%" 
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Main Chart */}
          <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 shadow-xl lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-6">Revenue Overview (Monthly)</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlySales} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="name" stroke="#a1a1aa" tick={{fill: '#a1a1aa'}} tickMargin={10} />
                  <YAxis stroke="#a1a1aa" tick={{fill: '#a1a1aa'}} tickFormatter={(value) => `$${value/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="totalAmount" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#09090b' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Secondary Charts */}
          <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-6">Sales by Category</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categorySales} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                  <XAxis type="number" stroke="#a1a1aa" tick={{fill: '#a1a1aa'}} />
                  <YAxis dataKey="name" type="category" stroke="#a1a1aa" tick={{fill: '#a1a1aa'}} width={80} />
                  <Tooltip 
                    cursor={{fill: '#27272a'}}
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {categorySales.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-6">User Activity by Device</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceActivity}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {deviceActivity.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function Card({ title, value, icon, trend }) {
  return (
    <div className="bg-[#18181b] border border-[#27272a] p-6 rounded-xl shadow-xl flex flex-col hover:border-gray-700 transition-colors group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-400 font-medium">{title}</h3>
        <div className="p-2 bg-[#09090b] rounded-lg group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold text-white">{value}</div>
        <div className="flex items-center text-emerald-500 text-sm font-medium bg-emerald-500/10 px-2 py-1 rounded">
          <ArrowUpRight size={16} className="mr-1" />
          {trend}
        </div>
      </div>
    </div>
  );
}

export default App;
