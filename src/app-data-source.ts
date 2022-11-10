import { User } from "./auth/user.entity";
import { DataSource } from "typeorm";
import { Task } from "./tasks/task.entity";

export const AppDataSource= new DataSource({
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'postgres',
    database:'taskmanagement',
    entities:[Task,User],
    synchronize:true

})

AppDataSource.initialize()
