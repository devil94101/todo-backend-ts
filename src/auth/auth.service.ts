import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compareJWT, createJWT } from '../helpers/auth.helper';
import { IAuth } from './auth.interface';
import userData from '../utils/userData.json'
@Injectable()
export class AuthService implements IAuth {

    constructor() { }

    async login(email: string, password: string) {

        try {


            if (!email || !password) {
                throw new HttpException('All feilds are required!', HttpStatus.BAD_REQUEST)
            }

            let findUserIdx = userData.findIndex(ele => {
                if (ele.email === email && ele.password == password) {
                    return true
                }
                return false
            })

            if (findUserIdx === -1) {
                throw new HttpException('Invalid email or password!', HttpStatus.BAD_REQUEST)
            }

            let userId = userData[findUserIdx].id
            let name = userData[findUserIdx].name

            let userAuthToken = await createJWT({
                email: email,
                id: userId,
                name
            });
            let refreshToken = await createJWT({
                email: email,
                id: userId,
                name
            }, '30d', true);
            return {
                data: {
                    token: userAuthToken,
                    email: email,
                    id: userId,
                    name
                },
                refreshToken,
            }
        }
        catch (err) {
            console.log(err)
            throw new HttpException(err.message, err.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    async getNewToken(token: string) {
        try {
            if (!token) {
                throw new HttpException('No token found', HttpStatus.BAD_REQUEST)
            }

            let decodedToken = await compareJWT(token, true)
            if (decodedToken['error']) {
                throw new HttpException('Session expired! Login Again', HttpStatus.UNAUTHORIZED)
            }
            let newToken = await createJWT({
                id: decodedToken['id'],
                email: decodedToken['email'],
                name: decodedToken['name'],
            })

            return {
                data: {
                    token: newToken,
                    id: decodedToken['id'],
                    email: decodedToken['email'],
                    name: decodedToken['name'],
                }

            }

        } catch (err) {
            throw new HttpException(err.message, err.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
