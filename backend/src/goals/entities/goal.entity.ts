import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/user.entity';

@Entity()
export class Goal {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    user: User;

    @Column()
    type: string; // 'emergency_fund', 'retirement', 'education', etc.

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    targetAmount: number;

    @Column()
    targetYear: number;

    @Column({ default: 3 })
    priority: number; // 1-5
}
