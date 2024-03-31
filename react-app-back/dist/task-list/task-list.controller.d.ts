import { TaskListService } from './task-list.service';
export declare class TaskListController {
    private readonly taskListService;
    constructor(taskListService: TaskListService);
    findAll(): Promise<{
        id: number;
        name: string;
    }[]>;
    create(data: {
        name: string;
    }): Promise<{
        id: number;
        name: string;
    }>;
    updateName(id: string, name: string): Promise<{
        id: number;
        name: string;
    }>;
    delete(id: string): Promise<{
        id: number;
        name: string;
    }>;
}
