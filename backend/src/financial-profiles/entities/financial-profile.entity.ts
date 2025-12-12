import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/user.entity';

@Entity()
export class FinancialProfile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    monthlyIncome: number;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    monthlyExpenses: number;

    @Column({ default: 'moderate' })
    riskProfile: string; // 'conservative' | 'moderate' | 'aggressive'

    @Column({ default: 'INR' })
    currency: string;
}
