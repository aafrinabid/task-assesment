import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { getSingleTaskDto } from './dto/get-single-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService:TasksService){}

    @Get()
    getAllTasks():Task[]{
        return this.taskService.getAllTasks();
    }

    @Get('/:id')
    getSingleTask(@Param('id') id:string){
        console.log(id)
        return this.taskService.getSingleTask(id)
      }

    @Patch('/:id')
    updataTaskStatus(@Param('id')id:string,@Body('status')status:TaskStatus){
  return this.taskService.updateTaskStatus(id,status)
    }  

    @Post()
    createTask(@Body() createTaskDto:createTaskDto):Task{
        return this.taskService.createTask(createTaskDto)

    }

   
}
