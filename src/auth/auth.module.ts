import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import {JwtModule} from '@nestjs/jwt'
import { JwtStrategy } from './jwt.stratergy';

@Module({
  imports:[TypeOrmModule.forFeature([User]),JwtModule.register({secret:'secret',signOptions:{
    expiresIn:'60m'
  }})],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[JwtStrategy]
})
export class AuthModule {}
