import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/check')
  authCheck() {
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/permission')
  getPermission(@Query() params, @Request() req) {
    return this.authService.permission(
      req.user.userId,
      params.page,
      params.list === 'true'
    );
  }
}
