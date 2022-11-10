import {Injectable, NotFoundException } from '@nestjs/common';

import { createTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.model';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  
    constructor(){}

    async getAllTask(req:any ):Promise<Task[]>{
        try{
        return TasksRepository.getAllTask(req)

        }catch(e){
            console.log(e)
        }


    }

    async findAllTasks(){
        try{

            const alltask=await TasksRepository.findAllTask()
            return alltask
        }catch(e){
            console.log(e)
        }
    }

  

   async createTask(createTaskDto:createTaskDto,req:any){
    try{
        return TasksRepository.createTask(createTaskDto,req)
    }catch(e){
        console.log(e)
    }
  

    }


   async getTaskById (id:number):Promise<Task>{
    try{
        return TasksRepository.getTasksById(id)
    }catch(e){
        console.log(e)
    }
        
    }
   


    async updateTaskStatus(id:number,status:TaskStatus):Promise<Task>{
        try{
          
            return TasksRepository.updateTaskStatus(id,status)

        }catch(e){
            console.log(e)
        }
      
    }



     
    async deleteTask(id:number):Promise<void>{
        try{
           return TasksRepository.delteTask(id)

        }catch(e){
            console.log(e)
        }
       
    }
   
}
