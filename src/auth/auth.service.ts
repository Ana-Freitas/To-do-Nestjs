import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user: any = await this.usersService.findByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user._doc;
      return { status: 'Authorized', data: result };
    }
    return null;
  }
}