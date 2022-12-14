import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
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
    getAllTasksForAUser(@Request()req:any):Promise<Task[]>{
        return this.taskService.getAllTaskForAUser(req);
    }
 

    @Get('/alltasks')
    findAllTask(){
      return this.taskService.findAllTasks()
    }

     
    @Get('/:id')
    @UseGuards(AuthGuard('jwt'))
    getSingleTask(@Param('id',ParseIntPipe) id:number):Promise<Task>{
        return this.taskService.getTaskById(id)
      }
 
    @Patch('/:id')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    updataTaskStatus(@Param('id',ParseIntPipe)id:number ,@Body('status',TaskStatusValidationPipe)status:TaskStatus){
        
         return this.taskService.updateTaskStatus(id,status)
    }  

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto:createTaskDto,@Request()req:any):Promise<Task>{
        return this.taskService.createTask(createTaskDto,req)

    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'))
    deleteTask(@Param('id') id:number){
    return this.taskService.deleteTask(id)
    }

    

   
}
