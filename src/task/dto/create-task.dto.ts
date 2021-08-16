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


    readonly createDate: Date;

    readonly finishDate: Date;

    @IsBoolean()
    readonly isDone: boolean;
} 