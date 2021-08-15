import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../token/token.service';
@Injectable()
export class AuthService {
  constructor(private usersService: UserService,
              private jwtService: JwtService,
              private tokenService: TokenService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user: any = await this.usersService.findByUsername(username);
    if(user && bcrypt.compareSync(pass, user.password)){
      const { password, ...result } = user._doc;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    const token = this.jwtService.sign(payload);
    this.tokenService.save(user.username, token);
    return {
      access_token: token,
    };
  }
}