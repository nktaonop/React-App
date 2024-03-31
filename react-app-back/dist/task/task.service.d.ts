import { TaskListService } from './../task-list/task-list.service';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '.prisma/client';
import { UserActionService } from 'src/user-actions/user-actions.service';
export declare class TaskService {
    private prisma;
    private userActionService;
    private taskListService;
    constructor(prisma: PrismaService, userActionService: UserActionService, taskListService: TaskListService);
    create(data: {
        name: string;
        description: string;
        dueDate: string;
        priority: string;
    }, listId: number): Promise<Task>;
    delete(id: number): Promise<Task>;
    update(id: number, data: {
        name?: string;
        description?: string;
        dueDate?: string;
        priority?: string;
    }): Promise<Task>;
    moveTask(taskId: string, targetListId: string): Promise<{
        id: number;
        name: string;
        description: string;
        dueDate: Date;
        priority: string;
        taskListId: number;
    }>;
}
