import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';


import { TokenController } from './token.controller';
import { TokenSchema } from './token.schema';
import { TokenService } from './token.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'TokenModel', schema: TokenSchema }]), 
  forwardRef(() => AuthModule),
  UserModule],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}
