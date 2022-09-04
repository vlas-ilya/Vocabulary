import { Training, TrainingId, TrainingState } from './Training.e';
import { Student, StudentId } from './Student.e';
import { RandomSequence } from './utils/RandomSequence';
import { Word } from './Word.e';
import { Transcription, Translation, Usage, UsageId, Value, WordId } from '../student/Word.e';
import { makeArray } from '../../util/array';
import { TrainingWasStartedEvent } from './events/TrainingWasStarted.event';
import { TrainingStateWasUpdatedEvent } from './events/TrainingStateWasUpdated.event';
import { QuestionShouldBeShownEvent } from './events/QuestionShouldBeShown.event';
import { AnswerShouldBeShownEvent } from './events/AnswerShouldBeShown.event';
import { Randomizer } from './utils/Randomizer';
import { UsageShouldBeShownEvent } from './events/UsageShouldBeShown.event';

describe('Domain tests for Training', () => {
  function initWord(
    prefix: String,
    additionalParams?: {
      usageCount?: number;
      withTranscription?: boolean;
      modifiedValue?: Value;
      modifiedTranslation?: Translation;
      modifiedUsages?: Usage[];
      modifiedTranscription?: Transcription;
    },
  ): Word {
    return new Word(
      new WordId(`${prefix}-id`),
      additionalParams?.modifiedValue ? additionalParams?.modifiedValue : new Value(`${prefix}-value`),
      additionalParams?.modifiedTranslation
        ? additionalParams?.modifiedTranslation
        : new Translation(`${prefix}-translation`),
      additionalParams?.modifiedUsages
        ? additionalParams?.modifiedUsages
        : makeArray(additionalParams?.usageCount ?? 0).map(
            (usageIndex) =>
              new Usage(new UsageId(`${prefix}-usage-${usageIndex}`), `${prefix}-usage-${usageIndex}-value`),
          ),
      additionalParams?.modifiedTranscription
        ? additionalParams?.modifiedTranscription
        : additionalParams?.withTranscription
        ? new Transcription(`${prefix}-transcription`)
        : null,
    );
  }

  const randomizer = {
    random(max: number): RandomSequence {
      return new RandomSequence(Array.from(Array(max).keys()));
    },
  } as Randomizer;

  describe('Test start method', () => {
    it('Start training', () => {
      // Given
      const training: Training = new Training({
        id: new TrainingId('12345'),
        student: new Student(new StudentId('12345')),
        words: [
          initWord('0000', { usageCount: 5 }),
          initWord('1111', { usageCount: 5 }),
          initWord('2222', { usageCount: 5 }),
        ],
        randomizer,
        owner: 'Student',
        lessonType: 'FromValueToTranslation',
        state: new TrainingState(),
      });
      // When
      training.start();

      // Then
      const events = training.getEvents();

      expect(events.length).toBe(2);

      expect(events[0]).toEqual(
        new TrainingWasStartedEvent(new TrainingId('12345'), new Student(new StudentId('12345')), undefined),
      );

      expect(events[1]).toEqual(
        new TrainingStateWasUpdatedEvent(
          new TrainingId('12345'),
          new TrainingState().initiateExist(
            randomizer,
            [
              initWord('0000', { usageCount: 5 }),
              initWord('1111', { usageCount: 5 }),
              initWord('2222', { usageCount: 5 }),
            ],
            initWord('0000', { usageCount: 5 }),
            new RandomSequence([0, 1, 2], 1),
            new RandomSequence([0, 1, 2, 3, 4], 0),
            [],
            [],
          ),
        ),
      );
    });
  });

  describe('Test showNextQuestion method', () => {
    it('Show next question', () => {
      // Given
      const training: Training = new Training({
        id: new TrainingId('12345'),
        student: new Student(new StudentId('12345')),
        words: [
          initWord('0000', { usageCount: 5 }),
          initWord('1111', { usageCount: 5 }),
          initWord('2222', { usageCount: 5 }),
        ],
        randomizer,
        owner: 'Student',
        lessonType: 'FromValueToTranslation',
        state: new TrainingState(),
      });

      training.start();
      training.getEvents();

      // When
      training.showNextQuestion();

      // Then
      const events = training.getEvents();

      expect(events.length).toBe(1);

      expect(events[0]).toEqual(
        new QuestionShouldBeShownEvent(new TrainingId('12345'), new Student(new StudentId('12345')), undefined, [
          new Value(`0000-value`),
          null,
        ]),
      );
    });
  });

  describe('Test showAnswer method', () => {
    it('Show answer', () => {
      // Given
      const training: Training = new Training({
        id: new TrainingId('12345'),
        student: new Student(new StudentId('12345')),
        words: [
          initWord('0000', { usageCount: 5 }),
          initWord('1111', { usageCount: 5 }),
          initWord('2222', { usageCount: 5 }),
        ],
        randomizer,
        owner: 'Student',
        lessonType: 'FromValueToTranslation',
        state: new TrainingState(),
      });

      training.start();
      training.showNextQuestion();
      training.getEvents();

      // When
      training.showAnswer();

      // Then
      const events = training.getEvents();

      expect(events.length).toBe(1);

      expect(events[0]).toEqual(
        new AnswerShouldBeShownEvent(
          new TrainingId('12345'),
          new Student(new StudentId('12345')),
          undefined,
          new Translation('0000-translation'),
        ),
      );
    });
  });

  describe('Test wasCorrectAnswer method', () => {
    it('Was correct answer', () => {
      // Given
      const training: Training = new Training({
        id: new TrainingId('12345'),
        student: new Student(new StudentId('12345')),
        words: [
          initWord('0000', { usageCount: 5 }),
          initWord('1111', { usageCount: 5 }),
          initWord('2222', { usageCount: 5 }),
        ],
        randomizer,
        owner: 'Student',
        lessonType: 'FromValueToTranslation',
        state: new TrainingState(),
      });

      training.start();
      training.showNextQuestion();
      training.getEvents();

      // When
      training.wasCorrectAnswer();

      // Then

      const events = training.getEvents();

      expect(events.length).toBe(1);

      expect(events[0]).toEqual(
        new TrainingStateWasUpdatedEvent(
          new TrainingId('12345'),
          new TrainingState().initiateExist(
            randomizer,
            [
              initWord('0000', { usageCount: 5 }),
              initWord('1111', { usageCount: 5 }),
              initWord('2222', { usageCount: 5 }),
            ],
            initWord('1111', { usageCount: 5 }),
            new RandomSequence([0, 1, 2], 2),
            new RandomSequence([0, 1, 2, 3, 4], 0),
            [initWord('0000', { usageCount: 5 })],
            [],
          ),
        ),
      );
    });
  });

  describe('Test wasIncorrectAnswer method', () => {
    it('Was incorrect answer', () => {
      // Given
      const training: Training = new Training({
        id: new TrainingId('12345'),
        student: new Student(new StudentId('12345')),
        words: [
          initWord('0000', { usageCount: 5 }),
          initWord('1111', { usageCount: 5 }),
          initWord('2222', { usageCount: 5 }),
        ],
        randomizer,
        owner: 'Student',
        lessonType: 'FromValueToTranslation',
        state: new TrainingState(),
      });

      training.start();
      training.showNextQuestion();
      training.getEvents();

      // When
      training.wasIncorrectAnswer();

      // Then

      const events = training.getEvents();

      expect(events.length).toBe(1);

      expect(events[0]).toEqual(
        new TrainingStateWasUpdatedEvent(
          new TrainingId('12345'),
          new TrainingState().initiateExist(
            randomizer,
            [
              initWord('0000', { usageCount: 5 }),
              initWord('1111', { usageCount: 5 }),
              initWord('2222', { usageCount: 5 }),
            ],
            initWord('1111', { usageCount: 5 }),
            new RandomSequence([0, 1, 2], 2),
            new RandomSequence([0, 1, 2, 3, 4], 0),
            [],
            [initWord('0000', { usageCount: 5 })],
          ),
        ),
      );
    });
  });

  describe('Test showUsage method', () => {
    it('Show usage', () => {
      // Given
      const training: Training = new Training({
        id: new TrainingId('12345'),
        student: new Student(new StudentId('12345')),
        words: [
          initWord('0000', { usageCount: 5 }),
          initWord('1111', { usageCount: 5 }),
          initWord('2222', { usageCount: 5 }),
        ],
        randomizer,
        owner: 'Student',
        lessonType: 'FromValueToTranslation',
        state: new TrainingState(),
      });
      training.start();
      training.getEvents();

      // When
      training.showUsage();
      const events = training.getEvents();

      // Then

      expect(events.length).toBe(2);

      expect(events[0]).toEqual(
        new UsageShouldBeShownEvent(
          new TrainingId('12345'),
          new Student(new StudentId('12345')),
          undefined,
          new Usage(new UsageId('0000-usage-0'), '0000-usage-0-value'),
        ),
      );

      expect(events[1]).toEqual(
        new TrainingStateWasUpdatedEvent(
          new TrainingId('12345'),
          new TrainingState().initiateExist(
            randomizer,
            [
              initWord('0000', { usageCount: 5 }),
              initWord('1111', { usageCount: 5 }),
              initWord('2222', { usageCount: 5 }),
            ],
            initWord('0000', { usageCount: 5 }),
            new RandomSequence([0, 1, 2], 1),
            new RandomSequence([0, 1, 2, 3, 4], 1),
            [],
            [],
          ),
        ),
      );
    });
  });

  describe('Test finish method', () => {
    it('Play fast game', () => {
      // Given
      const training: Training = new Training({
        id: new TrainingId('12345'),
        student: new Student(new StudentId('12345')),
        words: [
          initWord('0000', { usageCount: 5 }),
          initWord('1111', { usageCount: 5 }),
          initWord('2222', { usageCount: 5 }),
        ],
        randomizer,
        owner: 'Student',
        lessonType: 'FromValueToTranslation',
        state: new TrainingState(),
      });
      training.start();
      training.showNextQuestion();
      training.showUsage();
      training.showAnswer();
      training.wasCorrectAnswer();
      training.showNextQuestion()
      training.showUsage();
      training.showUsage();
      training.showUsage();
      training.showAnswer();
      training.wasCorrectAnswer();
      training.showNextQuestion()
      training.showUsage();
      training.showAnswer();
      training.wasIncorrectAnswer();

      // When
      const results = training.finish();
      const events = training.getEvents();

      // Then
      expect(results[0].length).toBe(2);
      expect(results[1].length).toBe(1);
      expect(results[0][0]).toEqual(initWord('0000', { usageCount: 5 }))
      expect(results[0][1]).toEqual(initWord('1111', { usageCount: 5 }))
      expect(results[1][0]).toEqual(initWord('2222', { usageCount: 5 }))

      expect(events.length).toBe(21);
      // TODO: check events
    });
  });
});
