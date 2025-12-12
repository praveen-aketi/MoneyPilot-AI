import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/user.entity';
import { Asset } from '../../assets/entities/asset.entity';
import { Goal } from '../../goals/entities/goal.entity';

@Entity()
export class Holding {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Asset)
    asset: Asset;

    @Column({ type: 'decimal', precision: 12, scale: 4, nullable: true })
    quantity: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    investedAmount: number;

    @Column({ type: 'date' })
    startDate: Date;

    @ManyToOne(() => Goal, { nullable: true })
    goal: Goal;
}
