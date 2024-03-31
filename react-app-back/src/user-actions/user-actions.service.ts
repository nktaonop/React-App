import { Injectable } from '@nestjs/common';
import { Prisma, UserAction } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserActionService {
  constructor(private prisma: PrismaService) {}

  async getAllUserActions(): Promise<UserAction[]> {
    return this.prisma.userAction.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getUserActionsById(taskId: number): Promise<UserAction[]> {
    return this.prisma.userAction.findMany({
      where: { taskId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getLogsOfTask(taskId: number): Promise<UserAction[]> {
    return this.prisma.userAction.findMany({
      where: { taskId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getLogsOfTaskList(taskListId: number): Promise<UserAction[]> {
    return this.prisma.userAction.findMany({
      where: { taskListId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async logAction(action: Prisma.UserActionCreateInput): Promise<UserAction> {
    return this.prisma.userAction.create({
      data: action,
    });
  }
}
