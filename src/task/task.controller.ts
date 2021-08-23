import { Body, Controller, Delete, Patch, Get, NotFoundException, Param, ParseIntPipe, Post, UseGuards, ValidationPipe, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';

@ApiTags("task")
@ApiBearerAuth()
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}


  @UseGuards(AuthGuard('jwt'))
  @Post()
  public async postTask(@Request() user, @Body(ValidationPipe) task: CreateTaskDto){
    return this.taskService.create(task, user.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  public async deleteTask(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const user = req.user;
    return this.taskService.delete(id, user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  public async getAllTask() {
    return this.taskService.findAll();
  }

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
  @Get()
  public async getTaskByUser(@Request() req) {
    return this.taskService.findByUser(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  public async updateTask(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const body = req.body;
    const user = req.user;
    return this.taskService.updateTask(id, body, user.userId);
  }

}