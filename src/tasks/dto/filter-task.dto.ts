import { TaskStatus } from '../task.model';
import { IsOptional } from 'class-validator';
export class TaskFilterDto {
  @IsOptional()
  search?: string;
  @IsOptional()
  status?: TaskStatus;
}
