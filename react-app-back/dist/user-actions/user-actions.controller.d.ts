import { UserActionService } from './user-actions.service';
import { UserAction } from '@prisma/client';
export declare class UserActionController {
    private readonly userActionService;
    constructor(userActionService: UserActionService);
    getAllUserActions(): Promise<UserAction[]>;
    getUserActionsById(id: string): Promise<UserAction[]>;
    logAction(action: UserAction): Promise<UserAction>;
}
