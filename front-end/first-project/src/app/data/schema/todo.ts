import { TodoHistory } from "./todo-history";

export class Todo{
  id!: number;
  name!: String;
  des!: String;
  startDate!: Date;
  endDate!: Date;
  todoType!: String;
  status!: String;
  taskId!: Number;
  createDate!: Date;
  updateDate!: Date;
  createUser!: number;
  assignedUser!: Number;
  delete!: boolean;
  todoHistory!: TodoHistory[];
}
