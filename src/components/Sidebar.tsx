"use client";

import React from 'react';
import styles from './Sidebar.module.css';
import { LayoutDashboard, TrendingUp, Shield, HeartPulse, Wallet, Settings, PieChart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Investments', icon: TrendingUp, path: '/investments' },
    { name: 'Insurance', icon: Shield, path: '/insurance' },
    { name: 'Emergency Fund', icon: HeartPulse, path: '/emergency-fund' },
    { name: 'Projections', icon: PieChart, path: '/projections' },
    { name: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <Wallet className={styles.logoIcon} size={32} />
                <span>MoneyPilot</span>
            </div>

            <nav className={styles.nav}>
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={clsx(styles.navItem, isActive && styles.navItemActive)}
                        >
                            <Icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.footer}>
                <div className={styles.avatar}>PA</div>
                <div className={styles.userInfo}>
                    <span className={styles.userName}>Praveen Aketi</span>
                    <span className={styles.userRole}>Premium User</span>
                </div>
            </div>
        </aside>
    );
}
