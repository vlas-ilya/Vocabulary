import { Id } from '../base/Id';
import { Entity } from '../base/Entity';
import { WordSet, WordSetId } from './WordSet.entity';
import { Transcription, Translation, Value, Word, WordId } from './Word.entity';
import { Usage, UsageId, UsageValue } from './Usage.entity';
import { WordSetsWereChangedEvent } from './events/WordSetsWereChanged.event';
import { WordSetIsNotFound } from '../../core/student/errors/WordSetIsNotFound.error';
import { WordIsNotFound } from '../../core/student/errors/WordIsNotFound.error';
import { RandomIdGenerator } from '../../../utils/RandomIdGenerator';
import { Synonym, SynonymId, SynonymValue } from './Synonym.entity';
import { Antonym, AntonymId, AntonymValue } from './Antonym.entity';

export class WordSetUser<T extends Id> extends Entity<T> {
  constructor(id: T, private wordSets: WordSet[], private readonly randomIdGenerator: RandomIdGenerator) {
    super(id);
  }

  createWordSet(): WordSetId {
    const wordSetId = new WordSetId(this.randomIdGenerator.random());
    const wordSet = new WordSet(wordSetId, [], 0);
    this.updateWordSets([...this.wordSets, wordSet]);
    return wordSetId;
  }

  removeWordSet(wordSetId: WordSetId) {
    const foundWordSet = this.getWordSetById(wordSetId);
    this.updateWordSets(this.wordSets.filter((item) => !item.equals(foundWordSet)));
  }

  addWordToWordSet(
    wordSetId: WordSetId,
    value: Value,
    translation: Translation,
    transcription?: Transcription,
  ): WordId {
    const foundWordSet = this.getWordSetById(wordSetId);

    const wordId = new WordId(this.randomIdGenerator.random());
    const word = new Word(wordId, value, translation, [], [], [], transcription);

    this.updateWordSet(foundWordSet.addWord(word));

    return wordId;
  }

  removeWordFromWordSet(wordId: WordId) {
    const foundWordSet = this.getWordSetWithWord(wordId);
    this.updateWordSet(foundWordSet.removeWord(wordId));
  }

  modifyValueOfWord(wordId: WordId, value: Value) {
    const foundWordSet = this.getWordSetWithWord(wordId);
    const foundWord = foundWordSet.findWord(wordId);
    this.updateWordSet(foundWordSet.modifyWord(foundWord.modifyValue(value)));
  }

  modifyTranslationOfWord(wordId: WordId, translation: Translation) {
    const foundWordSet = this.getWordSetWithWord(wordId);
    const foundWord = foundWordSet.findWord(wordId);
    this.updateWordSet(foundWordSet.modifyWord(foundWord.modifyTranslation(translation)));
  }

  modifyTranscriptionOfWord(wordId: WordId, transcription: Transcription) {
    const foundWordSet = this.getWordSetWithWord(wordId);
    const foundWord = foundWordSet.findWord(wordId);
    this.updateWordSet(foundWordSet.modifyWord(foundWord.modifyTranscription(transcription)));
  }

  addUsageToWord(wordId: WordId, value: String): UsageId {
    const foundWordSet = this.getWordSetWithWord(wordId);
    const foundWord = foundWordSet.findWord(wordId);

    const usageId = new UsageId(this.randomIdGenerator.random());
    const usage = new Usage(usageId, new UsageValue(value));

    this.updateWordSet(foundWordSet.modifyWord(foundWord.addUsage(usage)));

    return usageId;
  }

  removeUsageFromWord(wordId: WordId, usageId: UsageId) {
    const foundWordSet = this.getWordSetWithWord(wordId);
    const foundWord = foundWordSet.findWord(wordId);
    this.updateWordSet(foundWordSet.modifyWord(foundWord.removeUsage(usageId)));
  }

  modifyUsageOfWord(wordId: WordId, usage: Usage) {
    const foundWordSet = this.getWordSetWithWord(wordId);
    const foundWord = foundWordSet.findWord(wordId);
    this.updateWordSet(foundWordSet.modifyWord(foundWord.modifyUsage(usage)));
  }

  addSynonymToWord(wordId: WordId, value: String): SynonymId {
    const foundWordSet = this.getWordSetWithWord(wordId);
    const foundWord = foundWordSet.findWord(wordId);

    const synonymId = new SynonymId(this.randomIdGenerator.random());
    const synonym = new Synonym(synonymId, new SynonymValue(value));

    this.updateWordSet(foundWordSet.modifyWord(foundWord.addSynonym(synonym)));

    return synonymId;
  }

  removeSynonymFromWord(wordId: WordId, synonymId: SynonymId) {
    const foundWordSet = this.getWordSetWithWord(wordId);
    const foundWord = foundWordSet.findWord(wordId);
    this.updateWordSet(foundWordSet.modifyWord(foundWord.removeSynonym(synonymId)));
  }

  modifySynonymOfWord(wordId: WordId, synonym: Synonym) {
    const foundWordSet = this.getWordSetWithWord(wordId);
    const foundWord = foundWordSet.findWord(wordId);
    this.updateWordSet(foundWordSet.modifyWord(foundWord.modifySynonym(synonym)));
  }

  addAntonymToWord(wordId: WordId, value: String): AntonymId {
    const foundWordSet = this.getWordSetWithWord(wordId);
    const foundWord = foundWordSet.findWord(wordId);

    const antonymId = new AntonymId(this.randomIdGenerator.random());
    const antonym = new Antonym(antonymId, new AntonymValue(value));

    this.updateWordSet(foundWordSet.modifyWord(foundWord.addAntonym(antonym)));

    return antonymId;
  }

  removeAntonymFromWord(wordId: WordId, antonymId: AntonymId) {
    const foundWordSet = this.getWordSetWithWord(wordId);
    const foundWord = foundWordSet.findWord(wordId);
    this.updateWordSet(foundWordSet.modifyWord(foundWord.removeAntonym(antonymId)));
  }

  modifyAntonymOfWord(wordId: WordId, antonym: Antonym) {
    const foundWordSet = this.getWordSetWithWord(wordId);
    const foundWord = foundWordSet.findWord(wordId);
    this.updateWordSet(foundWordSet.modifyWord(foundWord.modifyAntonym(antonym)));
  }

  getWordSet(wordSetId: WordSetId): WordSet {
    return this.wordSets.find((wordSet) => wordSet.equals(wordSetId));
  }

  private updateWordSet(wordSet: WordSet) {
    const index = this.wordSets.findIndex((item) => item.equals(wordSet));
    this.updateWordSets([...this.wordSets.slice(0, index), wordSet, ...this.wordSets.slice(index + 1)]);
  }

  private updateWordSets(wordSets: WordSet[]) {
    this.wordSets = wordSets;
    this.addEvent(new WordSetsWereChangedEvent(this.wordSets));
  }

  private getWordSetById(wordSetId: WordSetId): WordSet {
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
