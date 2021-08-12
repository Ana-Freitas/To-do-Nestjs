import { Task } from "./dto/task.entity";

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
        if(task){
            return this.tasks.splice(this.tasks.indexOf(task), 1)[0];
        }
        return null;
    }

    public async getAll(){
        return this.tasks;
    }
}