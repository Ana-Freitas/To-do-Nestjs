import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenDto {

  @IsString()
  @IsNotEmpty()
  readonly oldToken: string;

}