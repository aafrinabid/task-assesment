import { ConflictException } from "@nestjs/common";
import { AppDataSource } from "src/tasks/app-data-source";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";


export const UsersRepository = AppDataSource.getRepository(User).extend({
    async singUp(authCredentialsDto:AuthCredentialsDto){
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

    },
    async singIn(authCredentialsDto:AuthCredentialsDto,jwtService:JwtService){
        const {username,password}=authCredentialsDto
        const user= await User.findOne({where:{username}})
        if(user && await bcrypt.compare(password,user.password)){
          
            const token =  jwtService.sign({id:user.id})
            return {username:user.username,token}
    }
}
})