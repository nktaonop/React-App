import { TaskService } from './task.service';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(data: {
        name: string;
        description: string;
        dueDate: string;
        priority: string;
    }, listId: string): Promise<{
        id: number;
        name: string;
        description: string;
        dueDate: Date;
        priority: string;
        taskListId: number;
    }>;
    delete(id: string): Promise<{
        id: number;
        name: string;
        description: string;
        dueDate: Date;
        priority: string;
        taskListId: number;
    }>;
    update(id: string, data: {
        name?: string;
        description?: string;
        dueDate?: string;
        priority?: string;
    }): Promise<{
        id: number;
        name: string;
        description: string;
        dueDate: Date;
        priority: string;
        taskListId: number;
    }>;
    moveTask(taskId: string, targetListId: string): Promise<{
        id: number;
        name: string;
        description: string;
        dueDate: Date;
        priority: string;
        taskListId: number;
    }>;
}
