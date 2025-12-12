"use client";

import { useState } from 'react';
import styles from './page.module.css';
import { Calculator, Sparkles, PieChart as PieChartIcon, Table as TableIcon } from 'lucide-react';
import ProjectionsChart from '@/components/ProjectionsChart';
import AllocationChart from '@/components/AllocationChart';

export default function ProjectionsPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const [formData, setFormData] = useState({
        initial_investment: 100000,
        monthly_sip: 50000,
        years: 15,
        expected_return_rate: 0.12,
        volatility: 0.15,
        step_up_percentage: 0
    });

    const [riskScore, setRiskScore] = useState(5);
    const [allocationResult, setAllocationResult] = useState<any>(null);
    const [fundsResult, setFundsResult] = useState<any[]>([]);
    const [showBreakdown, setShowBreakdown] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: parseFloat(value)
        }));
    };

    const handleRiskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRiskScore(parseInt(e.target.value));
    };

    const calculateProjections = async () => {
        setLoading(true);
        try {
            // In a real app, use an environment variable for the API URL
            const response = await fetch('http://localhost:4000/ai/projections', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to fetch projections');

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error(error);
            alert('Failed to calculate projections. Ensure backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const calculateInvestmentBreakdown = () => {
        const breakdown = [];
        let currentSip = formData.monthly_sip;
        let cumulative = formData.initial_investment;

        for (let year = 1; year <= formData.years; year++) {
            const yearlyInvestment = currentSip * 12;
            cumulative += yearlyInvestment;
            breakdown.push({
                year,
                monthlySip: currentSip,
                yearlyInvestment,
                cumulative
            });
            currentSip = currentSip * (1 + formData.step_up_percentage / 100);
        }
        return breakdown;
    };

    const investmentBreakdown = calculateInvestmentBreakdown();

    const fetchAllocation = async () => {
        try {
            const [allocResponse, fundsResponse] = await Promise.all([
                fetch(`http://localhost:4000/ai/allocation?risk_score=${riskScore}`),
                fetch(`http://localhost:4000/ai/funds?risk_score=${riskScore}`)
            ]);

            if (!allocResponse.ok || !fundsResponse.ok) throw new Error('Failed to fetch data');

            const allocData = await allocResponse.json();
            const fundsData = await fundsResponse.json();

            setAllocationResult(allocData);
            setFundsResult(fundsData);
        } catch (error) {
            console.error(error);
            alert('Failed to fetch recommendations.');
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Financial Projections</h1>
                <p className={styles.subtitle}>AI-powered Monte Carlo simulations to forecast your wealth.</p>
            </header>

            <div className={styles.contentGrid}>
                <div className={styles.leftColumn}>
                    <div className={`glass-panel ${styles.formCard}`}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <Calculator size={20} color="var(--primary)" />
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Parameters</h2>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Initial Investment (₹)</label>
                            <input
                                type="number"
                                name="initial_investment"
                                className={styles.input}
                                value={formData.initial_investment}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Monthly SIP (₹)</label>
                            <input
                                type="number"
                                name="monthly_sip"
                                className={styles.input}
                                value={formData.monthly_sip}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Step-up SIP (% per year)</label>
                            <input
                                type="number"
                                name="step_up_percentage"
                                className={styles.input}
                                value={formData.step_up_percentage}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Duration (Years)</label>
                            <input
                                type="number"
                                name="years"
                                className={styles.input}
                                value={formData.years}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Expected Return (Rate)</label>
                            <input
                                type="number"
                                name="expected_return_rate"
                                className={styles.input}
                                step="0.01"
                                value={formData.expected_return_rate}
                                onChange={handleChange}
                            />
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>0.12 = 12%</span>
                        </div>

                        <button
                            className={styles.button}
                            onClick={calculateProjections}
                            disabled={loading}
                        >
                            {loading ? 'Simulating...' : (
                                <>
                                    <Sparkles size={18} />
                                    Run Simulation
                                </>
                            )}
                        </button>

                        <button
                            className={`${styles.button} ${styles.secondaryButton}`}
                            onClick={() => setShowBreakdown(!showBreakdown)}
                        >
                            <TableIcon size={18} />
                            {showBreakdown ? 'Hide Breakdown' : 'View Investment Schedule'}
                        </button>

                        {showBreakdown && (
                            <div className={styles.tableContainer}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Monthly SIP</th>
                                            <th>Annual Inv.</th>
                                            <th>Total Inv.</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {investmentBreakdown.map((row) => (
                                            <tr key={row.year}>
                                                <td>{row.year}</td>
                                                <td>₹{Math.round(row.monthlySip).toLocaleString()}</td>
                                                <td>₹{Math.round(row.yearlyInvestment).toLocaleString()}</td>
                                                <td>₹{Math.round(row.cumulative).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>


                </div>

                <div className={styles.rightColumn}>
                    <div className={`glass-panel ${styles.chartCard}`}>
                        <div className={styles.chartHeader}>
                            <h2 className={styles.chartTitle}>Wealth Forecast</h2>
                            {result && (
                                <div className={styles.legend}>
                                    <div className={styles.legendItem}>
                                        <div className={styles.dot} style={{ background: '#ef4444' }} /> Conservative
                                    </div>
                                    <div className={styles.legendItem}>
                                        <div className={styles.dot} style={{ background: '#f59e0b' }} /> Moderate
                                    </div>
                                    <div className={styles.legendItem}>
                                        <div className={styles.dot} style={{ background: '#10b981' }} /> Aggressive
                                    </div>
                                </div>
                            )}
                        </div>

                        {result ? (
                            <ProjectionsChart data={result} />
                        ) : (
                            <div style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text-muted)',
                                flexDirection: 'column',
                                gap: '1rem'
                            }}>
                                <Sparkles size={48} style={{ opacity: 0.2 }} />
                                <p>Enter parameters and run simulation to see projections</p>
                            </div>
                        )}
                    </div>

                    <div className={`glass-panel ${styles.formCard}`} style={{ marginTop: '0', minHeight: 'fit-content' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <PieChartIcon size={20} color="var(--primary)" />
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Risk Profile</h2>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Risk Score (1-10): {riskScore}</label>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={riskScore}
                                onChange={handleRiskChange}
                                className={styles.rangeInput}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                <span>Conservative</span>
                                <span>Aggressive</span>
                            </div>
                        </div>

                        <button
                            className={styles.button}
                            onClick={fetchAllocation}
                            style={{ marginTop: '1rem' }}
                        >
                            Get Recommendation
                        </button>
                    </div>

                    {allocationResult && (
                        <div className={`glass-panel ${styles.chartCard}`} style={{ marginTop: '2rem', minHeight: 'fit-content' }}>
                            <div className={styles.chartHeader}>
                                <h2 className={styles.chartTitle}>Recommended Allocation</h2>
                            </div>
                            <AllocationChart data={allocationResult} />
                        </div>
                    )}

                    {fundsResult.length > 0 && (
                        <div className={`glass-panel ${styles.chartCard}`} style={{ marginTop: '2rem', minHeight: 'fit-content' }}>
                            <div className={styles.chartHeader}>
                                <h2 className={styles.chartTitle}>Top Rated Funds for You</h2>
                            </div>
                            <div className={styles.fundsGrid}>
                                {fundsResult.map((fund, index) => (
                                    <div key={index} className={styles.fundCard}>
                                        <div className={styles.fundHeader}>
                                            <div className={styles.fundName}>{fund.name}</div>
                                            <div className={styles.fundRating}>★ {fund.rating}</div>
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 500 }}>
                                            {fund.category}
                                        </div>
                                        <div className={styles.fundMeta}>
                                            <div className={styles.metaItem}>
                                                <span className={styles.metaLabel}>3Y Returns</span>
                                                <span className={styles.metaValue} style={{ color: '#10b981' }}>{fund.returns_3y}%</span>
                                            </div>
                                            <div className={styles.metaItem}>
                                                <span className={styles.metaLabel}>5Y Returns</span>
                                                <span className={styles.metaValue} style={{ color: '#10b981' }}>{fund.returns_5y}%</span>
                                            </div>
                                            <div className={styles.metaItem}>
                                                <span className={styles.metaLabel}>Exp. Ratio</span>
                                                <span className={styles.metaValue}>{fund.expense_ratio}%</span>
                                            </div>
                                            <div className={styles.metaItem}>
                                                <span className={styles.metaLabel}>Risk</span>
                                                <span className={styles.metaValue}>{fund.risk_level}</span>
                                            </div>
                                        </div>
                                        <div className={styles.fundDescription}>
                                            {fund.description}
                                        </div>
                                        <div className={styles.managerInfo}>
                                            <span>Manager: {fund.fund_manager} ({fund.manager_experience})</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
