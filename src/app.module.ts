import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import * as dotenv from "dotenv";
import { MongooseModule } from '@nestjs/mongoose';

dotenv.config();
@Module({
  imports: [TaskModule,
    MongooseModule.forRoot(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		}),],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}