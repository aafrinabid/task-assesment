import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { TasksService } from "./tasks.service";

describe('TestService', () => {
  let service: TasksService;
  let mockTaskRepository = TasksRepository
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();
    

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all task',async()=>{
    let result
    result = await mockTaskRepository.findAllTask()
    expect(service.findAllTasks()).toBe(result)

  })
});
