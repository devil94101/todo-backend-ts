import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpStatus,
    HttpException,
  } from '@nestjs/common';
import { compareJWT } from '../helpers/auth.helper';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
  
    constructor() { }
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
  
      const request = context.switchToHttp().getRequest();
  
      // if (this.constant.skipAuth().includes(trimCharsStart('/', request.routerPath))) {
      //   // profiler.end();
      //   return true;
      // }

      if (!request.headers || !request.headers.token) {
        throw new HttpException('No Token Found!', HttpStatus.UNAUTHORIZED);
      }
  
      const token = request.headers.token;
      try {
        let userDetails = await compareJWT(token);
        console.log(userDetails)
        if (userDetails['error']) {
          throw new HttpException(userDetails['status'], HttpStatus.UNAUTHORIZED);
        } else {
          // save user id
          request.userId = userDetails['id']
        }
        return true;
      } catch (err) {
        throw new HttpException("Invalid Token!", err.status || HttpStatus.UNAUTHORIZED);
      }
  
    }
  
  }
  