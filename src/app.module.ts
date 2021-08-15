import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import * as dotenv from "dotenv";
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';

dotenv.config();
@Module({
  imports: [TaskModule,
    MongooseModule.forRoot(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		}),
    UserModule,
    AuthModule,
    TokenModule],
  controllers: [],
  providers: []
})

export class AppModule {}