"use client";

import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface AllocationData {
    equity: number;
    debt: number;
    gold: number;
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

export default function AllocationChart({ data }: { data: AllocationData }) {
    const chartData = [
        { name: 'Equity', value: data.equity },
        { name: 'Debt', value: data.debt },
        { name: 'Gold', value: data.gold },
    ];

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)' }}
                        itemStyle={{ color: '#f8fafc' }}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
