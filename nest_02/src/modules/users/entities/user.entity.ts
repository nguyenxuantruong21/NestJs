import { Phone } from 'src/modules/phone/entities/phone.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 100,
    unique: true,
  })
  email: string;

  @Column({
    length: 100,
  })
  password: string;

  @Column({
    default: true,
  })
  status: boolean;

  @Column({
    type: 'text',
    nullable: true,
  })
  bio: string;

  @OneToOne(() => Phone, (phone) => phone.user)
  phone: Phone;

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
