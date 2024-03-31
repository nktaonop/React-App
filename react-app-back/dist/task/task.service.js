"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const task_list_service_1 = require("./../task-list/task-list.service");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const user_actions_service_1 = require("../user-actions/user-actions.service");
let TaskService = class TaskService {
    constructor(prisma, userActionService, taskListService) {
        this.prisma = prisma;
        this.userActionService = userActionService;
        this.taskListService = taskListService;
    }
    async create(data, listId) {
        const createdTask = await this.prisma.task.create({
            data: {
                ...data,
                taskListId: listId,
            },
        });
        await this.userActionService.logAction({
            title: `You created task <b>${createdTask.name}</b>`,
            task: {
                connect: {
                    id: createdTask.id,
                    taskListId: createdTask.taskListId,
                },
            },
        });
        return createdTask;
    }
    async delete(id) {
        const deletedTask = await this.prisma.task.delete({
            where: { id },
        });
        await this.userActionService.logAction({
            title: `You deleted task <b>${deletedTask.name}</b>`,
        });
        return deletedTask;
    }
    async update(id, data) {
        await this.prisma.task.findUnique({
            where: { id },
        });
        const updatedTask = await this.prisma.task.update({
            where: { id },
            data,
        });
        await this.userActionService.logAction({
            title: `You updated task <b>${updatedTask.name}</b>`,
            task: {
                connect: {
                    id: updatedTask.id,
                },
            },
        });
        return updatedTask;
    }
    async moveTask(taskId, targetListId) {
        const task = await this.prisma.task.findUnique({
            where: { id: parseInt(taskId) },
        });
        const originalTaskListItem = await this.taskListService.findOne(task.taskListId);
        const newTaskListItem = await this.taskListService.findOne(parseInt(targetListId));
        const updatedTask = await this.prisma.task.update({
            where: { id: parseInt(taskId) },
            data: { taskListId: parseInt(targetListId) },
        });
        await this.userActionService.logAction({
            title: `You moved task <b>${task.name}</b> from <b>${originalTaskListItem.name}</b> to <b>${newTaskListItem.name}</b>`,
            task: {
                connect: {
                    id: updatedTask.id,
                },
            },
        });
        return updatedTask;
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_actions_service_1.UserActionService,
        task_list_service_1.TaskListService])
], TaskService);
//# sourceMappingURL=task.service.js.map