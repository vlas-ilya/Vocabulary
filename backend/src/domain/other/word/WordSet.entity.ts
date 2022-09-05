import { Word, WordId } from './Word.entity';
import { Entity } from '../base/Entity';
import { WordIsNotFound } from '../../core/student/errors/WordIsNotFound.error';
import { Id } from '../base/Id';
import { RandomIdGenerator } from '../../../utils/RandomIdGenerator';
import { WordSetWasClonedEvent } from './events/WordSetWasCloned.event';
import { Maybe } from '../base/Maybe';

export class WordSet extends Entity<WordSetId> {
  public readonly words: Word[];
  public readonly cloneCount: number;

  constructor(id: WordSetId, words: Word[], cloneCount: number) {
    super(id);
    this.words = words;
    this.cloneCount = cloneCount;
  }

  contains(wordId: WordId): boolean {
    return !!this.words.find((item) => item.equals(wordId));
  }

  addWord(word: Word): WordSet {
    return new WordSet(this.id, [...this.words, word], this.cloneCount);
  }

  removeWord(wordId: WordId): WordSet {
    const realWord = this.words.find((item) => item.equals(wordId));
    if (!realWord) {
      throw new WordIsNotFound(wordId);
    }
    const words = this.words.filter((item) => !item.equals(wordId));
    return new WordSet(this.id, words, this.cloneCount);
  }

  modifyWord(word: Word): WordSet {
    const realWord = this.words.find((item) => item.equals(word));
    if (!realWord) {
      throw new WordIsNotFound(word.id);
    }
    const index = this.words.findIndex((item) => item.equals(realWord));
    const words = [...this.words.slice(0, index), word, ...this.words.slice(index + 1)];
    return new WordSet(this.id, words, this.cloneCount);
  }

  findWord(wordId: WordId): Maybe<Word> {
    return this.words.find((item) => item.equals(wordId));
  }

  clone(randomIdGenerator: RandomIdGenerator): WordSet {
    const clone = new WordSet(
      new WordSetId(randomIdGenerator.random()),
      this.words.map((word) => word.clone(randomIdGenerator)),
      0,
    );
    this.addEvent(new WordSetWasClonedEvent(this));
    return clone;
  }
}

export class WordSetId extends Id {}
