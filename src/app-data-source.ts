import { User } from "src/auth/user.entity";
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
.then(()=>{
    console.log('database initiliased')
})
.catch((err)=>{
    console.log(err)
})
