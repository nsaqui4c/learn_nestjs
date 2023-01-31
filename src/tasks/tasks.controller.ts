import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/filter-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getTasks(@Query() taskFilterDto: TaskFilterDto): Task[] {
    if (Object.keys(taskFilterDto).length > 0) {
      return this.taskService.getFilterTask(taskFilterDto);
    }
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string): Task[] {
    return this.taskService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateById(
    @Body('status') status: TaskStatus,
    @Param('id') id: string,
  ): Task[] {
    return this.taskService.updateById(id, status);
  }
}
