import { EventHandlerProviderImpl } from '../../infrastructure/events/EventHandlerProviderImpl';
import { Entity } from '../utils/context';
import { EventDispatcherImpl } from '../../infrastructure/events/EventDispatcherImpl';
import { RandomIdGeneratorImpl } from '../../infrastructure/other/RandomIdGeneratorImpl';
import { LessonDaoImpl } from '../../infrastructure/dao/LessonDaoImpl';
import { TrainingDaoImpl } from '../../infrastructure/dao/TrainingDaoImpl';
import { UserDaoImpl } from '../../infrastructure/dao/UserDaoImpl';
import { WordSetDaoImpl } from '../../infrastructure/dao/WordSetDaoImpl';
import { Injectable } from '@nestjs/common';
import { RandomSequenceGeneratorImpl } from '../../infrastructure/other/RandomSequenceGeneratorImpl';
import { RandomNumberGeneratorImpl } from '../../infrastructure/other/RandomNumberGeneratorImpl';
import { SocketConnectionsServiceImpl } from '../../infrastructure/network/SocketConnectionsServiceImpl';

@Injectable()
export class InfrastructureContext {
  @Entity()
  eventHandlerProvider() {
    return new EventHandlerProviderImpl(
      this.userDao(),
      this.lessonDao(),
      this.wordSetDao(),
      this.trainingDao(),
      this.socketConnectionsService(),
    );
  }

  @Entity()
  eventDispatcher() {
    return new EventDispatcherImpl(this.eventHandlerProvider());
  }

  @Entity()
  lessonDao() {
    return new LessonDaoImpl();
  }

  @Entity()
  trainingDao() {
    return new TrainingDaoImpl();
  }

  @Entity()
  userDao() {
    return new UserDaoImpl();
  }

  @Entity()
  wordSetDao() {
    return new WordSetDaoImpl();
  }

  @Entity()
  randomIdGenerator() {
    return new RandomIdGeneratorImpl();
  }

  @Entity()
  randomSequenceGenerator() {
    return new RandomSequenceGeneratorImpl(this.randomNumberGenerator());
  }

  @Entity()
  randomNumberGenerator() {
    return new RandomNumberGeneratorImpl();
  }

  @Entity()
  socketConnectionsService() {
    return new SocketConnectionsServiceImpl();
  }
}
