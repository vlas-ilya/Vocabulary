import { Transcription, Translation, Value, Word, WordId } from '../../../../src/domain/other/word/Word.entity';
import { Usage, UsageId, UsageValue } from '../../../../src/domain/other/word/Usage.entity';
import { Lesson, LessonId } from '../../../../src/domain/core/lesson/Lesson.entity';
import { StudentForLesson } from '../../../../src/domain/core/lesson/entities/StudentForLesson.entity';
import { WordsWasUpdatedEvent } from '../../../../src/domain/core/lesson/events/WordsWasUpdated.events';
import { RandomIdGenerator } from '../../../../src/utils/RandomIdGenerator';
import { StudentId } from '../../../../src/domain/core/student/Student.entity';
import { WordIsNotFound } from '../../../../src/domain/core/student/errors/WordIsNotFound.error';
import { initWord } from '../../../test-utils/initWord';
import { initWordSet } from '../../../test-utils/initWordSet';

describe('Domain tests for Lesson', () => {
  describe('Test getWord method', () => {
    it('get word [successful]', () => {
      // Given
      const lesson = new Lesson(
        new LessonId('12345'),
        new StudentForLesson(new StudentId('123456')),
        undefined,
        initWordSet('0000', 5),
        {} as RandomIdGenerator,
      );

      // When
      const word = lesson.getWord(new WordId('0000-word-2-id'));

      // Then
      expect(word).toEqual(initWord('0000-word-2'));
    });

    it('get word [unsuccessful]', () => {
      // Given
      const lesson = new Lesson(
        new LessonId('12345'),
        new StudentForLesson(new StudentId('123456')),
        undefined,
        initWordSet('0000', 5),
        {} as RandomIdGenerator,
      );

      // When
      try {
        lesson.getWord(new WordId('0000-word-5-id'));
      } catch (e) {
        // Then
        expect(e).toEqual(new WordIsNotFound(new WordId('0000-word-5-id')));
      }
    });
  });

  describe('Test getWords method', () => {
    it('get words', () => {
      // Given
      const lesson = new Lesson(
        new LessonId('12345'),
        new StudentForLesson(new StudentId('123456')),
        undefined,
        initWordSet('0000', 5),
        {} as RandomIdGenerator,
      );

      // When
      const words = lesson.getWords();

      // Then
      expect(words).toEqual([
        initWord('0000-word-0'),
        initWord('0000-word-1'),
        initWord('0000-word-2'),
        initWord('0000-word-3'),
        initWord('0000-word-4'),
      ]);
    });
  });

  describe('Test addWord method', () => {
    it('add word', () => {
      // Given
      const lesson = new Lesson(
        new LessonId('12345'),
        new StudentForLesson(new StudentId('123456')),
        undefined,
        initWordSet('0000', 5),
        {
          random(): String {
            return '0000-word-5-id';
          },
        },
      );

      // When
      lesson.addWord(new Value('0000-word-5-value'), new Translation('0000-word-5-translation'));

      // Then
      const words = lesson.getWords();
      const events = lesson.getEvents();
      expect(words).toEqual([
        initWord('0000-word-0'),
        initWord('0000-word-1'),
        initWord('0000-word-2'),
        initWord('0000-word-3'),
        initWord('0000-word-4'),
        initWord('0000-word-5'),
      ]);

      expect(events.length).toBe(1);
      expect(events[0]).toEqual(new WordsWasUpdatedEvent(new LessonId('12345'), initWordSet('0000', 6)));
    });
  });

  describe('Test removeWord method', () => {
    it('remove word', () => {
      // Given
      const lesson = new Lesson(
        new LessonId('12345'),
        new StudentForLesson(new StudentId('123456')),
        undefined,
        initWordSet('0000', 5),
        {} as RandomIdGenerator,
      );

      // When
      lesson.removeWord(new WordId('0000-word-4-id'));
      const words = lesson.getWords();
      const events = lesson.getEvents();

      // Then
      expect(words).toEqual([
        initWord('0000-word-0'),
        initWord('0000-word-1'),
        initWord('0000-word-2'),
        initWord('0000-word-3'),
      ]);

      expect(events.length).toBe(1);
      expect(events[0]).toEqual(new WordsWasUpdatedEvent(new LessonId('12345'), initWordSet('0000', 4)));
    });
  });

  describe('Test modifyValueOfWord method', () => {
    it('modify value of the word', () => {
      // Given
      const lesson = new Lesson(
        new LessonId('12345'),
        new StudentForLesson(new StudentId('123456')),
        null,
        initWordSet('0000', 5),
        {} as RandomIdGenerator,
      );

      // When
      lesson.modifyValueOfWord(new WordId('0000-word-4-id'), new Value('test'));

      // Then
      const words = lesson.getWords();
      const events = lesson.getEvents();
      expect(words).toEqual([
        initWord('0000-word-0'),
        initWord('0000-word-1'),
        initWord('0000-word-2'),
        initWord('0000-word-3'),
        new Word(
          new WordId('0000-word-4-id'),
          new Value('test'),
          new Translation('0000-word-4-translation'),
          [],
          [],
          [],
          null,
        ),
      ]);

      expect(events.length).toBe(1);
      expect(events[0]).toEqual(
        new WordsWasUpdatedEvent(
          new LessonId('12345'),
          initWordSet('0000', 5, {
            modifiedWord: {
              wordId: new WordId('0000-word-4-id'),
              word: new Word(
                new WordId('0000-word-4-id'),
                new Value('test'),
                new Translation('0000-word-4-translation'),
                [],
                [],
                [],
                null,
              ),
            },
          }),
        ),
      );
    });
  });

  describe('Test modifyTranslationOfWord method', () => {
    it('modify translation of the word', () => {
      // Given
      const lesson = new Lesson(
        new LessonId('12345'),
        new StudentForLesson(new StudentId('123456')),
        null,
        initWordSet('0000', 5),
        {} as RandomIdGenerator,
      );

      // When
      lesson.modifyTranslationOfWord(new WordId('0000-word-4-id'), new Translation('test'));

      // Then
      const words = lesson.getWords();
      const events = lesson.getEvents();
      expect(words).toEqual([
        initWord('0000-word-0'),
        initWord('0000-word-1'),
        initWord('0000-word-2'),
        initWord('0000-word-3'),
        new Word(
          new WordId('0000-word-4-id'),
          new Value('0000-word-4-value'),
          new Translation('test'),
          [],
          [],
          [],
          null,
        ),
      ]);

      expect(events.length).toBe(1);
      expect(events[0]).toEqual(
        new WordsWasUpdatedEvent(
          new LessonId('12345'),
          initWordSet('0000', 5, {
            modifiedWord: {
              wordId: new WordId('0000-word-4-id'),
              word: new Word(
                new WordId('0000-word-4-id'),
                new Value('0000-word-4-value'),
                new Translation('test'),
                [],
                [],
                [],
                null,
              ),
            },
          }),
        ),
      );
    });
  });

  describe('Test modifyTranscriptionOfWord method', () => {
    it('modify transcription of the word', () => {
      // Given
      const lesson = new Lesson(
        new LessonId('12345'),
        new StudentForLesson(new StudentId('123456')),
        null,
        initWordSet('0000', 5),
        {} as RandomIdGenerator,
      );

      // When
      lesson.modifyTranscriptionOfWord(new WordId('0000-word-4-id'), new Transcription('test'));

      // Then
      const words = lesson.getWords();
      const events = lesson.getEvents();
      expect(words).toEqual([
        initWord('0000-word-0'),
        initWord('0000-word-1'),
        initWord('0000-word-2'),
        initWord('0000-word-3'),
        new Word(
          new WordId('0000-word-4-id'),
          new Value('0000-word-4-value'),
          new Translation('0000-word-4-translation'),
          [],
          [],
          [],
          new Translation('test'),
        ),
      ]);

      expect(events.length).toBe(1);
      expect(events[0]).toEqual(
        new WordsWasUpdatedEvent(
          new LessonId('12345'),
          initWordSet('0000', 5, {
            modifiedWord: {
              wordId: new WordId('0000-word-4-id'),
              word: new Word(
                new WordId('0000-word-4-id'),
                new Value('0000-word-4-value'),
                new Translation('0000-word-4-translation'),
                [],
                [],
                [],
                new Translation('test'),
              ),
            },
          }),
        ),
      );
    });
  });

  describe('Test addUsageToWord method', () => {
    it('add usage of the word', () => {
      // Given
      const lesson = new Lesson(
        new LessonId('12345'),
        new StudentForLesson(new StudentId('123456')),
        null,
        initWordSet('0000', 5),
        {
          random(): String {
            return 'test';
          },
        } as RandomIdGenerator,
      );

      // When
      lesson.addUsageToWord(new WordId('0000-word-4-id'), 'test');

      // Then
      const words = lesson.getWords();
      const events = lesson.getEvents();
      expect(words).toEqual([
        initWord('0000-word-0'),
        initWord('0000-word-1'),
        initWord('0000-word-2'),
        initWord('0000-word-3'),
        new Word(
          new WordId('0000-word-4-id'),
          new Value('0000-word-4-value'),
          new Translation('0000-word-4-translation'),
          [new Usage(new UsageId('test'), new UsageValue('test'))],
          [],
          [],
          null,
        ),
      ]);

      expect(events.length).toBe(1);
      expect(events[0]).toEqual(
        new WordsWasUpdatedEvent(
          new LessonId('12345'),
          initWordSet('0000', 5, {
            modifiedWord: {
              wordId: new WordId('0000-word-4-id'),
              word: new Word(
                new WordId('0000-word-4-id'),
                new Value('0000-word-4-value'),
                new Translation('0000-word-4-translation'),
                [new Usage(new UsageId('test'), new UsageValue('test'))],
                [],
                [],
                null,
              ),
            },
          }),
        ),
      );
    });
  });

  describe('Test modifyUsageOfWord method', () => {
    it('modify usage of the word', () => {
      // Given
      const lesson = new Lesson(
        new LessonId('12345'),
        new StudentForLesson(new StudentId('123456')),
        null,
        initWordSet('0000', 5, {
          usageCount: 3,
        }),
        {} as RandomIdGenerator,
      );

      // When
      lesson.modifyUsageOfWord(
        new WordId('0000-word-4-id'),
        new Usage(new UsageId('0000-word-4-usage-0'), new UsageValue('test')),
      );

      // Then
      const words = lesson.getWords();
      const events = lesson.getEvents();

      expect(words).toEqual([
        initWord('0000-word-0', { usageCount: 3 }),
        initWord('0000-word-1', { usageCount: 3 }),
        initWord('0000-word-2', { usageCount: 3 }),
        initWord('0000-word-3', { usageCount: 3 }),
        new Word(
          new WordId('0000-word-4-id'),
          new Value('0000-word-4-value'),
          new Translation('0000-word-4-translation'),
          [
            new Usage(new UsageId('0000-word-4-usage-0'), new UsageValue('test')),
            new Usage(new UsageId('0000-word-4-usage-1'), new UsageValue('0000-word-4-usage-1-value')),
            new Usage(new UsageId('0000-word-4-usage-2'), new UsageValue('0000-word-4-usage-2-value')),
          ],
          [],
          [],
          null,
        ),
      ]);

      expect(events.length).toBe(1);
      expect(events[0]).toEqual(
        new WordsWasUpdatedEvent(
          new LessonId('12345'),
          initWordSet('0000', 5, {
            usageCount: 3,
            modifiedWord: {
              wordId: new WordId('0000-word-4-id'),
              word: new Word(
                new WordId('0000-word-4-id'),
                new Value('0000-word-4-value'),
                new Translation('0000-word-4-translation'),
                [
                  new Usage(new UsageId('0000-word-4-usage-0'), new UsageValue('test')),
                  new Usage(new UsageId('0000-word-4-usage-1'), new UsageValue('0000-word-4-usage-1-value')),
                  new Usage(new UsageId('0000-word-4-usage-2'), new UsageValue('0000-word-4-usage-2-value')),
                ],
                [],
                [],
                null,
              ),
            },
          }),
        ),
      );
    });
  });

  describe('Test removeUsageFromWord method', () => {
    it('remove usage of the word', () => {
      // Given
      const lesson = new Lesson(
        new LessonId('12345'),
        new StudentForLesson(new StudentId('123456')),
        null,
        initWordSet('0000', 5, {
          usageCount: 3,
        }),
        {} as RandomIdGenerator,
      );

      // When
      lesson.removeUsageFromWord(new WordId('0000-word-4-id'), new UsageId('0000-word-4-usage-0'));

      // Then
      const words = lesson.getWords();
      const events = lesson.getEvents();

      expect(words).toEqual([
        initWord('0000-word-0', { usageCount: 3 }),
        initWord('0000-word-1', { usageCount: 3 }),
        initWord('0000-word-2', { usageCount: 3 }),
        initWord('0000-word-3', { usageCount: 3 }),
        new Word(
          new WordId('0000-word-4-id'),
          new Value('0000-word-4-value'),
          new Translation('0000-word-4-translation'),
          [
            new Usage(new UsageId('0000-word-4-usage-1'), new UsageValue('0000-word-4-usage-1-value')),
            new Usage(new UsageId('0000-word-4-usage-2'), new UsageValue('0000-word-4-usage-2-value')),
          ],
          [],
          [],
          null,
        ),
      ]);

      expect(events.length).toBe(1);
      expect(events[0]).toEqual(
        new WordsWasUpdatedEvent(
          new LessonId('12345'),
          initWordSet('0000', 5, {
            usageCount: 3,
            modifiedWord: {
              wordId: new WordId('0000-word-4-id'),
              word: new Word(
                new WordId('0000-word-4-id'),
                new Value('0000-word-4-value'),
                new Translation('0000-word-4-translation'),
                [
                  new Usage(new UsageId('0000-word-4-usage-1'), new UsageValue('0000-word-4-usage-1-value')),
                  new Usage(new UsageId('0000-word-4-usage-2'), new UsageValue('0000-word-4-usage-2-value')),
                ],
                [],
                [],
                null,
              ),
            },
          }),
        ),
      );
    });
  });
});
