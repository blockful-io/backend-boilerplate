import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Value {
  @PrimaryColumn({ unique: true })
  key: number

  @Column()
  value: string

  @CreateDateColumn({ default: 'now' })
  createdAt?: Date

  @UpdateDateColumn({ default: 'now' })
  updatedAt?: Date
}
