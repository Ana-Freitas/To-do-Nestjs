import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {

    @IsNotEmpty()
    readonly id: number;

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