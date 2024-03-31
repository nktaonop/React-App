import { Prisma, UserAction } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserActionService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUserActions(): Promise<UserAction[]>;
    getUserActionsById(taskId: number): Promise<UserAction[]>;
    getLogsOfTask(taskId: number): Promise<UserAction[]>;
    getLogsOfTaskList(taskListId: number): Promise<UserAction[]>;
    logAction(action: Prisma.UserActionCreateInput): Promise<UserAction>;
}
