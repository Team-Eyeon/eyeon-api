import { HistoryEvent } from 'src/history-events/entities/history-event.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column({ select: false })
  passwordHash: string

  @OneToMany(() => HistoryEvent, (historyEvent) => historyEvent.user, {
    cascade: true,
  })
  historyEvents: HistoryEvent[]
}

export type UserWithoutPassword = Omit<User, 'passwordHash'>

export function stripPassword(user: User) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...rest } = user
  return rest as UserWithoutPassword
}
