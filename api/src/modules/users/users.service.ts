import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as argon2 from 'argon2';
import { USER_STATUS } from 'src/common/enums/user-status.enum';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const email = dto.email.trim().toLowerCase();

    const password_hash = await argon2.hash(dto.password);

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException({ message: 'Email already exist' });
    }

    const newUser = this.userRepository.create({
      email,
      password_hash,
      full_name: dto.full_name,
      phone: dto.phone,
      avatar_url: dto.avatar_url,
      role: dto.role ?? 'USER',
      status: dto.status ?? USER_STATUS.ACTIVE,
    });

    try {
      return await this.userRepository.save(newUser);
    } catch (err: unknown) {
      if ((err as { code?: string })?.code === '23505') {
        throw new BadRequestException({ message: 'Email already exists' });
      }
      throw err;
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ withDeleted: true });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException({ message: 'User not found' });
    }
    return user;
  }

  async suspendUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException({ message: 'User not found' });
    }

    user.status = USER_STATUS.SUSPENDED;

    return await this.userRepository.save(user);
  }

  async activateUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException({ message: 'User not found' });
    }

    user.status = USER_STATUS.ACTIVE;

    return await this.userRepository.save(user);
  }

  async softDeleteUser(id: string): Promise<void> {
    const res = await this.userRepository.softDelete(id);
    console.log(res);
    if (!res.affected) {
      throw new NotFoundException('User not found');
    }
  }

  async restoreUser(id: string): Promise<void> {
    const res = await this.userRepository.restore(id);
    if (!res.affected) {
      throw new NotFoundException('User not found or already active');
    }
  }

  async hardDeleteUser(id: string): Promise<void> {
    const res = await this.userRepository.delete(id);
    if (!res.affected) {
      throw new NotFoundException('User not found');
    }
  }

  async findByEmail(email: string) {
  return await this.userRepository.findOne({
    where: { email },
  });
}

}
