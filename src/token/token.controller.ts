import { Body, Controller, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RefreshTokenDto } from "./refresh-token.dto";
import { TokenService } from "./token.service";

@ApiTags("token")
@Controller('token')
export class TokenController {
    constructor(private tokenService: TokenService){}

    @Put('refresh')
    async refreshToken(@Body() data: RefreshTokenDto){
        return this.tokenService.refreshToken(data.oldToken)
    }
}
