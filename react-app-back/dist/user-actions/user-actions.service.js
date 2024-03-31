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
exports.UserActionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserActionService = class UserActionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllUserActions() {
        return this.prisma.userAction.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async getUserActionsById(taskId) {
        return this.prisma.userAction.findMany({
            where: { taskId },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async getLogsOfTask(taskId) {
        return this.prisma.userAction.findMany({
            where: { taskId },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async getLogsOfTaskList(taskListId) {
        return this.prisma.userAction.findMany({
            where: { taskListId },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async logAction(action) {
        return this.prisma.userAction.create({
            data: action,
        });
    }
};
exports.UserActionService = UserActionService;
exports.UserActionService = UserActionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserActionService);
//# sourceMappingURL=user-actions.service.js.map