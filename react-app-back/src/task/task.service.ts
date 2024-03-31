import { TaskListService } from './../task-list/task-list.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task, TaskList } from '.prisma/client';
import { UserActionService } from 'src/user-actions/user-actions.service';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private userActionService: UserActionService,
    private taskListService: TaskListService,
  ) {}

  async create(
    data: {
      name: string;
      description: string;
      dueDate: string;
      priority: string;
    },
    listId: number,
  ): Promise<Task> {
    const createdTask = await this.prisma.task.create({
      data: {
        ...data,
        taskListId: listId,
      },
    });

    await this.userActionService.logAction({
      title: `You created task <b>${createdTask.name}</b>`,
      task: {
        connect: {
          id: createdTask.id,
          taskListId: createdTask.taskListId,
        },
      },
    });

    return createdTask;
  }

  async delete(id: number): Promise<Task> {
    const deletedTask = await this.prisma.task.delete({
      where: { id },
    });

    await this.userActionService.logAction({
      title: `You deleted task <b>${deletedTask.name}</b>`,
    });

    return deletedTask;
  }

  async update(
    id: number,
    data: {
      name?: string;
      description?: string;
      dueDate?: string;
      priority?: string;
    },
  ): Promise<Task> {
    await this.prisma.task.findUnique({
      where: { id },
    });

    const updatedTask = await this.prisma.task.update({
      where: { id },
      data,
    });

    await this.userActionService.logAction({
      title: `You updated task <b>${updatedTask.name}</b>`,
      task: {
        connect: {
          id: updatedTask.id,
        },
      },
    });

    return updatedTask;
  }

  async moveTask(taskId: string, targetListId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id: parseInt(taskId) },
    });

    const originalTaskListItem = await this.taskListService.findOne(
      task.taskListId,
    );

    const newTaskListItem = await this.taskListService.findOne(
      parseInt(targetListId),
    );

    const updatedTask = await this.prisma.task.update({
      where: { id: parseInt(taskId) },
      data: { taskListId: parseInt(targetListId) },
    });

    await this.userActionService.logAction({
      title: `You moved task <b>${task.name}</b> from <b>${originalTaskListItem.name}</b> to <b>${newTaskListItem.name}</b>`,
      task: {
        connect: {
          id: updatedTask.id,
        },
      },
    });

    return updatedTask;
  }
}
