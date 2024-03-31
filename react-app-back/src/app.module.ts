import { Module } from '@nestjs/common';
import { TaskListController } from './task-list/task-list.controller';
import { TaskController } from './task/task.controller';
import { TaskListService } from './task-list/task-list.service';
import { TaskService } from './task/task.service';
import { PrismaService } from './prisma/prisma.service';
import { UserActionModule } from './user-actions/user-actions.module';
import { UserActionService } from './user-actions/user-actions.service';

@Module({
  imports: [UserActionModule],
  controllers: [TaskListController, TaskController],
  providers: [TaskListService, TaskService, PrismaService, UserActionService],
})
export class AppModule {}
