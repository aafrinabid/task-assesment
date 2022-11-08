import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService:TasksService){}

    @Get()
    getAllTasks():Promise<Task[]>{
        return this.taskService.getAllTask();
    }
 

     
    @Get('/:id')
    getSingleTask(@Param('id',ParseIntPipe) id:number){
        console.log(id)
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
