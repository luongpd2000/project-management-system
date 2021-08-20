import { User } from "./user";

export class ProjectEmployee{
  id!: number;
  projectId!: number;
  user!: User;
  role!: String;
  des!: String;
  delete!: boolean;
}
