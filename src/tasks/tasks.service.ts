import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Not } from 'typeorm';
import { createTaskDto } from './dto/create-task.dto';
import { getSingleTaskDto } from './dto/get-single-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.model';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  
    constructor(  
    @InjectRepository(TaskRepository)
    private readonly taskRepository:TaskRepository,
    ){}

    async getAllTask(req:any ):Promise<Task[]>{
        try{
        const user= await User.findOne({where:{id:req.user.id}})  
            const allTask= await Task.getRepository()
            .createQueryBuilder('tasks')
            .leftJoinAndSelect('tasks.user','user')
            .where('user.id=:userId',{userId:req.user.id})
            
            .getMany();
            return allTask

        }catch(e){
            console.log(e)
        }


    }

  

   async createTask(createTaskDto:createTaskDto,req:any){
    try{
        console.log(req.user.id)
        const userId=req.user.id
        const {title,description}=createTaskDto;
        const user= await User.findOne({where:{id:userId}})
        const task=new Task()
        task.title=title;
        task.description= description;
        task.status=TaskStatus.OPEN;
        task.user=user
        await task.save();
    
        return task
    }catch(e){
        console.log(e)
    }
  

    }


   async getTaskById (id:number):Promise<Task>{
    try{
        const allTask= await Task.getRepository()
            .createQueryBuilder('tasks')
            .leftJoinAndSelect('tasks.user','user')
            .where('task.userId=:userId',{userId:1})
            .andWhere('task.id=:id',{id})
            .getOne();
            console.log(allTask,'all task is here')
        const found=await Task.findOne({where:{id}});
        if(!found){
            throw new NotFoundException(`Task with this ${id} not find`)
        }

        return found
    }catch(e){
        console.log(e)
    }
        
    }
   


    async updateTaskStatus(id:number,status:TaskStatus){
        try{
            let task= await this.getTaskById(id)
            if(task){
                task.status=status
                await task.save()
                return task
            }else{
                throw new NotFoundException('no task for this'+id+' '+'found')
            }

        }catch(e){
            console.log(e)
        }
      
    }



     
    async deleteTask(id:number):Promise<void>{
        try{
            const task=await this.getTaskById(id)
            if(task){
    
                await Task.delete(id)
            }else{
                throw new NotFoundException('no task for this id is found')
            }

        }catch(e){
            console.log(e)
        }
       
    }
   
}
