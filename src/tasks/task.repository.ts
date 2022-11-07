import { DataSource, EntityRepository, Repository } from "typeorm";
import { createTaskDto } from "./dto/create-task.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./task.model";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

   async makeTask(createTaskDto:createTaskDto){
    const {title,description}=createTaskDto;

    const task=new Task()
    task.title=title;
    task.description= description;
    task.status=TaskStatus.OPEN;
    await task.save();

    return task

    
   }


}

// const dataSource=new DataSource()
// export const TaskRepository = dataSource.getRe