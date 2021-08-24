import { TaskHistory } from "./task-history";
import { User } from "./user";

export class Task{
  id!: number;
  name:String='';
  startDate:String='';
  endDate:String='';
  taskType:String='';
  priority:String='';
  status:String='';
  projectId!: Number;
  createDate!: Date;
  updateDate!: Date;
  createUser!: number;
  taskManagerId!: number;
  taskManagerDetails:User;
  delete!: boolean;
  des:String='';
  taskHistoryList: TaskHistory[];

}
