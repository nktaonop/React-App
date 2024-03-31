import { PrismaService } from '../prisma/prisma.service';
import { TaskList } from '.prisma/client';
import { UserActionService } from 'src/user-actions/user-actions.service';
export declare class TaskListService {
    private prisma;
    private userActionService;
    constructor(prisma: PrismaService, userActionService: UserActionService);
    findAll(): Promise<TaskList[]>;
    create(data: {
        name: string;
    }): Promise<TaskList>;
    delete(id: string): Promise<TaskList>;
    updatename(id: string, name: string): Promise<TaskList>;
    findOne(id: number): Promise<TaskList>;
}
