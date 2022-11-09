import {  Injectable, InternalServerErrorException} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import {JwtService} from '@nestjs/jwt'

import { UsersRepository } from './users.repository';
@Injectable()
export class AuthService {
    constructor(
        private jwtService:JwtService
        ){}

      async  signUp(authCredentialsDto:AuthCredentialsDto):Promise<User|void>{
        try{
           return UsersRepository.singUp(authCredentialsDto)
           }catch(e){
            throw new InternalServerErrorException();
           }
        }

        async signIn(authCredentialsDto:AuthCredentialsDto):Promise<{}>{
            try{
                return UsersRepository.singIn(authCredentialsDto,this.jwtService)
            }catch(e){
                console.log(e)
            }
        }
}
