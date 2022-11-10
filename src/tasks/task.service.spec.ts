import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task.model';
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

  it('should get all task for a particular user',async()=>{
    let result:Promise<Task[]>
    jest.spyOn(mockTaskRepository,'getAllTaskForAUser').mockImplementation(()=>result)
    expect(await service.getAllTaskForAUser({user:{id:1}})).toBe(result)
    
  })
  it('get task by Id',async()=>{
    let result:Promise<Task>
    jest.spyOn(mockTaskRepository,'getTasksById').mockImplementation(()=>result)
    expect(await service.getTaskById(1)).toBe(result)
  })
  it('create task',async ()=>{
    let result:Promise<Task>
    jest.spyOn(mockTaskRepository,'createTask').mockImplementation(()=>result)
    expect(await service.createTask({title:'groceries',description:'buy apple'},1)).toBe(result)
  })
  it('update a task',async()=>{
    let result:Promise<Task>
    jest.spyOn(mockTaskRepository,'updateTaskStatus').mockImplementation(()=>result)
    expect(await service.updateTaskStatus(1,TaskStatus.DONE)).toBe(result)
  })
  it('delete a task',async ()=>{
    let result:Promise<void>
    jest.spyOn(mockTaskRepository,'delteTask').mockImplementation(()=>result)
    expect(await service.deleteTask(1)).toBe(result)

  })
});
