import React from 'react';
import { 
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer, Legend 
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function SalesAnalytics({ data }) {
  const { categorySales, deviceActivity } = data;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Category Performance */}
      <div className="bg-[#18181b] p-6 rounded-xl border border-[#27272a] shadow-lg">
        <h3 className="text-lg font-bold mb-6 text-white">Sales by Category</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer>
            <BarChart data={categorySales} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
              <XAxis type="number" stroke="#52525b" />
              <YAxis dataKey="name" type="category" stroke="#52525b" />
              <RechartsTooltip 
                cursor={{ fill: '#27272a' }}
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
              />
              <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Device Usage */}
      <div className="bg-[#18181b] p-6 rounded-xl border border-[#27272a] shadow-lg">
        <h3 className="text-lg font-bold mb-6 text-white">Device Usage</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={deviceActivity}
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {deviceActivity.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
