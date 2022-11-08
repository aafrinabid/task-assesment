import { DataSource, EntityRepository, Repository } from "typeorm";
import { createTaskDto } from "./dto/create-task.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./task.model";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

   

}

