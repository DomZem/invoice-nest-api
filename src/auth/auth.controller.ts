import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(
    @Body() data: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...result } = data;

    const user = await this.userService.create(result);

    await this.authService.setAuthToken(res, { userId: user.id });

    delete user.password;

    return user;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() data: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.login(data);

    await this.authService.setAuthToken(res, { userId: user.id });

    delete user.password;

    return user;
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    await this.authService.clearAuthToken(res);

    return res.json({ message: 'Logged out' });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req) {
    const user = await this.userService.findUnique({
      id: req.user.id,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    delete user.password;

    return user;
  }
}
