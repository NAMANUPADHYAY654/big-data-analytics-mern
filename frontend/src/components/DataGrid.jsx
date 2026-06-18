import React, { useState } from 'react';
import { Download, Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DataGrid({ data }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 50;

  // Search Filter
  const filteredData = data.filter(row => 
    row.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const exportCSV = () => {
    if (filteredData.length === 0) return;
    const headers = Object.keys(filteredData[0]).join(',');
    const rows = filteredData.map(row => Object.values(row).join(','));
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `analytics_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-xl shadow-xl overflow-hidden flex flex-col h-[800px]">
      
      {/* Toolbar */}
      <div className="p-4 border-b border-[#27272a] flex items-center justify-between bg-[#18181b]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search ID, Category, Region..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            className="bg-[#09090b] border border-[#27272a] text-sm text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 w-80 transition-colors"
          />
        </div>
        
        <button 
          onClick={exportCSV}
          className="px-4 py-2 bg-emerald-600/10 text-emerald-500 hover:bg-emerald-600/20 border border-emerald-500/20 rounded-md transition-colors flex items-center gap-2 font-medium text-sm"
        >
          <Download size={16} /> Export CSV ({filteredData.length} rows)
        </button>
      </div>

      {/* Table Area */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-[#09090b] sticky top-0 z-10 text-gray-400 border-b border-[#27272a]">
            <tr>
              <th className="px-6 py-4 font-medium">Transaction ID</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Region</th>
              <th className="px-6 py-4 font-medium">Device</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272a]">
            {currentData.map((row) => (
              <tr key={row.id} className="hover:bg-[#27272a]/30 transition-colors">
                <td className="px-6 py-3 font-mono text-xs text-blue-400">{row.id}</td>
                <td className="px-6 py-3">{row.date}</td>
                <td className="px-6 py-3 font-semibold text-white">${row.amount.toLocaleString()}</td>
                <td className="px-6 py-3">
                  <span className="bg-[#27272a] px-2 py-1 rounded text-xs">{row.category}</span>
                </td>
                <td className="px-6 py-3">{row.region}</td>
                <td className="px-6 py-3 capitalize">{row.device}</td>
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-12 text-gray-500">No data matches your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-[#27272a] bg-[#18181b] flex items-center justify-between text-sm text-gray-400">
        <div>
          Showing {Math.min((page - 1) * rowsPerPage + 1, filteredData.length)} to {Math.min(page * rowsPerPage, filteredData.length)} of {filteredData.length} entries
        </div>
        <div className="flex items-center gap-2">
          <button 
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="p-2 border border-[#27272a] rounded hover:bg-[#27272a] disabled:opacity-50 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="px-4">Page {page} of {totalPages || 1}</span>
          <button 
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage(p => p + 1)}
            className="p-2 border border-[#27272a] rounded hover:bg-[#27272a] disabled:opacity-50 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
