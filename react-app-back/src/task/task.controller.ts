import { Controller, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(':listId')
  create(
    @Body()
    data: {
      name: string;
      description: string;
      dueDate: string;
      priority: string;
    },
    @Param('listId') listId: string,
  ) {
    return this.taskService.create(data, parseInt(listId));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.taskService.delete(parseInt(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    data: {
      name?: string;
      description?: string;
      dueDate?: string;
      priority?: string;
    },
  ) {
    return this.taskService.update(parseInt(id), data);
  }

  @Post(':taskId/move/:targetListId')
  async moveTask(
    @Param('taskId') taskId: string,
    @Param('targetListId') targetListId: string,
  ) {
    return this.taskService.moveTask(taskId, targetListId);
  }
}
