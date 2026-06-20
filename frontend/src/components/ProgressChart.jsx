import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ProgressChart = ({ tasks }) => {
  const data = [
    { name: 'To Do', count: tasks.filter(t => t.status === 'To Do').length, color: '#fde047' },
    { name: 'In Progress', count: tasks.filter(t => t.status === 'In Progress').length, color: '#40c4aa' },
    { name: 'Done', count: tasks.filter(t => t.status === 'Done').length, color: '#fca18b' },
  ];

  const totalTasks = tasks.length;
  const doneTasks = data[2].count;
  const completionPercentage = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="chart-container">
      <div className="chart-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Task Progress</span>
        <span style={{ fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 800 }}>
          {completionPercentage}% Complete
        </span>
      </div>
      <div style={{ width: '100%', height: '80%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" strokeOpacity={0.2} />
            <XAxis 
              dataKey="name" 
              stroke="#1a1a1a" 
              tick={{ fill: '#1a1a1a', fontWeight: 700 }}
              axisLine={{ stroke: '#1a1a1a', strokeWidth: 2 }}
            />
            <YAxis 
              stroke="#1a1a1a" 
              allowDecimals={false} 
              tick={{ fill: '#1a1a1a', fontWeight: 700 }}
              axisLine={{ stroke: '#1a1a1a', strokeWidth: 2 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '3px solid #1a1a1a',
                borderRadius: '8px',
                boxShadow: '4px 4px 0px #1a1a1a',
                fontWeight: 700,
                color: '#1a1a1a'
              }}
              itemStyle={{ color: '#1a1a1a', fontWeight: 700 }}
              cursor={{ fill: 'rgba(0,0,0,0.05)' }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} stroke="#1a1a1a" strokeWidth={2}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;
