import { BaseEntity } from '../base/BaseEntity';
import { WordSet, WordSetId } from './WordSet.e';
import { WasDataModificationEvent } from './events/WasDataModification.event';
import { Transcription, Translation, Usage, UsageId, Value, Word, WordId } from './Word.e';
import { BaseId } from '../base/BaseId.vo';
import { WordSetIsNotFound } from './exceptions/WordSetIsNotFound.ex';
import { WordIsNotFound } from './exceptions/WordIsNotFound.ex';
import { BaseValueObject } from '../base/BaseValueObject';

export class Student extends BaseEntity<StudentId> {
  private profile: StudentProfile;
  private wordSets: WordSet[];

  constructor(id: StudentId, profile: StudentProfile, wordSets: WordSet[]) {
    super(id);
    this.profile = profile;
    this.wordSets = wordSets;
  }

  fillProfile(profile: StudentProfile) {
    this.profile = profile;
    this.addEvent(new WasDataModificationEvent(this.id, { profile: this.profile }));
  }

  addWordSet(wordSet: WordSet) {
    this.updateWordSets([...this.wordSets, wordSet]);
  }

  removeWordSet(wordSetId: WordSetId) {
    const foundWordSet = this.getWordSet(wordSetId);
    this.updateWordSets(this.wordSets.filter((item) => !item.equals(foundWordSet)));
  }

  addWordToWordSet(wordSetId: WordSetId, word: Word) {
    const foundWordSet = this.getWordSet(wordSetId);

    const index = this.wordSets.findIndex((item) => item.equals(foundWordSet));

    this.updateWordSets([
      ...this.wordSets.slice(0, index),
      foundWordSet.addWord(word),
      ...this.wordSets.slice(index + 1),
    ]);
  }

  removeWordFromWordSet(wordId: WordId) {
    const foundWordSet = this.getWordSetWithWord(wordId);

    const index = this.wordSets.findIndex((item) => item.equals(foundWordSet));

    this.updateWordSets([
      ...this.wordSets.slice(0, index),
      foundWordSet.removeWord(wordId),
      ...this.wordSets.slice(index + 1),
    ]);
  }

  modifyValueOfWord(wordId: WordId, value: Value) {
    const foundWordSet = this.getWordSetWithWord(wordId);
    const foundWord = foundWordSet.findWord(wordId);

    const index = this.wordSets.findIndex((item) => item.equals(foundWordSet));

    this.updateWordSets([
      ...this.wordSets.slice(0, index),
      foundWordSet.modifyWord(foundWord.modifyValue(value)),
      ...this.wordSets.slice(index + 1),
    ]);
  }

  modifyTranslationOfWord(wordId: WordId, translation: Translation) {
    const foundWordSet = this.getWordSetWithWord(wordId);
    const foundWord = foundWordSet.findWord(wordId);

    const index = this.wordSets.findIndex((item) => item.equals(foundWordSet));

    this.updateWordSets([
      ...this.wordSets.slice(0, index),
      foundWordSet.modifyWord(foundWord.modifyTranslation(translation)),
      ...this.wordSets.slice(index + 1),
    ]);
  }

  modifyTranscriptionOfWord(wordId: WordId, transcription: Transcription) {
    const foundWordSet = this.getWordSetWithWord(wordId);
    const foundWord = foundWordSet.findWord(wordId);

    const index = this.wordSets.findIndex((item) => item.equals(foundWordSet));

    this.updateWordSets([
      ...this.wordSets.slice(0, index),
      foundWordSet.modifyWord(foundWord.modifyTranscription(transcription)),
      ...this.wordSets.slice(index + 1),
    ]);
  }

  addUsageToWord(wordId: WordId, usage: Usage) {
    const foundWordSet = this.getWordSetWithWord(wordId);
    const foundWord = foundWordSet.findWord(wordId);

    const index = this.wordSets.findIndex((item) => item.equals(foundWordSet));

    this.updateWordSets([
      ...this.wordSets.slice(0, index),
      foundWordSet.modifyWord(foundWord.addUsage(usage)),
      ...this.wordSets.slice(index + 1),
    ]);
  }

  removeUsageFromWord(wordId: WordId, usageId: UsageId) {
    const foundWordSet = this.getWordSetWithWord(wordId);
    const foundWord = foundWordSet.findWord(wordId);

    const index = this.wordSets.findIndex((item) => item.equals(foundWordSet));

    this.updateWordSets([
      ...this.wordSets.slice(0, index),
      foundWordSet.modifyWord(foundWord.removeUsage(usageId)),
      ...this.wordSets.slice(index + 1),
    ]);
  }

  modifyUsageOfWord(wordId: WordId, usage: Usage) {
    const foundWordSet = this.getWordSetWithWord(wordId);
    const foundWord = foundWordSet.findWord(wordId);

    const index = this.wordSets.findIndex((item) => item.equals(foundWordSet));

    this.updateWordSets([
      ...this.wordSets.slice(0, index),
      foundWordSet.modifyWord(foundWord.modifyUsage(usage)),
      ...this.wordSets.slice(index + 1),
    ]);
  }

  private updateWordSets(wordSets: WordSet[]) {
    this.wordSets = wordSets;
    this.addEvent(new WasDataModificationEvent(this.id, { wordSets: this.wordSets }));
  }

  private getWordSet(wordSetId: WordSetId): WordSet {
    const foundWordSet = this.wordSets.find((item) => item.equals(wordSetId));
    if (!foundWordSet) {
      throw new WordSetIsNotFound(foundWordSet);
    }
    return foundWordSet;
  }

  private getWordSetWithWord(wordId: WordId): WordSet {
    const foundWordSet = this.wordSets.find((item) => item.contains(wordId));
    if (!foundWordSet) {
      throw new WordIsNotFound(wordId);
    }
    return foundWordSet;
  }
}

export class StudentId extends BaseId {}

export class StudentProfile extends BaseValueObject {
  public readonly name: StudentProfileName;

  constructor(name: StudentProfileName) {
    super();
    this.name = name;
  }
}

export class StudentProfileName extends BaseValueObject {
  public readonly value: String;

  constructor(value: String) {
    super();
    this.value = value;
  }
}
