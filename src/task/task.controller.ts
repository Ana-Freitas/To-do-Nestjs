import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { Task } from './task.entity';
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
  public async postTask(@Body() task: Task){
    return this.taskService.postTask(task);
  }

  @Delete(':id')
  public async deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }

}