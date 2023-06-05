import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { successResponse } from '../utils/responseHandler';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService   ) { }

    @Post('/login')
    async login(@Body() body: LoginDto, @Res() res) {
        try {
            let response = await this.authService.login(body.email, body.password);
            // res.cookie('refreshToken', response.refreshToken, {
            //     httpOnly: true,
            //     expires: new Date(Date.now() + (24 * 60 * 60 * 1000)),
            //     sameSite: 'strict',
            //     secure: true,
            //     signed: true
            // })
            return successResponse(res, HttpStatus.OK, response.data)
        }
        catch (err) {
            throw new HttpException(err.message, err.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    @Get('/refreshToken')
    async refreshToken(@Req() req, @Res() res) {
        let cookie = req?.signedCookies
        try {
            let response = await this.authService.getNewToken(cookie.refreshToken);
            return successResponse(res, HttpStatus.OK, response.data)
        } catch (err) {
            throw new HttpException(err.message, err.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


}
