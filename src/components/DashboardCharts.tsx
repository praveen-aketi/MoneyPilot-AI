"use client";

import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';

const data = [
    { name: 'Jan', value: 4000000 },
    { name: 'Feb', value: 4200000 },
    { name: 'Mar', value: 4100000 },
    { name: 'Apr', value: 4400000 },
    { name: 'May', value: 4600000 },
    { name: 'Jun', value: 4800000 },
];

const pieData = [
    { name: 'Stocks', value: 400 },
    { name: 'Mutual Funds', value: 300 },
    { name: 'Real Estate', value: 300 },
    { name: 'Gold', value: 200 },
];

// Updated Palette to match Light Theme
const COLORS = ['#4f46e5', '#0ea5e9', '#f59e0b', '#10b981'];
// Indigo (Primary), Sky (Secondary), Amber (Warning/Gold), Emerald (Success)

export default function DashboardCharts({ styles }: { styles: any }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div style={{ height: 300, width: '100%' }} />;

    return (
        <div className={styles.chartsGrid}>
            <div className={`glass-panel ${styles.chartCard}`}>
                <h2 className={styles.chartTitle}>Net Worth Growth</h2>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, left: 30, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="#64748b"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                dy={10}
                            />
                            <YAxis
                                stroke="#64748b"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => {
                                    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
                                    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
                                    return `₹${value}`;
                                }}
                                dx={-10}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    borderColor: '#e2e8f0',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                }}
                                itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                                labelStyle={{ color: '#64748b', marginBottom: '0.25rem' }}
                                formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Net Worth']}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#4f46e5"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorValue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className={`glass-panel ${styles.chartCard}`}>
                <h2 className={styles.chartTitle}>Asset Allocation</h2>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={100}
                                fill="#8884d8"
                                paddingAngle={4}
                                dataKey="value"
                                stroke="none"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    borderColor: '#e2e8f0',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                }}
                                itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
