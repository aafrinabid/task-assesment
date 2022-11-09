import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt'

import * as jwt from 'jsonwebtoken'
import { UsersRepository } from './users.repository';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private userRepository:UserRepository,
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
