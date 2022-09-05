import { EventHandler } from '../../infrastructure-interfaces/events/handlers/EventHandler';
import { Event, EventCode } from '../../domain/other/base/Event';
import { LessonWasCreatedEventHandler } from './handlers/LessonWasCreatedEventHandler';
import { LessonDao } from '../../infrastructure-interfaces/dao/LessonDao';
import { EventHandlerProvider } from '../../infrastructure-interfaces/events/EventHandlerProvider';
import { EventHandlerIsNotDeclaredError } from '../../infrastructure-interfaces/events/errors/EventHandlerIsNotDeclaredError';
import { getOrThrowIfEmpty } from '../../utils/errors';
import { WordSetDao } from '../../infrastructure-interfaces/dao/WordSetDao';
import { WordSetWasClonedEventHandler } from './handlers/WordSetWasClonedEventHandler';
import { WordSetWasCreatedEventHandler } from './handlers/WordSetWasCreatedEventHandler';
import { AnswerShouldBeShownEventHandler } from './handlers/AnswerShouldBeShownEventHandler';
import { NewTrainingWasCreatedHandler } from './handlers/NewTrainingWasCreatedHandler';
import { QuestionShouldBeShownEventHandler } from './handlers/QuestionShouldBeShownEventHandler';
import { StudentListWasChangedEventHandler } from './handlers/StudentListWasChangedEventHandler';
import { TeacherProfileWasChangedEventHandler } from './handlers/TeacherProfileWasChangedEventHandler';
import { TrainingStateWasUpdatedEventHandler } from './handlers/TrainingStateWasUpdatedEventHandler';
import { TrainingWasStartedEventHandler } from './handlers/TrainingWasStartedEventHandler';
import { UsageShouldBeShownEventHandler } from './handlers/UsageShouldBeShownEventHandler';
import { WordSetsWereChangedEventHandler } from './handlers/WordSetsWereChangedEventHandler';
import { WordSetWasChangedEventHandler } from './handlers/WordSetWasChangedEventHandler';
import { StudentProfileWasChangedEventHandler } from './handlers/StudentProfileWasChangedEventHandler';
import { AntonymShouldBeShownEventHandler } from './handlers/AntonymShouldBeShownEventHandler';
import { SynonymShouldBeShownEventHandler } from './handlers/SynonymShouldBeShownEventHandler';
import { ResultsShouldBeShownEventHandler } from './handlers/ResultsShouldBeShownEventHandler';
import { TrainingDao } from '../../infrastructure-interfaces/dao/TrainingDao';
import { UserDao } from '../../infrastructure-interfaces/dao/UserDao';
import { SocketConnectionsService } from '../../infrastructure-interfaces/network/SocketConnectionsService';

export class EventHandlerProviderImpl implements EventHandlerProvider {
  private readonly handlers: {
    [key in EventCode]: () => EventHandler<any>;
  } = {
    AnswerShouldBeShownEvent: () => new AnswerShouldBeShownEventHandler(this.socketConnectionsService),
    AntonymShouldBeShownEvent: () => new AntonymShouldBeShownEventHandler(this.socketConnectionsService),
    LessonWasCreatedEvent: () => new LessonWasCreatedEventHandler(this.lessonDao),
    NewTrainingWasCreated: () => new NewTrainingWasCreatedHandler(this.trainingDao),
    QuestionShouldBeShownEvent: () => new QuestionShouldBeShownEventHandler(this.socketConnectionsService),
    ResultsShouldBeShownEvent: () => new ResultsShouldBeShownEventHandler(this.socketConnectionsService),
    StudentListWasChangedEvent: () => new StudentListWasChangedEventHandler(this.userDao),
    StudentProfileWasChangedEvent: () => new StudentProfileWasChangedEventHandler(this.userDao),
    SynonymShouldBeShownEvent: () => new SynonymShouldBeShownEventHandler(this.socketConnectionsService),
    TeacherProfileWasChangedEvent: () => new TeacherProfileWasChangedEventHandler(this.userDao),
    TrainingStateWasUpdatedEvent: () => new TrainingStateWasUpdatedEventHandler(this.trainingDao),
    TrainingWasStartedEvent: () => new TrainingWasStartedEventHandler(this.socketConnectionsService),
    UsageShouldBeShownEvent: () => new UsageShouldBeShownEventHandler(this.socketConnectionsService),
    WordSetWasCreatedEvent: () => new WordSetWasCreatedEventHandler(this.wordSetDao),
    WordSetWasClonedEvent: () => new WordSetWasClonedEventHandler(this.wordSetDao),
    WordSetsWereChangedEvent: () => new WordSetsWereChangedEventHandler(this.wordSetDao),
    WordSetWasChangedEvent: () => new WordSetWasChangedEventHandler(this.wordSetDao),
  };

  constructor(
    private readonly userDao: UserDao,
    private readonly lessonDao: LessonDao,
    private readonly wordSetDao: WordSetDao,
    private readonly trainingDao: TrainingDao,
    private readonly socketConnectionsService: SocketConnectionsService,
  ) {}

  get<E extends Event>(event: E): EventHandler<E> {
    const generateHandler = getOrThrowIfEmpty(
      this.handlers[event.eventCode],
      new EventHandlerIsNotDeclaredError(event),
    );
    // @ts-ignore
    return generateHandler();
  }
}
