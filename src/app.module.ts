import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';
import { AuthModule } from './auth/auth.module';
// import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    AuthModule]
})
export class AppModule 
// implements NestModule
{
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //   .apply(AuthMiddleware)
  //   .forRoutes('tasks')
  // }

}
