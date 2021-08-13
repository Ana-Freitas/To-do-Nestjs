import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './dto/user.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {

  constructor(@InjectModel("UserModel") private userModel: Model<UserDocument>){}
  
  public async create(createUserDto: CreateUserDto) {
    if(await this.findOne(createUserDto._id)){ 
      throw new ConflictException({
        statusCode: 409,
        message: "The user already exist"
      });
    }
    
    const userCreated =  new this.userModel(createUserDto)
    userCreated.password = bcrypt.hashSync(createUserDto.password, 8);
    return userCreated.save()
  }

  public async findAll() {
    return this.userModel.find().exec();
  }

  public async findOne(id: number) {
    return this.userModel.findById(id);
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ _id: id }, updateUserDto);
  }

  public async remove(id: number) {
    return this.userModel.findByIdAndDelete(id);
  }

  public async findByUsername(username: string) {
    return this.userModel.findOne({ username: username });
  }
}
