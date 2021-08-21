import { TodoHistory } from "./todo-history";

export class Todo{
  id!: number;
  name!: String;
  des!: String;
  startDate!: Date;
  endDate!: Date;
  todoType!: String;
  status!: String;
  taskId!: number;
  projectId!: number;
  createDate!: Date;
  updateDate!: Date;
  createUser!: number;
  assignedUser!: number;
  delete!: boolean;
  todoHistoryList!: TodoHistory[];
}
