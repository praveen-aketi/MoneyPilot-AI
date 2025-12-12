import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Asset {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    symbol: string; // TCS, HDFCSMALLCAP

    @Column()
    name: string;

    @Column()
    type: string; // 'stock', 'mutual_fund', 'reit', 'fd', 'post_office', 'cash'

    @Column({ nullable: true })
    category: string; // 'large_cap', 'small_cap', 'debt'

    @Column({ default: 'moderate' })
    riskLevel: string;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
    expectedCagr: number;

    @Column({ type: 'simple-json', nullable: true })
    meta: any;
}
