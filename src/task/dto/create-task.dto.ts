import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTaskDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly _id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @ApiProperty()
    @IsString()
    readonly description: string;

    @ApiProperty()
    readonly createDate: Date;

    @ApiProperty()
    readonly finishDate: Date;

    @ApiProperty({ default: false })
    @IsBoolean()
    readonly isDone: boolean;
} 