import { Test, TestingModule } from '@nestjs/testing';
import { Task } from './task.entity';
import { TasksService } from "./tasks.service";

describe('TestService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

//   it('should get all task',async()=>{
//     let result:Promise<Task[]>
//     expect(await service.findAllTasks()).toBe(result)
//   })
});
