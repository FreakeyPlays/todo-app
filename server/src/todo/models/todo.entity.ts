/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public label: string

  @Column({ default: 5 })
  public priority: number

  @Column({ default: false })
  public done: boolean
}
