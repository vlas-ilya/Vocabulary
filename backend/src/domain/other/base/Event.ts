export abstract class Event {
  readonly eventCode: EventCode;

  protected constructor(eventCode: EventCode) {
    this.eventCode = eventCode;
  }
}

export type EventCode =
  | 'AnswerShouldBeShownEvent'
  | 'AntonymShouldBeShownEvent'
  | 'LessonWasCreatedEvent'
  | 'NewTrainingWasCreated'
  | 'QuestionShouldBeShownEvent'
  | 'ResultsShouldBeShownEvent'
  | 'StudentListWasChangedEvent'
  | 'StudentProfileWasChangedEvent'
  | 'SynonymShouldBeShownEvent'
  | 'TeacherProfileWasChangedEvent'
  | 'TrainingStateWasUpdatedEvent'
  | 'TrainingWasStartedEvent'
  | 'UsageShouldBeShownEvent'
  | 'WordSetWasCreatedEvent'
  | 'WordSetWasChangedEvent'
  | 'WordSetWasClonedEvent'
  | 'WordSetsWereChangedEvent';
