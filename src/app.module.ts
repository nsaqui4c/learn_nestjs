import { Module } from '@nestjs/common';

import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class AppModule {}
