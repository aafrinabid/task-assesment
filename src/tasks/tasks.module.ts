import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.stratergy';
import { Task } from './task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports:[TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService,JwtStrategy]
})
export class TasksModule {}
