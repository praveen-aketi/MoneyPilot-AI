"use client";

import styles from './page.module.css';
import { Briefcase, Landmark, Stethoscope, AlertTriangle } from 'lucide-react';

const funds = [
    {
        id: 1,
        title: "Job Loss Fund",
        current: 1200000,
        target: 1200000,
        type: "Liquid Cash / Savings",
        icon: Briefcase,
        color: "#10b981" // Emerald
    },
    {
        id: 2,
        title: "General Emergency",
        current: 2000000,
        target: 2000000,
        type: "Fixed Deposit",
        icon: Landmark,
        color: "#6366f1" // Indigo
    },
    {
        id: 3,
        title: "Medical Emergency",
        current: 3000000,
        target: 3000000,
        type: "Fixed Deposit (Sweep-in)",
        icon: Stethoscope,
        color: "#ef4444" // Red
    }
];

export default function EmergencyFundPage() {
    const totalEmergency = funds.reduce((acc, curr) => acc + curr.current, 0);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Emergency Funds</h1>
                <p className={styles.subtitle}>Safety nets allocated for specific life contingencies.</p>
            </header>

            <div className={`glass-panel ${styles.allocationCard}`}>
                <div className={styles.allocationInfo}>
                    <h2 className={styles.allocationTitle}>Total Safety Net: ₹{(totalEmergency / 100000).toFixed(1)} Lakhs</h2>
                    <p className={styles.allocationText}>
                        You have a robust emergency corpus distributed across liquid assets and fixed deposits.
                        This ensures you are prepared for job loss, medical exigencies, and general unforeseen expenses
                        without disturbing your long-term investments.
                    </p>
                </div>
                <div style={{ padding: '1.5rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '50%', color: '#f59e0b' }}>
                    <AlertTriangle size={48} />
                </div>
            </div>

            <div className={styles.overviewGrid}>
                {funds.map((fund) => {
                    const Icon = fund.icon;
                    const percentage = Math.min((fund.current / fund.target) * 100, 100);

                    return (
                        <div key={fund.id} className={`glass-panel ${styles.fundCard}`}>
                            <div className={styles.fundHeader}>
                                <div className={styles.fundTitle}>{fund.title}</div>
                                <div className={styles.fundIcon} style={{ color: fund.color, background: `${fund.color}20` }}>
                                    <Icon size={20} />
                                </div>
                            </div>

                            <div className={styles.amountSection}>
                                <div className={styles.currentAmount}>₹{(fund.current / 100000).toFixed(1)} L</div>
                                <div className={styles.targetLabel}>Target: ₹{(fund.target / 100000).toFixed(1)} L</div>
                            </div>

                            <div className={styles.progressBarContainer}>
                                <div
                                    className={styles.progressBar}
                                    style={{ width: `${percentage}%`, background: fund.color }}
                                />
                            </div>

                            <div className={styles.fundMeta}>
                                <span>{percentage}% Funded</span>
                                <span>{fund.type}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
