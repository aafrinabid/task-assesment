import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private userRepository:UserRepository
        ){}

      async  signUp(authCredentialsDto:AuthCredentialsDto):Promise<User|void>{
        try{
            const {username,password}=authCredentialsDto
            const found = await User.findOne({where:{username:username}})
            if(found){
                console.log(found)
                 throw new ConflictException('user already exist')
            }
           const user= new User
           const hashPassword= await bcrypt.hash(password,10)

           user.username= username;
           user.password= hashPassword;
           await user.save();

           return user
           }catch(e){
            throw new InternalServerErrorException();
           }
        }

        async signIn(authCredentialsDto:AuthCredentialsDto):Promise<{}>{
            try{
                const {username,password}=authCredentialsDto
                const user= await User.findOne({where:{username}})
                if(user && await bcrypt.compare(password,user.password)){
                    const token=jwt.sign({id:user.id},'jwtsecret',{
                        expiresIn:3000,
                    })
                    return {username:user.username,token}
                }else{
                    return 'password or username is wrong'
                }



            }catch(e){
                console.log(e)
            }
        }
}
