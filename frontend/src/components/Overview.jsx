import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { Activity, Users, DollarSign, ArrowUpRight } from 'lucide-react';

export default function Overview({ data }) {
  const { summary, monthlySales, deviceActivity } = data;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#18181b] p-6 rounded-xl border border-[#27272a] shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 font-medium">Total Revenue</h3>
            <DollarSign className="text-emerald-500" size={24} />
          </div>
          <p className="text-3xl font-bold text-white mb-2">
            ${summary.totalSales.toLocaleString()}
          </p>
          <p className="text-sm text-emerald-500 flex items-center gap-1">
            <ArrowUpRight size={16} /> +12.5% from last period
          </p>
        </div>

        <div className="bg-[#18181b] p-6 rounded-xl border border-[#27272a] shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 font-medium">Active Users</h3>
            <Users className="text-blue-500" size={24} />
          </div>
          <p className="text-3xl font-bold text-white mb-2">
            {summary.totalUsers.toLocaleString()}
          </p>
          <p className="text-sm text-blue-500 flex items-center gap-1">
            <ArrowUpRight size={16} /> +4.2% from last period
          </p>
        </div>

        <div className="bg-[#18181b] p-6 rounded-xl border border-[#27272a] shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 font-medium">Total Transactions</h3>
            <Activity className="text-purple-500" size={24} />
          </div>
          <p className="text-3xl font-bold text-white mb-2">
            {summary.totalEvents.toLocaleString()}
          </p>
          <p className="text-sm text-purple-500 flex items-center gap-1">
            <ArrowUpRight size={16} /> +8.1% from last period
          </p>
        </div>
      </div>

      {/* Revenue Trend (Area Chart) */}
      <div className="bg-[#18181b] p-6 rounded-xl border border-[#27272a] shadow-lg">
        <h3 className="text-lg font-bold mb-6 text-white">Revenue Trend</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer>
            <AreaChart data={monthlySales}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="name" stroke="#52525b" />
              <YAxis stroke="#52525b" tickFormatter={(value) => `$${value/1000}k`} />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                itemStyle={{ color: '#3b82f6' }}
              />
              <Area type="monotone" dataKey="totalAmount" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
