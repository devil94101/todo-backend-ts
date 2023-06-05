import { Injectable } from '@nestjs/common';
import * as userData from '../utils/userData.json'
@Injectable()
export class UserService {

    async getUserDetails() {

        return userData

    }
    
}
