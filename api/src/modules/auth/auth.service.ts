import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignupDto } from './dtos/signup.dto';
import * as argon2 from 'argon2';
import { LoginDto } from './dtos/login.dto';

export interface AuthResponse {
  access_token: string;
  user: Omit<User, 'password_hash'>;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginData: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginData;
    const normalizedEmail = email.trim().toLowerCase();

    const user = await this.userRepository.findOne({ where: { email: normalizedEmail } });
    if (!user) throw new BadRequestException('Email hoặc mật khẩu không đúng');

    const passwordMatch = await argon2.verify(user.password_hash, password);
    if (!passwordMatch) throw new BadRequestException('Email hoặc mật khẩu không đúng');

    const access_token = this.jwtService.sign({ sub: user.id, email: user.email });

    const { password_hash: _, ...safeUser } = user;
    return { access_token, user: safeUser as Omit<User, 'password_hash'> };
  }

  async signUp(signupData: SignupDto): Promise<User> {
    const { email, password, full_name } = signupData;

    const normalizedEmail = email.trim().toLowerCase();

    const emailInUse = await this.userRepository.findOne({
      where: { email: normalizedEmail },
    });
    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }

    const password_hash = await argon2.hash(password);

    // Tạo entity (gán default tùy schema của bạn)
    const newUser = this.userRepository.create({
      email: normalizedEmail,
      password_hash,
      full_name,
      provider: 'local',
      email_verified: false,
      // role/status dùng default trong entity của bạn: USER / ACTIVE
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
}
