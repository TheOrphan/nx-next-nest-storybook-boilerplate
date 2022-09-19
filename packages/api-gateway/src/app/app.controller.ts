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
import { AppService } from './app.service';
import { ApiTags, ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthDto } from '../auth/dto/auth.dto';
import { PermissionDto } from '../auth/dto/permission.dto';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private appService: AppService
  ) {}

  @Get()
  welcome() {
    return this.appService.getData();
  }

  @ApiTags('Auth')
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({ type: AuthDto })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiTags('Auth')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('auth/check')
  authCheck() {
    return true;
  }

  @ApiTags('Auth')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('auth/permission')
  @ApiQuery({ type: PermissionDto })
  getPermission(@Query() params, @Request() req) {
    return this.authService.permission(
      req.user.userId,
      params.page,
      params.list === 'true'
    );
  }
}
