import { ConflictException, Injectable, NestMiddleware } from "@nestjs/common";
import { Request,Response,NextFunction } from "express";
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
use(req:Request, res: Response, next: (error?: any) => void) {
    const token = req.headers['x-access-token']
    if(!token){
        throw new ConflictException('No token is present')
    }else{
        jwt.verify(token,'jwtsecret',(err,decoded)=>{
            if(err){
                throw new ConflictException('Authorization failed please login again')
            }else{
                req.body.userId=decoded.id
                console.log(decoded.id,req.body.userId)
                
            }
        })
    }
    next()  
}
}