import { TodoHistory } from "./todo-history";
import { User } from "./user";

export class Todo{
  id!: number;
  name!: String;
  des!: String;
  startDate!: String;
  endDate!: String;
  todoType!: String;
  status!: String;
  taskId!: number;
  projectId!: number;
  createDate!: String;
  updateDate!: String;
  createUser!: number;
  assignedUser!: number;
  assignedUserDetails!:User;
  delete!: boolean;
  todoHistoryList!: TodoHistory[];
}
