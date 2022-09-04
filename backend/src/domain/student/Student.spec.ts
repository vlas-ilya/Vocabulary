import { Student, StudentId, StudentProfile, StudentProfileName } from './Student.e';
import { WordSet, WordSetId } from './WordSet.e';
import { Transcription, Translation, Usage, UsageId, Value, Word, WordId } from './Word.e';
import { makeArray } from '../../util/array';
import { WasDataModificationEvent } from './events/WasDataModification.event';

describe('Domain tests for Student', () => {
  function initWordSet(
    prefix: String,
    wordsCount: number,
    additionalParams?: {
      usageCount?: number;
      withTranscription?: boolean;
      removeWord?: WordId;
      additionalWord?: Word;
      modifiedWord?: {
        wordId: WordId;
        word: Word;
      };
    },
  ): WordSet {
    return new WordSet(
      new WordSetId(`${prefix}-set`),
      [
        ...makeArray(wordsCount ?? 0)
          .map((index) =>
            initWord(`${prefix}-word-${index}`, {
              usageCount: additionalParams?.usageCount,
              withTranscription: additionalParams?.withTranscription,
            }),
          )
          .map((word) => {
            if (word.equals(additionalParams?.modifiedWord?.wordId)) {
              return additionalParams?.modifiedWord?.word;
            }
            return word;
          })
          .filter((word) => !word.equals(additionalParams?.removeWord)),
        additionalParams?.additionalWord ? additionalParams?.additionalWord : null,
      ].filter((item) => item),
    );
  }

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

  describe('Test fillProfile method', () => {
    it('Update student name', () => {
      // Given
      const studentId = '0000';
      const studentOldName = 'Value';
      const studentNewName = 'New value';
      const student = new Student(
        new StudentId(studentId),
        new StudentProfile(new StudentProfileName(studentOldName)),
        [],
      );

      // When
      student.fillProfile(new StudentProfile(new StudentProfileName(studentNewName)));

      // Then
      const events = student.getEvents();
      expect(events.length).toBe(1);
      expect(events[0]).toEqual(
        new WasDataModificationEvent(new StudentId(studentId), {
          profile: new StudentProfile(new StudentProfileName(studentNewName)),
        }),
      );
    });
  });

  describe('Test addWordSet method', () => {
    it('Add word set', () => {
      // Given
      const studentId = '0000';
      const studentOldName = 'Value';
      const student = new Student(
        new StudentId(studentId),
        new StudentProfile(new StudentProfileName(studentOldName)),
        [initWordSet('0000', 3)],
      );

      // When
      student.addWordSet(initWordSet('1000', 4));

      // Then
      const events = student.getEvents();
      expect(events.length).toBe(1);
      expect(events[0]).toEqual(
        new WasDataModificationEvent(new StudentId(studentId), {
          wordSets: [initWordSet('0000', 3), initWordSet('1000', 4)],
        }),
      );
    });
  });

  describe('Test removeWordSet method', () => {
    it('Remove word set', () => {
      // Given
      const studentId = '0000';
      const studentOldName = 'Value';
      const student = new Student(
        new StudentId(studentId),
        new StudentProfile(new StudentProfileName(studentOldName)),
        [initWordSet('0000', 3), initWordSet('1000', 2), initWordSet('2000', 4)],
      );

      // When
      student.removeWordSet(new WordSetId('0000-set'));

      // Then
      const events = student.getEvents();
      expect(events.length).toBe(1);
      expect(events[0]).toEqual(
        new WasDataModificationEvent(new StudentId(studentId), {
          wordSets: [initWordSet('1000', 2), initWordSet('2000', 4)],
        }),
      );
    });
  });

  describe('Test addWordToWordSet method', () => {
    it('Add word to word set', () => {
      // Given
      const studentId = '0000';
      const studentOldName = 'Value';
      const student = new Student(
        new StudentId(studentId),
        new StudentProfile(new StudentProfileName(studentOldName)),
        [initWordSet('0000', 3), initWordSet('1000', 2), initWordSet('2000', 4)],
      );

      // When
      student.addWordToWordSet(new WordSetId('0000-set'), initWord('0000'));

      // Then
      const events = student.getEvents();
      expect(events.length).toBe(1);
      expect(events[0]).toEqual(
        new WasDataModificationEvent(new StudentId(studentId), {
          wordSets: [
            initWordSet('0000', 3, {
              additionalWord: initWord('0000'),
            }),
            initWordSet('1000', 2),
            initWordSet('2000', 4),
          ],
        }),
      );
    });
  });

  describe('Test removeWordFromWordSet method', () => {
    it('Add word to word set', () => {
      // Given
      const studentId = '0000';
      const studentOldName = 'Value';
      const student = new Student(
        new StudentId(studentId),
        new StudentProfile(new StudentProfileName(studentOldName)),
        [initWordSet('0000', 3), initWordSet('1000', 2), initWordSet('2000', 4)],
      );

      // When
      student.removeWordFromWordSet(new WordId('0000-word-2-id'));

      // Then
      const events = student.getEvents();
      expect(events.length).toBe(1);
      expect(events[0]).toEqual(
        new WasDataModificationEvent(new StudentId(studentId), {
          wordSets: [
            initWordSet('0000', 3, {
              removeWord: new WordId('0000-word-2-id'),
            }),
            initWordSet('1000', 2),
            initWordSet('2000', 4),
          ],
        }),
      );
    });
  });

  describe('Test modifyValueOfWord method', () => {
    it('Modify value of word', () => {
      // Given
      const studentId = '0000';
      const studentOldName = 'Value';
      const student = new Student(
        new StudentId(studentId),
        new StudentProfile(new StudentProfileName(studentOldName)),
        [initWordSet('0000', 3), initWordSet('1000', 2), initWordSet('2000', 4)],
      );

      // When
      student.modifyValueOfWord(new WordId('0000-word-2-id'), new Value('12345'));

      // Then
      const events = student.getEvents();
      expect(events.length).toBe(1);
      expect(events[0]).toEqual(
        new WasDataModificationEvent(new StudentId(studentId), {
          wordSets: [
            initWordSet('0000', 3, {
              modifiedWord: {
                wordId: new WordId('0000-word-2-id'),
                word: initWord('0000-word-2', {
                  modifiedValue: new Value('12345'),
                }),
              },
            }),
            initWordSet('1000', 2),
            initWordSet('2000', 4),
          ],
        }),
      );
    });
  });

  describe('Test modifyTranslationOfWord method', () => {
    it('Modify translation of word', () => {
      // Given
      const studentId = '0000';
      const studentOldName = 'Value';
      const student = new Student(
        new StudentId(studentId),
        new StudentProfile(new StudentProfileName(studentOldName)),
        [initWordSet('0000', 3), initWordSet('1000', 2), initWordSet('2000', 4)],
      );

      // When
      student.modifyTranslationOfWord(new WordId('0000-word-2-id'), new Translation('12345'));

      // Then
      const events = student.getEvents();
      expect(events.length).toBe(1);
      expect(events[0]).toEqual(
        new WasDataModificationEvent(new StudentId(studentId), {
          wordSets: [
            initWordSet('0000', 3, {
              modifiedWord: {
                wordId: new WordId('0000-word-2-id'),
                word: initWord('0000-word-2', {
                  modifiedTranslation: new Translation('12345'),
                }),
              },
            }),
            initWordSet('1000', 2),
            initWordSet('2000', 4),
          ],
        }),
      );
    });
  });

  describe('Test modifyTranscriptionOfWord method', () => {
    it('Modify transcription of word', () => {
      // Given
      const studentId = '0000';
      const studentOldName = 'Value';
      const student = new Student(
        new StudentId(studentId),
        new StudentProfile(new StudentProfileName(studentOldName)),
        [initWordSet('0000', 3), initWordSet('1000', 2), initWordSet('2000', 4)],
      );

      // When
      student.modifyTranscriptionOfWord(new WordId('0000-word-2-id'), new Transcription('12345'));

      // Then
      const events = student.getEvents();
      expect(events.length).toBe(1);
      expect(events[0]).toEqual(
        new WasDataModificationEvent(new StudentId(studentId), {
          wordSets: [
            initWordSet('0000', 3, {
              modifiedWord: {
                wordId: new WordId('0000-word-2-id'),
                word: initWord('0000-word-2', {
                  modifiedTranscription: new Transcription('12345'),
                }),
              },
            }),
            initWordSet('1000', 2),
            initWordSet('2000', 4),
          ],
        }),
      );
    });
  });

  describe('Modify addUsageToWord of word', () => {
    it('Add usage to word', () => {
      // Given
      const studentId = '0000';
      const studentOldName = 'Value';
      const student = new Student(
        new StudentId(studentId),
        new StudentProfile(new StudentProfileName(studentOldName)),
        [initWordSet('0000', 3), initWordSet('1000', 2), initWordSet('2000', 4)],
      );

      // When
      student.addUsageToWord(new WordId('0000-word-2-id'), new Usage(new UsageId('12345'), '1234'));

      // Then
      const events = student.getEvents();
      expect(events.length).toBe(1);
      expect(events[0]).toEqual(
        new WasDataModificationEvent(new StudentId(studentId), {
          wordSets: [
            initWordSet('0000', 3, {
              modifiedWord: {
                wordId: new WordId('0000-word-2-id'),
                word: initWord('0000-word-2', {
                  modifiedUsages: [new Usage(new UsageId('12345'), '1234')],
                }),
              },
            }),
            initWordSet('1000', 2),
            initWordSet('2000', 4),
          ],
        }),
      );
    });
  });

  describe('Modify removeUsageFromWord of word', () => {
    it('Remove usage from word', () => {
      // Given
      const studentId = '0000';
      const studentOldName = 'Value';
      const student = new Student(
        new StudentId(studentId),
        new StudentProfile(new StudentProfileName(studentOldName)),
        [initWordSet('0000', 3, { usageCount: 3 }), initWordSet('1000', 2), initWordSet('2000', 4)],
      );

      // When
      student.removeUsageFromWord(new WordId('0000-word-2-id'), new UsageId('0000-word-2-usage-1'));

      // Then
      const events = student.getEvents();
      expect(events.length).toBe(1);
      expect(events[0]).toEqual(
        new WasDataModificationEvent(new StudentId(studentId), {
          wordSets: [
            initWordSet('0000', 3, {
              usageCount: 3,
              modifiedWord: {
                wordId: new WordId('0000-word-2-id'),
                word: initWord('0000-word-2', {
                  modifiedUsages: [
                    new Usage(new UsageId('0000-word-2-usage-0'), '0000-word-2-usage-0-value'),
                    new Usage(new UsageId('0000-word-2-usage-2'), '0000-word-2-usage-2-value'),
                  ],
                }),
              },
            }),
            initWordSet('1000', 2),
            initWordSet('2000', 4),
          ],
        }),
      );
    });
  });

  describe('Modify modifyUsageOfWord of word', () => {
    it('Remove usage from word', () => {
      // Given
      const studentId = '0000';
      const studentOldName = 'Value';
      const student = new Student(
        new StudentId(studentId),
        new StudentProfile(new StudentProfileName(studentOldName)),
        [initWordSet('0000', 3, { usageCount: 3 }), initWordSet('1000', 2), initWordSet('2000', 4)],
      );

      // When
      student.modifyUsageOfWord(new WordId('0000-word-2-id'), new Usage(new UsageId('0000-word-2-usage-1'), '1234'));

      // Then
      const events = student.getEvents();
      expect(events.length).toBe(1);
      expect(events[0]).toEqual(
        new WasDataModificationEvent(new StudentId(studentId), {
          wordSets: [
            initWordSet('0000', 3, {
              usageCount: 3,
              modifiedWord: {
                wordId: new WordId('0000-word-2-id'),
                word: initWord('0000-word-2', {
                  modifiedUsages: [
                    new Usage(new UsageId('0000-word-2-usage-0'), '0000-word-2-usage-0-value'),
                    new Usage(new UsageId('0000-word-2-usage-1'), '1234'),
                    new Usage(new UsageId('0000-word-2-usage-2'), '0000-word-2-usage-2-value'),
                  ],
                }),
              },
            }),
            initWordSet('1000', 2),
            initWordSet('2000', 4),
          ],
        }),
      );
    });
  });
});
