import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
   private authService:AuthService
    ){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto):Promise<User|void>{
  return this.authService.signUp(authCredentialsDto)
    }

    @Post('/signIn')
    signIn(@Body(ValidationPipe)authCredentialsDto:AuthCredentialsDto):Promise<{}>{
        return this.authService.signIn(authCredentialsDto)
    }

   

}
