import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
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

}