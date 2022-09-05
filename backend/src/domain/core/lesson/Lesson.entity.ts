import { StudentForLesson } from './entities/StudentForLesson.entity';
import { TeacherForLesson } from './entities/TeacherForLesson.entity';
import { Id } from '../../other/base/Id';
import { Entity } from '../../other/base/Entity';
import { Transcription, Translation, Value, Word, WordId } from '../../other/word/Word.entity';
import { Usage, UsageId, UsageValue } from '../../other/word/Usage.entity';
import { WordIsNotFound } from '../student/errors/WordIsNotFound.error';
import { getOrThrowIfEmpty } from '../../../utils/errors';
import { WordSet } from '../../other/word/WordSet.entity';
import { RandomIdGenerator } from '../../../utils/RandomIdGenerator';
import { Synonym, SynonymId, SynonymValue } from '../../other/word/Synonym.entity';
import { Antonym, AntonymId, AntonymValue } from '../../other/word/Antonym.entity';
import { Maybe } from '../../other/base/Maybe';
import { WordSetWasChangedEvent } from '../../other/word/events/WordSetWasChanged.event';

export class Lesson extends Entity<LessonId> {
  private readonly owner: 'Student' | 'Teacher';

  constructor(
    id: LessonId,
    private readonly student: StudentForLesson,
    private readonly teacher: Maybe<TeacherForLesson>,
    private wordSet: WordSet,
    private readonly randomIdGenerator: RandomIdGenerator,
  ) {
    super(id);
    this.owner = teacher ? 'Teacher' : 'Student';
  }

  getWord(wordId: WordId): Word {
    return getOrThrowIfEmpty(this.wordSet.findWord(wordId), new WordIsNotFound(wordId));
  }

  getWords(): Word[] {
    return this.wordSet.words;
  }

  addWord(value: Value, translation: Translation): WordId {
    const wordId = new WordId(this.randomIdGenerator.random());
    this.wordSet = this.wordSet.addWord(new Word(wordId, value, translation, [], [], [], null));
    this.addEvent(new WordSetWasChangedEvent(this.wordSet));
    return wordId;
  }

  removeWord(wordId: WordId) {
    this.wordSet = this.wordSet.removeWord(wordId);
    this.addEvent(new WordSetWasChangedEvent(this.wordSet));
  }

  modifyValueOfWord(wordId: WordId, value: Value) {
    const foundWord = getOrThrowIfEmpty(this.wordSet.findWord(wordId), new WordIsNotFound(wordId));
    this.wordSet = this.wordSet.modifyWord(foundWord.modifyValue(value));
    this.addEvent(new WordSetWasChangedEvent(this.wordSet));
  }

  modifyTranslationOfWord(wordId: WordId, translation: Translation) {
    const foundWord = getOrThrowIfEmpty(this.wordSet.findWord(wordId), new WordIsNotFound(wordId));
    this.wordSet = this.wordSet.modifyWord(foundWord.modifyTranslation(translation));
    this.addEvent(new WordSetWasChangedEvent(this.wordSet));
  }

  modifyTranscriptionOfWord(wordId: WordId, transcription: Transcription) {
    const foundWord = getOrThrowIfEmpty(this.wordSet.findWord(wordId), new WordIsNotFound(wordId));
    this.wordSet = this.wordSet.modifyWord(foundWord.modifyTranscription(transcription));
    this.addEvent(new WordSetWasChangedEvent(this.wordSet));
  }

  addUsageToWord(wordId: WordId, value: String): UsageId {
    const foundWord = getOrThrowIfEmpty(this.wordSet.findWord(wordId), new WordIsNotFound(wordId));
    const usageId = new UsageId(this.randomIdGenerator.random());
    const usage = new Usage(usageId, new UsageValue(value));

    this.wordSet = this.wordSet.modifyWord(foundWord.addUsage(usage));

    this.addEvent(new WordSetWasChangedEvent(this.wordSet));
    return usageId;
  }

  removeUsageFromWord(wordId: WordId, usageId: UsageId) {
    const foundWord = getOrThrowIfEmpty(this.wordSet.findWord(wordId), new WordIsNotFound(wordId));
    this.wordSet = this.wordSet.modifyWord(foundWord.removeUsage(usageId));
    this.addEvent(new WordSetWasChangedEvent(this.wordSet));
  }

  modifyUsageOfWord(wordId: WordId, usage: Usage) {
    const foundWord = getOrThrowIfEmpty(this.wordSet.findWord(wordId), new WordIsNotFound(wordId));
    this.wordSet = this.wordSet.modifyWord(foundWord.modifyUsage(usage));
    this.addEvent(new WordSetWasChangedEvent(this.wordSet));
  }

  addSynonymToWord(wordId: WordId, value: String): SynonymId {
    const foundWord = getOrThrowIfEmpty(this.wordSet.findWord(wordId), new WordIsNotFound(wordId));
    const synonymId = new SynonymId(this.randomIdGenerator.random());
    const synonym = new Synonym(synonymId, new SynonymValue(value));

    this.wordSet = this.wordSet.modifyWord(foundWord.addSynonym(synonym));

    this.addEvent(new WordSetWasChangedEvent(this.wordSet));
    return synonymId;
  }

  removeSynonymFromWord(wordId: WordId, synonymId: SynonymId) {
    const foundWord = getOrThrowIfEmpty(this.wordSet.findWord(wordId), new WordIsNotFound(wordId));
    this.wordSet = this.wordSet.modifyWord(foundWord.removeSynonym(synonymId));
    this.addEvent(new WordSetWasChangedEvent(this.wordSet));
  }

  modifySynonymOfWord(wordId: WordId, synonym: Synonym) {
    const foundWord = getOrThrowIfEmpty(this.wordSet.findWord(wordId), new WordIsNotFound(wordId));
    this.wordSet = this.wordSet.modifyWord(foundWord.modifySynonym(synonym));
    this.addEvent(new WordSetWasChangedEvent(this.wordSet));
  }

  addAntonymToWord(wordId: WordId, value: String): AntonymId {
    const foundWord = getOrThrowIfEmpty(this.wordSet.findWord(wordId), new WordIsNotFound(wordId));
    const antonymId = new AntonymId(this.randomIdGenerator.random());
    const antonym = new Antonym(antonymId, new AntonymValue(value));

    this.wordSet = this.wordSet.modifyWord(foundWord.addAntonym(antonym));

    this.addEvent(new WordSetWasChangedEvent(this.wordSet));
    return antonymId;
  }

  removeAntonymFromWord(wordId: WordId, antonymId: AntonymId) {
    const foundWord = getOrThrowIfEmpty(this.wordSet.findWord(wordId), new WordIsNotFound(wordId));
    this.wordSet = this.wordSet.modifyWord(foundWord.removeAntonym(antonymId));
    this.addEvent(new WordSetWasChangedEvent(this.wordSet));
  }

  modifyAntonymOfWord(wordId: WordId, antonym: Antonym) {
    const foundWord = getOrThrowIfEmpty(this.wordSet.findWord(wordId), new WordIsNotFound(wordId));
    this.wordSet = this.wordSet.modifyWord(foundWord.modifyAntonym(antonym));
    this.addEvent(new WordSetWasChangedEvent(this.wordSet));
  }
}

export class LessonId extends Id {}
