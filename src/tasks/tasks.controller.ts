import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { getSingleTaskDto } from './dto/get-single-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService:TasksService){}

    // @Get()
    // getAllTasks():Task[]{
    //     return this.taskService.getAllTasks();
    // }
 

     
    @Get('/:id')
    getSingleTask(@Param('id',ParseIntPipe) id:number){
        console.log(id)
        return this.taskService.getTaskById(id)
      }
 
    // @Patch('/:id')
    // updataTaskStatus(@Param('id')id:string,@Body('status')status:TaskStatus){
    //      return this.taskService.updateTaskStatus(id,status)
    // }  

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto:createTaskDto):Promise<Task>{
        return this.taskService.createTask(createTaskDto)

    }

    // @Delete('/:id')
    // deleteTask(@Param('id') id:string){
    //   return this.taskService.deleteTask(id)
    // }

    

   
}
