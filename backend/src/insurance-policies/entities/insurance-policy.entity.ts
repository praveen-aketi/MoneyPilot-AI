import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/user.entity';

@Entity()
export class InsurancePolicy {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    user: User;

    @Column()
    type: string; // 'term', 'health'

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    sumAssured: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    premium: number;

    @Column()
    insurerName: string;

    @Column({ nullable: true })
    policyTermYears: number;

    @Column({ type: 'date' })
    startDate: Date;

    @Column({ type: 'date', nullable: true })
    endDate: Date;

    @Column({ default: false })
    coversParents: boolean;

    @Column({ default: false })
    coversFamily: boolean;
}
