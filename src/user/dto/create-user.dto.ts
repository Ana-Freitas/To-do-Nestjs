import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {

    @IsNumber()
    @IsNotEmpty()
    readonly _id: number;

    @IsString()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}
