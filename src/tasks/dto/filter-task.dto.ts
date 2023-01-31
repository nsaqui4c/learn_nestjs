import { TaskStatus } from '../task.model';

export class TaskFilterDto {
  search?: string;
  status?: TaskStatus;
}
