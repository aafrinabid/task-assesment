import { Request } from "@nestjs/common";
import { Test,TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../auth/user.entity";
import { Task } from "./task.entity";
import { TaskStatus } from "./task.model";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";

describe('TaskController',()=>{
    let controller:TasksController;
    let service:TasksService;

    const mockUserService={}

    beforeEach(async () =>{
        const module:TestingModule=await Test.createTestingModule({
            controllers:[TasksController],
            providers:[TasksService]
        })

        .compile();
        controller = module.get<TasksController>(TasksController)
        service =  module.get<TasksService>(TasksService)
    })
    it('should be definded',()=>{
        expect(controller).toBeDefined();
    })
    it('findAll',async()=>{
        let result:Promise<Task[]>
        jest.spyOn(service,'findAllTasks').mockImplementation(()=>result)

        expect(await controller.findAllTask()).toBe(result)
    })
    it('get Tasks for user',async()=>{
        let result:Promise<Task[]>
        jest.spyOn(service,'getAllTask').mockImplementation(()=>result)
        expect(await controller.getAllTasks(1)).toBe(result)
    })
    it('get task by id',async ()=>{
        let result:Promise<Task>;
        jest.spyOn(service,'getTaskById').mockImplementation(()=>result)
        expect(await controller.getSingleTask(1)).toBe(result)
    })
    it('delete Task for particular ID',async()=>{
        let result:null|undefined
        jest.spyOn(service,'deleteTask').mockImplementation(()=>result)
        expect(await controller.deleteTask(1)).toBe(result)
        })

    it('update a task',async ()=>{
        let result: Promise<Task>
        jest.spyOn(service,'updateTaskStatus').mockImplementation(()=>result)
        expect(await controller.updataTaskStatus(1,TaskStatus.DONE)).toBe(result)
    })
});

