import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDto } from './DTOs/singIn.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './public.Dec';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    singIn(@Body() singInDto : SingInDto){
        return this.authService.signIn(singInDto.name, singInDto.pass);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req : Request){
        return req['user'];
    }

}
