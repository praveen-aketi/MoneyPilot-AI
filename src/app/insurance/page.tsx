"use client";

import styles from './page.module.css';
import { Shield, Heart, Users, Calendar, FileCheck } from 'lucide-react';

const policies = [
    {
        id: 1,
        name: "Term Life Policy #1",
        provider: "HDFC Life (Mock)",
        type: "Term Insurance",
        coverage: "₹3,00,00,000",
        premium: "₹25,000 / yr",
        dueDate: "15th Mar",
        status: "Active",
        icon: Shield
    },
    {
        id: 2,
        name: "Term Life Policy #2",
        provider: "ICICI Pru (Mock)",
        type: "Term Insurance",
        coverage: "₹3,00,00,000",
        premium: "₹24,500 / yr",
        dueDate: "20th Aug",
        status: "Active",
        icon: Shield
    },
    {
        id: 3,
        name: "Family Floater Plan",
        provider: "Niva Bupa (Mock)",
        type: "Medical Insurance",
        coverage: "₹30,00,000",
        members: "Parents + Family",
        premium: "₹45,000 / yr",
        dueDate: "10th Jan",
        status: "Active",
        icon: Heart
    }
];

export default function InsurancePage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Insurance Vault</h1>
                <p className={styles.subtitle}>Your safety net against life's uncertainties.</p>
            </header>

            <div className={styles.grid}>
                {policies.map((policy) => {
                    const Icon = policy.icon;
                    return (
                        <div key={policy.id} className={`glass-panel ${styles.card}`}>
                            <div className={styles.statusBadge} title="Policy Active" />

                            <div className={styles.cardHeader}>
                                <div>
                                    <div className={styles.policyName}>{policy.name}</div>
                                    <span className={styles.policyType}>{policy.provider}</span>
                                </div>
                                <div style={{
                                    width: 48, height: 48,
                                    borderRadius: '12px',
                                    background: 'rgba(99, 102, 241, 0.1)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'var(--secondary)'
                                }}>
                                    <Icon size={24} />
                                </div>
                            </div>

                            <div>
                                <div className={styles.coverageLabel}>Coverage Amount</div>
                                <div className={styles.coverageAmount}>{policy.coverage}</div>
                            </div>

                            <div className={styles.metaGrid}>
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Premium</span>
                                    <span className={styles.metaValue}>{policy.premium}</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Renewal Due</span>
                                    <span className={styles.metaValue} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Calendar size={12} /> {policy.dueDate}
                                    </span>
                                </div>
                                {policy.members && (
                                    <div className={styles.metaItem} style={{ gridColumn: '1 / -1' }}>
                                        <span className={styles.metaLabel}>Covered Members</span>
                                        <span className={styles.metaValue} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Users size={12} /> {policy.members}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
