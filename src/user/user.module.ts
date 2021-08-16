import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './dto/user.schema';
import { TaskModule } from '../task/task.module';

@Module({
  imports:  [MongooseModule.forFeature([{ name: 'UserModel', schema: UserSchema }]),
  TaskModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
