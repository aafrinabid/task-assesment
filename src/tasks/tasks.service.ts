import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createTaskDto } from './dto/create-task.dto';
import { getSingleTaskDto } from './dto/get-single-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  
    constructor(  
    @InjectRepository(TaskRepository)
    private readonly taskRepository:TaskRepository,
    ){}
    // private tasks:Task[]=[];

    // getAllTasks():Task[]{
    //    return this.tasks
    // }


    createTask(createTaskDto:createTaskDto){
        return this.taskRepository.makeTask(createTaskDto)
    }
    // createTask(createTaskDto:createTaskDto):Task{
    //     const {title,description}=createTaskDto
    //     console.log('inside the services',title,description)
    //     const task:Task={
    //         id:uuidv1(),
    //         title, 
    //         description,
    //         status:TaskStatus.OPEN
    //     }
    //     this.tasks.push(task)
    //     return task
    // }

   async getTaskById (id:number):Promise<Task>{
        console.log(id)
        const found=await Task.findOne({where:{id}});
        if(!found){
            throw new NotFoundException(`Task with this ${id} not find`)
        }

        return found
    }
   
    // getSingleTask(id:string):Task{
    //     let found= this.tasks.find(task=>task.id===id)
    //     if(!found){
    //         throw new NotFoundException('not found task for this ID')
    //     }
    //     return found
    // }

    // updateTaskStatus(id:string,status:TaskStatus){
    //  let task = this.getSingleTask(id)
    //  if(task){
    //     let taskIndex=this.tasks.findIndex(task=>task.id===id)
    //     let updatedTask={...task,status}
    //     let updatedTaskList=[...this.tasks]
    //     updatedTaskList[taskIndex]=updatedTask
    //     this.tasks=updatedTaskList
    //     return updatedTask
    //  }else{
    //     return 'no task found to this id'
    //  }

     
    // }
    // deleteTask(id:string):string{
    //   this.tasks=this.tasks.filter(task=>task.id!==id)  
    //   return 'deleted successfully'
    // }
}
