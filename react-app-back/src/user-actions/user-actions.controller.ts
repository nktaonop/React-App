import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserActionService } from './user-actions.service';
import { UserAction } from '@prisma/client';

@Controller('user-actions')
export class UserActionController {
  constructor(private readonly userActionService: UserActionService) {}

  @Get()
  async getAllUserActions(): Promise<UserAction[]> {
    return this.userActionService.getAllUserActions();
  }

  @Get(':id')
  async getUserActionsById(@Param('id') id: string): Promise<UserAction[]> {
    return this.userActionService.getUserActionsById(parseInt(id, 10));
  }

  @Post()
  async logAction(@Body() action: UserAction): Promise<UserAction> {
    return this.userActionService.logAction(action);
  }
}
