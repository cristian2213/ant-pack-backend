import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { Address } from './addresses.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 80, nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 80, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 150, nullable: false, unique: true })
  phone: string;

  @Column({ type: 'text', nullable: true, default: null })
  website?: string;

  @Column({ type: 'text', nullable: true, default: null })
  avatar?: string;

  /**
   * Company Relationship
   * 1:1
   */
  @OneToOne(() => Company, (company: Company) => company.user)
  company: Company;

  /**
   * Address Relationship
   * 1:1
   */
  @OneToOne(() => Address, (address: Address) => address.user)
  address: Address;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
