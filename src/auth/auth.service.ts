
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from 'src/dtos/sign_up.dto';

export const jwtConstants = {
    secret: process.env.JWT_PASS
  }

@Injectable()
export class AuthService {
    constructor(
        private prisma : PrismaService,
        private jwtService : JwtService
      ) {}
    
      async signUp(dto : SignUpDto) {
        if (dto.password !== dto.confirm_password)
          throw new BadRequestException('Confirm does not correspond to password !');
        try {
          await this.prisma.user.create({
            data: {
              email: dto.email,
              hashed_password: await bcrypt.hash(dto.password, 10),
              firstName: dto.first_name
            }
          });
    
          return {
            status: 'SUCCESS'
          };
        } catch (e) {
          console.log(e);
          if (e instanceof PrismaClientKnownRequestError) {
           if (e.code === 'P2002') 
            throw new ConflictException('Email is already in db !');
          }
          throw new InternalServerErrorException('Unknow Error.');
        }
      }
    
      async logIn(user) {
        const payload = { username: user.username, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
          user_id: user.id
        };
      }
     
      async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
          where: { email: email }
        });
    
        if (user) {
          if (await bcrypt.compare(password, user.hashed_password)) {
            return user;
          }
        }
    
        return null;
      }
}
