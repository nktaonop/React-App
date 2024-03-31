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
exports.TaskListService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const user_actions_service_1 = require("../user-actions/user-actions.service");
let TaskListService = class TaskListService {
    constructor(prisma, userActionService) {
        this.prisma = prisma;
        this.userActionService = userActionService;
    }
    async findAll() {
        return this.prisma.taskList.findMany({
            include: { tasks: true },
        });
    }
    async create(data) {
        const createdTaskList = await this.prisma.taskList.create({ data });
        await this.userActionService.logAction({
            title: `You created task list <b>${createdTaskList.name}</b>`,
            taskList: {
                connect: {
                    id: createdTaskList.id,
                },
            },
        });
        return createdTaskList;
    }
    async delete(id) {
        const list = await this.prisma.taskList.findUnique({
            where: { id: parseInt(id) },
            include: { tasks: true },
        });
        await this.prisma.task.deleteMany({
            where: { taskListId: parseInt(id) },
        });
        await this.prisma.taskList.delete({
            where: { id: parseInt(id) },
        });
        await this.userActionService.logAction({
            title: `You delete task list <b>${list.name}</b>`,
        });
        return list;
    }
    async updatename(id, name) {
        const list = await this.prisma.taskList.findUnique({
            where: { id: parseInt(id) },
        });
        const updatedTaskList = await this.prisma.taskList.update({
            where: { id: parseInt(id) },
            data: { name: name },
        });
        await this.userActionService.logAction({
            title: `You renamed task list from <b>${updatedTaskList.name}</b> to <b>${list.name}</b>`,
            taskList: {
                connect: {
                    id: list.id,
                },
            },
        });
        return updatedTaskList;
    }
    async findOne(id) {
        return this.prisma.taskList.findUnique({
            where: { id },
        });
    }
};
exports.TaskListService = TaskListService;
exports.TaskListService = TaskListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_actions_service_1.UserActionService])
], TaskListService);
//# sourceMappingURL=task-list.service.js.map