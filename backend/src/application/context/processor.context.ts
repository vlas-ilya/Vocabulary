import { Injectable } from '@nestjs/common';
import { Entity } from '../utils/context';
import { UserProcessorImpl } from '../../processor/UserProcessorImpl';
import { TrainingProcessorImpl } from '../../processor/TrainingProcessorImpl';
import { TeacherProcessorImpl } from '../../processor/TeacherProcessorImpl';
import { StudentProcessorImpl } from '../../processor/StudentProcessorImpl';
import { LessonProcessorImpl } from '../../processor/LessonProcessorImpl';
import { InfrastructureContext } from './infrastructure.context';
import { RepositoryContext } from './repository.context';

@Injectable()
export class ProcessorContext {
  constructor(private readonly infrastructure: InfrastructureContext, private readonly repository: RepositoryContext) {}

  @Entity()
  lessonProcessor() {
    return new LessonProcessorImpl(
      this.repository.lessonRepository(),
      this.repository.createLessonServiceRepository(),
      this.infrastructure.eventDispatcher(),
    );
  }

  @Entity()
  studentProcessor() {
    return new StudentProcessorImpl(this.repository.studentRepository(), this.infrastructure.eventDispatcher());
  }

  @Entity()
  teacherProcessor() {
    return new TeacherProcessorImpl(
      this.repository.teacherRepository(),
      this.repository.addStudentToTeacherServiceRepository(),
      this.infrastructure.eventDispatcher(),
    );
  }

  @Entity()
  trainingProcessor() {
    return new TrainingProcessorImpl(
      this.repository.trainingRepository(),
      this.repository.createNewTrainingServiceRepository(),
      this.infrastructure.eventDispatcher(),
    );
  }

  @Entity()
  userProcessor() {
    return new UserProcessorImpl(this.repository.studentRepository(), this.infrastructure.eventDispatcher());
  }
}
