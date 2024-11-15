
import { UsersService } from '../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string, 
    pass: string
  ): Promise<{ access_token : string }> {
    const user = await this.userService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const load = {sub: user.id, email: user.email};

    return {
      access_token: await this.jwtService.signAsync(load),
    };
  }
}
