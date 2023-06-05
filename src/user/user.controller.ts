import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/utils/auth.gaurd';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Get('/details')
    async getUserDetails(){
        return this.userService.getUserDetails()
    }

}
