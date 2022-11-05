import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import {v1 as uuidv1} from 'uuid'
import { createTaskDto } from './dto/create-task.dto';
import { getSingleTaskDto } from './dto/get-single-task.dto';

@Injectable()
export class TasksService {
    private tasks:Task[]=[];

    getAllTasks():Task[]{
       return this.tasks
    }

    createTask(createTaskDto:createTaskDto):Task{
        const {title,description}=createTaskDto
        console.log('inside the services',title,description)
        const task:Task={
            id:uuidv1(),
            title, 
            description,
            status:TaskStatus.OPEN
        }
        this.tasks.push(task)
        return task
    }
   
    getSingleTask(id:string):Task{
        return this.tasks.find(task=>task.id===id)
    }

    updateTaskStatus(id:string,status:TaskStatus){
     let task = this.tasks.find(task=>task.id===id)
     if(task){
        let taskIndex=this.tasks.findIndex(task=>task.id===id)
        let updatedTask={...task,status}
        let updatedTaskList=[...this.tasks]
        updatedTaskList[taskIndex]=updatedTask
        this.tasks=updatedTaskList
        return updatedTask
     }else{
        return 'no task found to this id'
     }

     
    }
    deleteTask(id:string):string{
      this.tasks=this.tasks.filter(task=>task.id!==id)  
      return 'deleted successfully'
    }
}
