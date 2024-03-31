import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { TaskListService } from './task-list.service';

@Controller('task-list')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Get()
  async findAll() {
    return this.taskListService.findAll();
  }

  @Post()
  async create(@Body() data: { name: string }) {
    return this.taskListService.create(data);
  }

  @Patch(':id')
  async updateName(@Param('id') id: string, @Body('name') name: string) {
    return this.taskListService.updatename(id, name);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.taskListService.delete(id);
  }
}
