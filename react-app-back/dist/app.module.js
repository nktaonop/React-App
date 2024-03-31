"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const task_list_controller_1 = require("./task-list/task-list.controller");
const task_controller_1 = require("./task/task.controller");
const task_list_service_1 = require("./task-list/task-list.service");
const task_service_1 = require("./task/task.service");
const prisma_service_1 = require("./prisma/prisma.service");
const user_actions_module_1 = require("./user-actions/user-actions.module");
const user_actions_service_1 = require("./user-actions/user-actions.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [user_actions_module_1.UserActionModule],
        controllers: [task_list_controller_1.TaskListController, task_controller_1.TaskController],
        providers: [task_list_service_1.TaskListService, task_service_1.TaskService, prisma_service_1.PrismaService, user_actions_service_1.UserActionService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map