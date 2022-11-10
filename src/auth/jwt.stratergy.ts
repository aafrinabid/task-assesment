import {Strategy,ExtractJwt} from 'passport-jwt'
import { Injectable } from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport'


 @Injectable()
 export class JwtStrategy extends PassportStrategy(Strategy){
constructor(){
    super({
       jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
       secretOrKey:'secret'
    })
}
validate(payload:any){
    console.log(payload)
    return {id:payload.id}
}
 }