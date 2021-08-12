import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id')
  public async getTask(@Param('id', ParseIntPipe) id: number){
    const task = await this.taskService.findOne(id); 

    if(!task){
      throw new NotFoundException({
        status: 404, 
        message: 'Task not found'
      })
    }
    return task;
  }

  @Post()
  public async postTask(@Body(ValidationPipe) task: CreateTaskDto){
    return this.taskService.create(task);
  }

  @Delete(':id')
  public async deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.delete(id);
  }

  @Get()
  public async getAllTask() {
    return this.taskService.findAll();
  }

}