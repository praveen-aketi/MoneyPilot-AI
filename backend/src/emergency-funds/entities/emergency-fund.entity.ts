import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/user.entity';

@Entity()
export class EmergencyFund {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    user: User;

    @Column()
    purpose: string; // 'job_loss', 'medical', 'general'

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    targetAmount: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    currentAmount: number;

    @Column()
    instrumentType: string; // 'fd', 'savings_account'
}
