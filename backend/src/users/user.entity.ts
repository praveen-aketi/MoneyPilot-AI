import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fullName: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    passwordHash: string;

    @Column({ default: 'user' })
    role: string; // 'user' | 'admin'

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    monthlyIncome: number;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    monthlyExpenses: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
