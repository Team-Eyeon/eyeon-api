import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column({ select: false })
  passwordHash: string
}

export type UserWithoutPassword = Omit<User, 'passwordHash'>

export function stripPassword(user: User) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...rest } = user
  return rest as UserWithoutPassword
}
