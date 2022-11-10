import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import {UsersRepository} from './users.repository'
describe('AuthService', () => {
  let service: AuthService;
  let mockUserRepository = UsersRepository
  let jwtService: JwtService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,JwtService],
    }).compile();
    

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('sign up the usep',async()=>{
    let result=undefined
    jest.spyOn(mockUserRepository,'singUp').mockImplementation(()=>result)
    expect(await service.signUp({username:'aafrin',password:'aafrin'})).toBe(result)

  })
  it('sign in of user',async ()=>{
  let repositoryResult:Promise<User>
  let token:string
  jest.spyOn(mockUserRepository,'singIn').mockImplementation(()=>Promise.resolve(repositoryResult) )
  jest.spyOn(jwtService,'sign').mockImplementation(()=>token)
  let finalResult :Promise<{username:string,token:string}>
  expect(await service.signIn({username:'aafrin',password:'aafrin'})).toBe(finalResult)
  })
});