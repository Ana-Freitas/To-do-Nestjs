import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard('jwt'))
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

  @UseGuards(AuthGuard('jwt'))
  @Post()
  public async postTask(@Body(ValidationPipe) task: CreateTaskDto){
    return this.taskService.create(task);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  public async deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.delete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  public async getAllTask() {
    return this.taskService.findAll();
  }

}