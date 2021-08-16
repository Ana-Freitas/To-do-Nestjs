import { BadRequestException, ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskDocument } from "./dto/task.schema";
import { UpdateTaskDto } from "./dto/update-task.dto";

export class TaskService {

    constructor(@InjectModel("TaskModel") private taskModel: Model<TaskDocument>){}

    public async findOne(id: number) {
        return this.taskModel.findById(id);
    }

    public async create(task: CreateTaskDto, user: any): Promise<TaskDocument>{
        if(await this.findOne(task._id)){
            throw new ConflictException({
                statusCode: 409,
                message: "The task already exist"
            });
        }
        const taskCreated = new this.taskModel(task)
        taskCreated.user = user.userId;
        return taskCreated.save();;
    }

    public async delete(id: number, user: number) {
        const task = await this.findOne(id);
        
        if(task && task.user == user) {
            return this.taskModel.findOneAndDelete({ _id: id });
        }

        throw new BadRequestException({
            statusCode: 400,
            message: "Unable to delete task. Check that the code exists and that it belongs to your user"
        })
    }

    public async findAll() {
        return this.taskModel.find().exec();
    }

    public async findByUser(user: number) {
        return this.taskModel.find({ user: user });
    }

    public async updateTask(id: number, task: UpdateTaskDto, user: number){
        const taskRegistered = await this.findOne(id);

        if(taskRegistered && taskRegistered.user == user){
            return this.taskModel.findOneAndUpdate({ _id: id }, task);
        }

        throw new BadRequestException({
            statusCode: 400,
            message: "Unable to update task. Check that the code exists and that it belongs to your user"
        })

    }
}