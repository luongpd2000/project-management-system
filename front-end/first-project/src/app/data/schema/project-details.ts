import { Project } from "./project";
import { ProjectEmployee } from "./project-employee";


export class ProjectDetails extends Project {
    public taskList:Task[]=[];

    public todoNum:number=0;
    public progress: number = 0;
    public taskNum:number=0;
    public projectEmployeeList:ProjectEmployee[]=[];
    public partnerNum:number=0;
}
