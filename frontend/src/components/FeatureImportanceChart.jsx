import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const FeatureImportanceChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  const COLORS = ['#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#64748b', '#475569'];

  return (
    <div className="glass-card rounded-xl p-5 border border-slate-800 space-y-4">
      <div>
        <h3 className="text-sm font-bold font-mono text-slate-100 uppercase tracking-wider">
          ML Model Feature Importance (% Contribution)
        </h3>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Feature importance indicates how strongly each input contributed to the prototype model's decision. It does not imply geological causality.
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 30, left: 140, bottom: 5 }}
          >
            <XAxis type="number" unit="%" stroke="#64748b" tick={{ fontSize: 11 }} />
            <YAxis 
              type="category" 
              dataKey="feature" 
              stroke="#94a3b8" 
              tick={{ fontSize: 11 }}
              width={140}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
              formatter={(value) => [`${value}%`, 'Importance']}
            />
            <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FeatureImportanceChart;
