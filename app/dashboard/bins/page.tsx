'use client';

import { useState } from 'react';
import { initialBins } from '@/lib/mockData';
import { Search, Filter } from 'lucide-react';

export default function BinsDirectory() {
  const [bins, setBins] = useState(initialBins);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBin, setNewBin] = useState({ type: 'organic', address: '', city: 'Lagos' });

  const filteredBins = bins.filter(bin => {
    const matchesSearch = bin.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          bin.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || bin.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAddBin = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `BIN-${newBin.city.charAt(0).toUpperCase()}${Math.floor(Math.random() * 90) + 10}`;
    const addedBin = {
      id,
      type: newBin.type as 'organic' | 'inorganic',
      lat: 6.5244, // generic mock lat
      lng: 3.3792, // generic mock lng
      fillLevel: 0,
      status: 'empty' as const,
      lastUpdated: new Date().toISOString(),
      address: newBin.address,
      city: newBin.city
    };
    setBins([addedBin, ...bins]);
    setIsModalOpen(false);
    setNewBin({ type: 'organic', address: '', city: 'Lagos' });
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Bin Directory</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor all smart bins in the network.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm shadow-sm"
        >
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="font-semibold text-gray-900">Deploy New Smart Bin</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleAddBin} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Waste Stream Type</label>
                <select 
                  value={newBin.type}
                  onChange={(e) => setNewBin({...newBin, type: e.target.value})}
                  className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="organic">Organic</option>
                  <option value="inorganic">Inorganic</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City Hub</label>
                <select 
                  value={newBin.city}
                  onChange={(e) => setNewBin({...newBin, city: e.target.value})}
                  className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="Lagos">Lagos</option>
                  <option value="Ibadan">Ibadan</option>
                  <option value="Abuja">Abuja</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deployment Address</label>
                <input 
                  type="text" 
                  required
                  value={newBin.address}
                  onChange={(e) => setNewBin({...newBin, address: e.target.value})}
                  placeholder="e.g. Allen Avenue, Ikeja" 
                  className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-sm"
                >
                  Deploy Bin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
