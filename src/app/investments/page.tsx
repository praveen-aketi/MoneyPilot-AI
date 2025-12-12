"use client";

import styles from './page.module.css';
import { TrendingUp, Clock, Calendar, BarChart3 } from 'lucide-react';

const investments = [
    {
        id: 1,
        name: "Small Cap SIP (Self)",
        type: "Mutual Fund",
        amount: "₹50,000",
        frequency: "Monthly",
        duration: "10 Years",
        projectedValue: "₹1.2 Cr", // Approx calculation
        risk: "High"
    },
    {
        id: 2,
        name: "Small Cap SIP (Wife)",
        type: "Mutual Fund",
        amount: "₹50,000",
        frequency: "Monthly",
        duration: "10 Years",
        projectedValue: "₹1.2 Cr",
        risk: "High"
    },
    {
        id: 3,
        name: "REIT Investment",
        type: "Real Estate",
        amount: "₹5,000",
        frequency: "Monthly",
        duration: "10 Years",
        projectedValue: "₹10 L",
        risk: "Moderate"
    },
    {
        id: 4,
        name: "Post Office Plan",
        type: "Fixed Income",
        amount: "₹30,00,000",
        frequency: "Lumpsum",
        duration: "5 Years",
        projectedValue: "₹45 L",
        risk: "Low"
    }
];

export default function InvestmentsPage() {
    return (
        <div className={styles.container}>
            <header>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Investment Portfolio</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Track and manage your long-term wealth creation assets.</p>
            </header>

            <section>
                <h2 className={styles.sectionTitle}>Active SIPs & Plans</h2>
                <div className={styles.investmentGrid}>
                    {investments.map((inv) => (
                        <div key={inv.id} className={`glass-panel ${styles.card}`}>
                            <div className={styles.cardHeader}>
                                <div>
                                    <div className={styles.investmentName}>{inv.name}</div>
                                    <span className={styles.investmentType}>{inv.type}</span>
                                </div>
                                <TrendingUp size={24} color="var(--primary)" />
                            </div>

                            <div className={styles.amount}>{inv.amount} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}>{inv.frequency === 'Monthly' ? '/ mo' : ''}</span></div>

                            <div className={styles.details}>
                                <div className={styles.detailRow}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={14} /> Duration</div>
                                    <span className={styles.detailValue}>{inv.duration}</span>
                                </div>
                                <div className={styles.detailRow}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><BarChart3 size={14} /> Projected Value</div>
                                    <span className={styles.detailValue} style={{ color: 'var(--accent)' }}>{inv.projectedValue}</span>
                                </div>
                                <div className={styles.detailRow}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={14} /> Risk Profile</div>
                                    <span className={styles.detailValue}>{inv.risk}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
