import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
   async signUp(authCredentialsDto: AuthCredentialsDto):Promise<void>{
   try{
    const {username,password}=authCredentialsDto
   const user= new User
   user.username= username;
   user.password= password;
   user.save();

   }catch(e){
    console.log(e)
   }
   }
}