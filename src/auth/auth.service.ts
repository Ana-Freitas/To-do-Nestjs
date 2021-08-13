import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user: any = await this.usersService.findByUsername(username);
    if(user && bcrypt.compareSync(pass, user.password)){
      const { password, ...result } = user._doc;
      return { status: 'Authorized', data: result };
    }
    return null;
  }
}