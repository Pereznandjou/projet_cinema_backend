import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';
import { SignUpDto } from 'src/dtos/sign_up.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authservice : AuthService
      ) {}
    
      @Post('sign_up')
      signUp(@Body() dto : SignUpDto) {
        return this.authservice.signUp(dto);
      }
    
      @Post('login')
      @UseGuards(LocalGuard)
      logIn(@Req() req) {
        return this.authservice.logIn(req.user);
      }
    
      @Get('is_connected')
      @UseGuards(JwtGuard)
      isConnected() {
        return {
          status: 'CONNECTED'
        };
      }
}
