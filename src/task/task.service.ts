import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';

@Injectable()

export class TaskService {
    private tasks: Task[] = new Array<Task>();

    public async getTask(id: number){
        return this.tasks.find(x=> x.id == id);
    }
}