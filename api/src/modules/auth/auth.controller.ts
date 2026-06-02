import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpData: SignupDto) {
    const user = await this.authService.signUp(signUpData);
    return {
      success: true,
      data: user,
      message: 'User created successfully',
    };
  }

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    const user = await this.authService.login(loginData);

    return {
      success: true,
      data: user,
      message: 'User logged in successfully',
    };
  }
}
