import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('phones')
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 15,
  })
  phone: string;

  @OneToOne(() => User, (user) => user.phone)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
