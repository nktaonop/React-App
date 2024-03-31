import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskList } from '.prisma/client';
import { UserActionService } from 'src/user-actions/user-actions.service';

@Injectable()
export class TaskListService {
  constructor(
    private prisma: PrismaService,
    private userActionService: UserActionService,
  ) {}

  async findAll(): Promise<TaskList[]> {
    return this.prisma.taskList.findMany({
      include: { tasks: true },
    });
  }

  async create(data: { name: string }): Promise<TaskList> {
    const createdTaskList = await this.prisma.taskList.create({ data });

    await this.userActionService.logAction({
      title: `You created task list <b>${createdTaskList.name}</b>`,
      taskList: {
        connect: {
          id: createdTaskList.id,
        },
      },
    });

    return createdTaskList;
  }

  async delete(id: string): Promise<TaskList> {
    const list = await this.prisma.taskList.findUnique({
      where: { id: parseInt(id) },
      include: { tasks: true },
    });

    await this.prisma.task.deleteMany({
      where: { taskListId: parseInt(id) },
    });

    await this.prisma.taskList.delete({
      where: { id: parseInt(id) },
    });

    await this.userActionService.logAction({
      title: `You delete task list <b>${list.name}</b>`,
    });

    return list;
  }

  async updatename(id: string, name: string): Promise<TaskList> {
    const list = await this.prisma.taskList.findUnique({
      where: { id: parseInt(id) },
    });

    const updatedTaskList = await this.prisma.taskList.update({
      where: { id: parseInt(id) },
      data: { name: name },
    });

    await this.userActionService.logAction({
      title: `You renamed task list from <b>${updatedTaskList.name}</b> to <b>${list.name}</b>`,
      taskList: {
        connect: {
          id: list.id,
        },
      },
    });

    return updatedTaskList;
  }

  async findOne(id: number): Promise<TaskList> {
    return this.prisma.taskList.findUnique({
      where: { id },
    });
  }
}
