import { Injectable } from '@nestjs/common';
import { Entity } from '../utils/context';
import { AddStudentToTeacherServiceRepositoryImpl } from '../../repository/AddStudentToTeacherServiceRepositoryImpl';
import { CreateLessonServiceRepositoryImpl } from '../../repository/CreateLessonServiceRepositoryImpl';
import { CreateNewTrainingServiceRepositoryImpl } from '../../repository/CreateNewTrainingServiceRepositoryImpl';
import { LessonRepositoryImpl } from '../../repository/LessonRepositoryImpl';
import { StudentRepositoryImpl } from '../../repository/StudentRepositoryImpl';
import { TeacherRepositoryImpl } from '../../repository/TeacherRepositoryImpl';
import { TrainingRepositoryImpl } from '../../repository/TrainingRepositoryImpl';
import { UserRepositoryImpl } from '../../repository/UserRepositoryImpl';
import { InfrastructureContext } from './infrastructure.context';

@Injectable()
export class RepositoryContext {
  constructor(private readonly infrastructure: InfrastructureContext) {}

  @Entity()
  addStudentToTeacherServiceRepository() {
    return new AddStudentToTeacherServiceRepositoryImpl(
      this.infrastructure.userDao(),
      this.infrastructure.wordSetDao(),
      this.infrastructure.randomIdGenerator(),
    );
  }

  @Entity()
  createLessonServiceRepository() {
    return new CreateLessonServiceRepositoryImpl(
      this.infrastructure.userDao(),
      this.infrastructure.wordSetDao(),
      this.infrastructure.randomIdGenerator(),
    );
  }

  @Entity()
  createNewTrainingServiceRepository() {
    return new CreateNewTrainingServiceRepositoryImpl(
      this.infrastructure.userDao(),
      this.infrastructure.wordSetDao(),
      this.infrastructure.randomIdGenerator(),
      this.infrastructure.randomSequenceGenerator(),
    );
  }

  @Entity()
  lessonRepository() {
    return new LessonRepositoryImpl(
      this.infrastructure.lessonDao(),
      this.infrastructure.userDao(),
      this.infrastructure.wordSetDao(),
      this.infrastructure.randomIdGenerator(),
    );
  }

  @Entity()
  studentRepository() {
    return new StudentRepositoryImpl(
      this.infrastructure.userDao(),
      this.infrastructure.wordSetDao(),
      this.infrastructure.randomIdGenerator(),
    );
  }

  @Entity()
  teacherRepository() {
    return new TeacherRepositoryImpl(
      this.infrastructure.userDao(),
      this.infrastructure.wordSetDao(),
      this.infrastructure.randomIdGenerator(),
    );
  }

  @Entity()
  trainingRepository() {
    return new TrainingRepositoryImpl(
      this.infrastructure.trainingDao(),
      this.infrastructure.userDao(),
      this.infrastructure.wordSetDao(),
      this.infrastructure.randomIdGenerator(),
      this.infrastructure.randomSequenceGenerator(),
    );
  }

  @Entity()
  userRepository() {
    return new UserRepositoryImpl(this.infrastructure.userDao());
  }
}
