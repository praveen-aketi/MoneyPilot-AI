"use client";

import styles from './page.module.css';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import DashboardCharts from '@/components/DashboardCharts';



export default function Home() {
  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome back, Praveen</h1>
        <p className={styles.subtitle}>Here's your financial overview for today.</p>
      </header>

      <div className={styles.grid}>
        <div className={`glass-panel ${styles.card}`}>
          <div className={styles.cardLabel}>Total Net Worth</div>
          <div className={styles.cardValue}>₹1.24 Cr</div>
          <div className={`${styles.cardTrend} ${styles.trendUp}`}>
            <ArrowUpRight size={16} />
            <span>+12.5% from last month</span>
          </div>
        </div>

        <div className={`glass-panel ${styles.card}`}>
          <div className={styles.cardLabel}>Monthly Investments</div>
          <div className={styles.cardValue}>₹1.05 L</div>
          <div className={`${styles.cardTrend} ${styles.trendUp}`}>
            <ArrowUpRight size={16} />
            <span>On track</span>
          </div>
        </div>

        <div className={`glass-panel ${styles.card}`}>
          <div className={styles.cardLabel}>Monthly Expenses</div>
          <div className={styles.cardValue}>₹45,000</div>
          <div className={`${styles.cardTrend} ${styles.trendDown}`}>
            <ArrowDownRight size={16} />
            <span>-5% from last month</span>
          </div>
        </div>
      </div>

      <DashboardCharts styles={styles} />
    </div>
  );
}
