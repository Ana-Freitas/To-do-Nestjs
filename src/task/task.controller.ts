import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id')
  public async getTask(@Param('id') id: number){
    const task = await this.taskService.getTask(id); 

    if(!task){
      throw new NotFoundException({
        status: 404, 
        message: 'Task not found'
      })
    }
    return task;
  }

  @Post()
  public async postTask(@Body() task: CreateTaskDto){
    return this.taskService.createTask(task);
  }

  @Delete(':id')
  public async deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }

  @Get()
  public async getAllTask() {
    return this.taskService.getAll();
  }

}