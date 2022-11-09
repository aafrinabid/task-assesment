import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Not } from 'typeorm';
import { createTaskDto } from './dto/create-task.dto';
import { getSingleTaskDto } from './dto/get-single-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.model';
import { TaskRepository } from './task.repository';
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
       const alltask=await TasksRepository.findAllTask()
       return alltask
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
   


    async updateTaskStatus(id:number,status:TaskStatus){
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
