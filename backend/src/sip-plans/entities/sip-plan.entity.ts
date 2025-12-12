import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/user.entity';
import { Asset } from '../../assets/entities/asset.entity';

@Entity()
export class SipPlan {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Asset)
    asset: Asset;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    amountPerMonth: number;

    @Column({ type: 'date' })
    startDate: Date;

    @Column({ type: 'date', nullable: true })
    endDate: Date;

    @Column({ nullable: true })
    autoTag: string; // 'user_sip', 'wife_sip', 'reit_sip'
}
