import { Test,TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../auth/user.entity";
import {AuthController} from './auth.controller'
import {AuthService} from './auth.service'
describe('TaskController',()=>{
    let controller:AuthController;

    const mockUserService={}

    beforeEach(async () =>{
        const module:TestingModule=await Test.createTestingModule({
            // imports:[TypeOrmModule.forFeature([User])],
            controllers:[AuthController],
            providers:[AuthController]
        })
        .overrideProvider(AuthService)
        .useValue(mockUserService).
        compile();
    })
    it('should be definded',()=>{
        expect(controller).toBeDefined();
    })
});