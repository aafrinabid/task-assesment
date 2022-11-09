import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.stratergy';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports:[TypeOrmModule.forFeature([TaskRepository])],
  controllers: [TasksController],
  providers: [TasksService,JwtStrategy]
})
export class TasksModule {}
