import { TaskStatus } from '../task.model';
import { IsEnum } from 'class-validator';

export class TaskStatusDto {
  @IsEnum(TaskStatus)
  taskStatus: TaskStatus;
}
