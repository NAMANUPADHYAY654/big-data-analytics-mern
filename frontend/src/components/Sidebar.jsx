import React from 'react';
import { LayoutDashboard, TrendingUp, Table, Download, Settings } from 'lucide-react';

export default function Sidebar({ currentTab, setCurrentTab }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'sales', label: 'Sales Analytics', icon: <TrendingUp size={20} /> },
    { id: 'data', label: 'Raw Data Engine', icon: <Table size={20} /> },
  ];

  return (
    <div className="w-64 bg-[#18181b] border-r border-[#27272a] h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-black">BD</span>
          </div>
          Big Data MERN
        </h2>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              currentTab === item.id
                ? 'bg-blue-600/10 text-blue-500 font-medium border border-blue-500/20'
                : 'text-gray-400 hover:text-gray-200 hover:bg-[#27272a]/50 border border-transparent'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-[#27272a]">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-[#27272a]/50 transition-all">
          <Settings size={20} />
          Settings
        </button>
      </div>
    </div>
  );
}
