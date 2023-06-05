
export interface IAuth {
    login(email: string, password: string);
    getNewToken(token: string);
}
