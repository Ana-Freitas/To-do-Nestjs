import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { TokenDocument } from './token.schema';


@Injectable()
export class TokenService {
    constructor(@InjectModel('TokenModel') private readonly tokenModel: Model<TokenDocument>,
                private userService: UserService,
                @Inject(forwardRef(() => AuthService))
                private authService: AuthService) {}

    async save(username: string, hash: string){
        const objToken = await this.findByUsername(username);
        
        if(objToken){
            return this.tokenModel.updateOne({_id: objToken._id}, {
                hash: hash
            });
        }

        const token = new this.tokenModel({username, hash});
        return token.save();
    }

    async findByUsername(username: string){
        return this.tokenModel.findOne({username});
    }

    async findByToken(token: string){
        return this.tokenModel.findOne({hash: token});
    }

    async refreshToken(oldToken: string) {
        const objToken = await this.findByToken(oldToken);
        if(objToken){
            const user = await this.userService.findByUsername(objToken.username);
            return this.authService.login(user);
        }

        return new HttpException({
            errorMessage: 'Token  invalid!' 
        }, HttpStatus.UNAUTHORIZED)

    }
}