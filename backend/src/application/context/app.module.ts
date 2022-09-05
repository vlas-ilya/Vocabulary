import { Module } from '@nestjs/common';
import { LessonController } from '../controllers/LessonController';
import { InfrastructureContext } from './infrastructure.context';
import { ProcessorContext } from './processor.context';
import { RepositoryContext } from './repository.context';
import { createProviders } from '../utils/context';

@Module({
  imports: [],
  providers: [
    ...createProviders(InfrastructureContext),
    ...createProviders(RepositoryContext),
    ...createProviders(ProcessorContext),
  ],
  controllers: [LessonController],
})
export class AppModule {}
