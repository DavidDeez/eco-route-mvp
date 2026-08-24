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
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-slate-500 text-sm font-semibold tracking-wide mb-1 uppercase">{title}</p>
          <h3 className="text-4xl font-extrabold text-slate-800 tracking-tight">{value}</h3>
        </div>
        <div className="p-3.5 bg-emerald-50 rounded-xl text-emerald-600 shadow-sm border border-emerald-100/50">
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-auto flex items-center pt-2">
          <span className={`flex items-center text-sm font-bold ${trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
          <span className="text-slate-400 text-sm font-medium ml-2">vs last week</span>
        </div>
      )}
    </div>
  );
}
