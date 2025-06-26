import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { stripPassword, User } from './user.entity'

import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto
    const user = this.userRepository.create({
      ...rest,
      passwordHash: await bcrypt.hash(password, 10),
    })
    const newUser = await this.userRepository.save(user)
    return stripPassword(newUser)
  }

  async findAll() {
    return this.userRepository.find()
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id })
  }

  async findByUsername(username: string) {
    return this.userRepository.findOneBy({ username })
  }

  async confirmUsernameAndPassword(username: string, password: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.username = :username', { username })
      .getOne()

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      return stripPassword(user)
    }
    return null
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const result = await this.userRepository.update(id, updateUserDto)
    if (result.affected === 0) return null
    return await this.userRepository.findOneBy({ id })
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id)
    if (result.affected === 0) return null
    return { message: `User with id ${id} deleted successfully` }
  }
}
