import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { request } from 'http';
import { createTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import {AuthGuard} from '@nestjs/passport'

@Controller('tasks')
export class TasksController {
    constructor(private taskService:TasksService){}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    getAllTasks(@Request()req:any):Promise<Task[]>{
      console.log(req.user,'inside controller')
        return this.taskService.getAllTask(req);
    }
 

     
    @Get('/:id')
    getSingleTask(@Param('id',ParseIntPipe) id:number,@Body('userId')userId:number){
        console.log(id,userId)
        return this.taskService.getTaskById(id)
      }
 
    @Patch('/:id')
    @UsePipes(ValidationPipe)
    updataTaskStatus(@Param('id',ParseIntPipe)id:number ,@Body('status',TaskStatusValidationPipe)status:TaskStatus){
        
         return this.taskService.updateTaskStatus(id,status)
    }  

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto:createTaskDto):Promise<Task>{
        return this.taskService.createTask(createTaskDto)

    }

    @Delete('/:id')
    deleteTask(@Param('id') id:number){
      return this.taskService.deleteTask(id)
    }

    

   
}
