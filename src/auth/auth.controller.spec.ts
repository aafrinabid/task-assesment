import { JwtService } from "@nestjs/jwt";
import { Test,TestingModule } from "@nestjs/testing";
import {AuthController} from './auth.controller'
import {AuthService} from './auth.service'
describe('AuthController',()=>{
    let controller:AuthController;
    let service:AuthService
    let jwtService:JwtService
   
    beforeEach(async () =>{
        const module:TestingModule=await Test.createTestingModule({
            controllers:[AuthController],
            providers:[AuthService,JwtService],
        })

        .compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
        jwtService = module.get<JwtService>(JwtService)
    })
    it('should be definded',()=>{
        expect(controller).toBeDefined();
    })
    it('sign up',async()=>{
        let result:undefined|null
        jest.spyOn(service,'signUp').mockImplementation(()=>result)
        expect(controller.signUp({username:'aafrin',password:'aafrin'})).toBe(result)
    })
    it('sign in user',async()=>{
        let result :Promise<{username:string,token:string}>
        jest.spyOn(service,'signIn').mockImplementation(()=>result)
        expect(controller.signIn({username:'aafrin',password:'aafrin'})).toBe(result)
    })
  
});