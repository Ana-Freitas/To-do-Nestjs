import { Task } from "./task.entity";

export class TaskService {
    private tasks: Task[] = new Array<Task>();

    constructor(){
        this.tasks.push(new Task(1, 'string', 'teste', false));
        this.tasks.push(new Task(2, 'string', 'teste', false));
        this.tasks.push(new Task(3, 'string', 'teste', false));
    }

    public async getTask(id: number){
        return this.tasks.find(x=> x.id == id);
    }

    public async postTask(task: Task){
        return this.tasks.push(task);
    }

    public async deleteTask(id: number) {
        let task = await this.getTask(id);
        this.tasks.splice(this.tasks.indexOf(task), 1);
        return this.tasks;
    }
}