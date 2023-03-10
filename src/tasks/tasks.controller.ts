import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from './authorization.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/filter-task.dto';
import { TaskStatusDto } from './dto/task-status,.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { TestInterceptor } from './test.interceptor';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  @UseGuards(new AuthGuard(['admin', 'user']))
  @UseInterceptors(TestInterceptor)
  getTasks(@Query() taskFilterDto: TaskFilterDto): Task[] {
    console.log('Inside getTask Handler');
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
    @Body() taskstatusDto: TaskStatusDto,
    @Param('id') id: string,
  ): Task[] {
    const { taskStatus } = taskstatusDto;
    return this.taskService.updateById(id, taskStatus);
  }
}
