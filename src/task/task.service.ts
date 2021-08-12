import { ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskDocument } from "./dto/task.schema";

export class TaskService {

    constructor(@InjectModel("TaskModel") private taskModel: Model<TaskDocument>){}

    public async getTask(id: number){
        return this.taskModel.findById(id);
    }

    public async createTask(task: CreateTaskDto): Promise<TaskDocument>{
        if(await this.getTask(task._id)){
            throw new ConflictException({
                statusCode: 409,
                message: "The task already exist"
            });
        }
        const taskCreated = new this.taskModel(task)
        return taskCreated.save();;
    }

    public async deleteTask(id: number) {
        return this.taskModel.findOneAndDelete({ _id: id });
    }

    public async getAll(){
        return this.taskModel.find().exec();
    }
}