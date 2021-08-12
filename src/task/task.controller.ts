import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Task } from './dto/task.entity';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id')
  public async getTask(@Param('id') id: number){
    const task = await this.taskService.getTask(id); 

    if(!task){
      return { message: 'Task not found'}
    }
    return task;
  }

  @Post()
  public async postTask(@Body() task: Task){
    return this.taskService.postTask(task);
  }

  @Delete(':id')
  public async deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }

  @Get()
  public async getAllTask() {
    const tasks = await this.taskService.getAll();

    if(!tasks || tasks?.length == 0){
      return { message: 'No tasks'}
    }

    return tasks;
  }

}