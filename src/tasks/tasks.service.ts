import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import {v1 as uuidv1} from 'uuid'
import { createTaskDto } from './dto/create-task.dto';

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

    updateTask(id:string){
        
    }
}
