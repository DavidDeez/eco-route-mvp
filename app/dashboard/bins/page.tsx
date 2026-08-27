'use client';

import { useState } from 'react';
import { initialBins } from '@/lib/mockData';
import { Search, Filter } from 'lucide-react';

export default function BinsDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredBins = initialBins.filter(bin => {
    const matchesSearch = bin.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          bin.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || bin.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Bin Directory</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor all smart bins in the network.</p>
        </div>
        <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm shadow-sm">
          + Add New Bin
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50">
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by ID or address..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Types</option>
              <option value="organic">Organic</option>
              <option value="inorganic">Inorganic</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
              <tr>
                <th className="px-6 py-3 font-medium">Bin ID</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Address</th>
                <th className="px-6 py-3 font-medium text-right">Last Ping</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBins.map(bin => (
                <tr key={bin.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{bin.id}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${
                      bin.type === 'organic' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {bin.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 ${bin.status === 'full' ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${bin.status === 'full' ? 'bg-red-500' : 'bg-gray-400'}`}></span>
                      {bin.status === 'full' ? '100% Full' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{bin.address}</td>
                  <td className="px-6 py-4 text-right text-gray-400">{new Date(bin.lastUpdated).toLocaleTimeString()}</td>
                </tr>
              ))}
              {filteredBins.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No bins found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
