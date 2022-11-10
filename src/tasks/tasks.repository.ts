import { Task } from "./task.entity";
import { AppDataSource } from "../app-data-source";
import { User } from "../auth/user.entity";
import { TaskStatus } from "./task.model";
import { createTaskDto } from "./dto/create-task.dto";
import { NotFoundException } from "@nestjs/common";

export const TasksRepository = AppDataSource.getRepository(Task).extend({
    async findAllTask(){
       const tasks=await Task.find()
       return tasks

    },
    async getAllTask(req:any){
            const allTask= await Task.getRepository()
            .createQueryBuilder('tasks')
            .leftJoinAndSelect('tasks.user','user')
            .select(['tasks.id','tasks.title','tasks.description','user.username'])
            .where('user.id=:userId',{userId:req.user.id})
            
            .getMany();
            return allTask
    },
    async createTask(createTaskDto:createTaskDto,req:any){
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
    },
    async getTasksById(id:number){
        const found=await Task.findOne({where:{id}});
        if(!found){
            throw new NotFoundException(`Task with this ${id} not find`)
        }

        return found

    },
    async updateTaskStatus(id:number,status:TaskStatus){
        let task= await this.getTaskById(id)
        if(task){
            task.status=status
            await task.save()
            return task
        }else{
            throw new NotFoundException('no task for this'+id+' '+'found')
        }
    },
    async delteTask(id:number){
        const task=await this.getTaskById(id)
        if(task){

            await Task.delete(id)
        }else{
            throw new NotFoundException('no task for this id is found')
        }
    }
})



