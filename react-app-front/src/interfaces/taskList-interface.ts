export interface Task {
  id: number

  name: string
  tasks: TaskItem[]
}

export interface TaskItem {
  id: number
  taskListId: number

  name: string
  description: string
  dueDate: string
  priority: string
}
