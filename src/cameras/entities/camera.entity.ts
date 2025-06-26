import { Alert } from 'src/alerts/entities/alert.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Camera {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  location: string

  @Column({ default: true })
  isActive: boolean

  @OneToMany(() => Alert, (alert) => alert.camera, { cascade: true })
  alerts: Alert[]
}
