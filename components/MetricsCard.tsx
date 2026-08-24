import { ReactNode } from 'react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
}

export default function MetricsCard({ title, value, icon, trend, trendUp }: MetricsCardProps) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className="text-gray-400">
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-auto flex items-center pt-2 border-t border-gray-100">
          <span className={`flex items-center text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
          <span className="text-gray-400 text-sm ml-2">vs last week</span>
        </div>
      )}
    </div>
  );
}
