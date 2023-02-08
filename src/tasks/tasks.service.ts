import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getFilterTask(taskfilterDto: TaskFilterDto): Task[] {
    const { status, search } = taskfilterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.description.includes(search) || task.title.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  public getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (found) {
      return found;
    } else {
      throw new NotFoundException(`Task with ${id} is not found`);
    }
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  public deleteTaskById(id: string): Task[] {
    const index = this.tasks.findIndex((task) => task.id === id);
    this.tasks.splice(index, 1);
    return this.tasks;
  }

  public updateById(id: string, status: TaskStatus) {
    console.log('statusDTO=> ', status);
    this.tasks.map((task) => {
      if (task.id === id) {
        task.status = status;
      }
    });

    return this.tasks;
  }
}
