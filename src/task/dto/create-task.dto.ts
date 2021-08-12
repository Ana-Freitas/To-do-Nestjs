import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTaskDto {

    
    @IsNotEmpty()
    @IsNumber()
    readonly _id: number;

    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    readonly description: string;

    @IsDate()
    readonly createDate: Date;

    @IsDate()
    readonly finishDate: Date;

    @IsBoolean()
    readonly isDone: boolean;

    @IsNumber()
    @IsNotEmpty()
    readonly user: number;
} 