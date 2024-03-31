import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserActionModule } from 'src/user-actions/user-actions.module';
import { TaskListModule } from 'src/task-list/task-list.module';

@Module({
  imports: [PrismaModule, UserActionModule, TaskListModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
