"use client";

import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ProjectionData {
    years: number[];
    conservative: number[];
    moderate: number[];
    aggressive: number[];
}

export default function ProjectionsChart({ data }: { data: ProjectionData }) {
    // Transform data for Recharts
    const chartData = data.years.map((year, index) => ({
        year: `Year ${year}`,
        Conservative: data.conservative[index],
        Moderate: data.moderate[index],
        Aggressive: data.aggressive[index],
    }));

    const formatCurrency = (value: number) => {
        if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
        if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
        return `₹${value}`;
    };

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="year" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" tickFormatter={formatCurrency} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)' }}
                        itemStyle={{ color: '#f8fafc' }}
                        formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                    />
                    <Legend wrapperStyle={{ color: '#9ca3af' }} />
                    <Line type="monotone" dataKey="Conservative" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#ef4444' }} activeDot={{ r: 6, stroke: '#fff' }} />
                    <Line type="monotone" dataKey="Moderate" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6' }} activeDot={{ r: 6, stroke: '#fff' }} />
                    <Line type="monotone" dataKey="Aggressive" stroke="#ff6d5a" strokeWidth={3} dot={{ r: 4, fill: '#ff6d5a' }} activeDot={{ r: 6, stroke: '#fff' }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
